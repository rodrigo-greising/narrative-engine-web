import { db } from "@/lib/db";
import { loadS3IntoPinecone } from "@/lib/pinecone";
import { getS3Url } from "@/lib/s3";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next"
import { NextApiRequest, NextApiResponse } from "next";
import { loadS3IntoPGVector } from "@/lib/pgVector";
import { campaignSourcebooks, sourcebooks } from "@/lib/db/schema";

// /api/embed
export async function handler(req: NextApiRequest, res: NextApiResponse) {
  
  const session = await getServerSession(req);
  if (!session) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  try {
    const body = await req.body;

    const chunks = [];
    for await (const chunk of body) {
        chunks.push(chunk)
    }
    const bodyJson = Buffer.concat(chunks).toString();
    const { hash, campaignId, title } = JSON.parse(bodyJson);

    await db.insert(sourcebooks).values({
        hash: hash,
        link: getS3Url(hash),
    });

    await db.insert(campaignSourcebooks).values({
        title: title,
        campaignId: campaignId,
        sourcebookHash: hash,
    });

    await loadS3IntoPGVector(hash);

    // DB Query management

    return res.status(200).json({ message: "success" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "internal server error" },
      { status: 500 }
    );
  }
}

export default handler;