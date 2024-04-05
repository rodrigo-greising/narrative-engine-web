import { getEmbeddings } from "./embeddings";
import { db } from "./db";
import { campaignSourcebooks, sourcebookEmbedings, sourcebooks } from "./db/schema";
import { l2Distance } from 'pgvector/drizzle-orm';
import { eq } from "drizzle-orm";


export async function getMatchesFromEmbeddings(
  embeddings: number[],
  campaignId: string
) {
  try {
    const queryItems = await db.select()
        .from(sourcebookEmbedings)
        .innerJoin(sourcebooks, eq(sourcebookEmbedings.sourcebookHash, sourcebooks.hash))
        .innerJoin(campaignSourcebooks, eq(campaignSourcebooks.sourcebookHash, sourcebooks.hash))
        .where(eq(campaignSourcebooks.campaignId, parseInt(campaignId)))
        .orderBy(l2Distance(sourcebookEmbedings.vector, embeddings))
        .limit(5);

    return queryItems || [];
  } catch (error) {
    console.log("error querying embeddings", error);
    throw error;
  }
}

export async function getPgContext(query: string, campaignId: string) {
  const queryEmbeddings = await getEmbeddings(query);
  const matches = await getMatchesFromEmbeddings(queryEmbeddings, campaignId);
  let docs = matches.map((match) => (match.sourcebook_embedings.content + "page: " + match.sourcebook_embedings.pageNumber));

  // 5 vectors
  return docs.join("\n").substring(0, 3000);
}