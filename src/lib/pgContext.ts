import { convertToAscii } from "./utils";
import { getEmbeddings } from "./embeddings";
import { db } from "./db";
import { sourcebookEmbedings } from "./db/schema";
import { l2Distance } from 'pgvector/drizzle-orm';


export async function getMatchesFromEmbeddings(
  embeddings: number[],
  campaignId: string
) {
  try {
    const queryItems = await db.select()
    .from(sourcebookEmbedings)
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
  let docs = matches.map((match) => ({
    id: match.id,
    text: match.content,
    page: match.pageNumber
  }));

  // 5 vectors
  return docs.join("\n").substring(0, 3000);
}