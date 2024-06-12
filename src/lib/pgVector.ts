import { downloadFromS3 } from "./s3-server";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import {
  Document,
  RecursiveCharacterTextSplitter,
} from "@pinecone-database/doc-splitter";
import { getEmbeddings } from "./embeddings";
import { PromisePool } from '@supercharge/promise-pool'
import { campaignSourcebooks, sourcebookEmbedings, sourcebooks } from "./db/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";
import path from 'path';
import fs from 'fs';
import { exec } from "child_process";
import { title } from "process";
import { getImageS3Url, getPDFS3Url } from "./s3";


type PDFPage = {
  pageContent: string;
  metadata: {
    loc: { pageNumber: number };
  };
};

export async function loadS3IntoPGVector(hash: string, campaignId: number, title: string) {
  // 1. obtain the pdf -> downlaod and read from pdf
  console.log("downloading s3 into file system");
  const file_name = await downloadFromS3(`${hash}.pdf`);

  if (!file_name) {
    throw new Error("could not download from s3");
  }

  console.log(hash + ": " +  Date.now() + ": " + "loading pdf into memory");
  const loader = new PDFLoader(file_name);
  const pages = (await loader.load()) as PDFPage[];

  // 2. split and segment the pdf
  const documents = await Promise.all(pages.map(prepareDocument));

  const flat = documents.flat();

  console.log(hash + ": " +  Date.now() + ": " + "starting embedding")

  // 3. vectorise and embed individual documents
  const { results, errors } = await PromisePool
  .for(flat)
  .withConcurrency(5)
  .process((doc) => embedDocument(doc, hash))


  const vectors =results;

  console.log(hash + ": " +  Date.now() + ": " + "embeding complete, inserting vectors")

  //insert sourcebook into db
  await db.insert(sourcebooks).values({
    hash: hash,
    link: getPDFS3Url(hash),
    imageUrl: getImageS3Url(hash),
});

  await db.insert(campaignSourcebooks).values({
      title: title,
      campaignId: campaignId,
      sourcebookHash: hash,
  });

  // 4. upload to postgress
  await db.insert(sourcebookEmbedings).values(vectors);
  await db.update(sourcebooks).set({ isIndexed: true }).where(eq(sourcebooks.hash, hash));

  console.log(hash + ": " +  Date.now() + ": " + "inserted vectors into db")

  return documents[0];
}

async function embedDocument(doc: Document, hash: string) {
  try {
    const embeddings = await getEmbeddings(doc.pageContent);
    const text = doc.pageContent as string;

    return {
        sourcebookHash: hash,
        vector: embeddings,
        content: text,
        pageNumber: doc.metadata.pageNumber as number,   
    };
  } catch (error) {
    console.log("error embedding document", error);
    throw error;
  }
}

export const truncateStringByBytes = (str: string, bytes: number) => {
  const enc = new TextEncoder();
  return new TextDecoder("utf-8").decode(enc.encode(str).slice(0, bytes));
};

async function prepareDocument(page: PDFPage) {
  let { pageContent, metadata } = page;
  pageContent = pageContent.replace(/\n/g, "");
  // split the docs
  const splitter = new RecursiveCharacterTextSplitter();
  const docs = await splitter.splitDocuments([
    new Document({
      pageContent,
      metadata: {
        pageNumber: metadata.loc.pageNumber,
        text: truncateStringByBytes(pageContent, 36000),
      },
    }),
  ]);
  return docs; 
}