import { db } from "@/lib/db";
import { getImageS3Url, getPDFS3Url } from "@/lib/s3";
import { NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";
import { loadS3IntoPGVector } from "@/lib/pgVector";
import { campaignSourcebooks, sourcebooks } from "@/lib/db/schema";
import { getAuth } from "@clerk/nextjs/server";
import axios from "axios";


// /api/embed
export async function handler(req: NextApiRequest, res: NextApiResponse) {

  const session = await getAuth(req);
  if (!session) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  try {
    const { hash, campaignId, title } = await req.body;

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

    // ...

    const response = await axios.post("http://localhost:8000/process-pdf/", { hash });
    const status = response.status;

    return res.status(status).json({ message: response.data });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "internal server error" },
      { status: 500 }
    );
  }
}

export default handler;