import { db } from "@/lib/db";
import { getPDFS3Url } from "@/lib/s3";
import { NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";
import { loadS3IntoPGVector } from "@/lib/pgVector";
import { campaignSourcebooks, sourcebooks } from "@/lib/db/schema";
import { getAuth } from "@clerk/nextjs/server";


// /api/embed
export async function handler(req: NextApiRequest, res: NextApiResponse) {
  
  const session = await getAuth(req);
  if (!session) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  try {
    const { hash, campaignId, title }  = await req.body;

    await db.insert(sourcebooks).values({
        hash: hash,
        link: getPDFS3Url(hash),
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