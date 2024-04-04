import { db } from "@/lib/db";
import { loadS3IntoPinecone } from "@/lib/pinecone";
import { getS3Url } from "@/lib/s3";
import { NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";
import { getAuth } from "@clerk/nextjs/server";


// /api/embed
async function POST(req: NextApiRequest, res: NextApiResponse) {
  
  const session = await getAuth(req);
  if (!session) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  try {
    const { userId } = session;

    const body = await req.body;

    const chunks = [];
    for await (const chunk of body) {
        chunks.push(chunk)
    }
    const bodyJson = Buffer.concat(chunks).toString();
    const { file_key, file_name } = JSON.parse(bodyJson);

    console.log(file_key, file_name);
    await loadS3IntoPinecone(file_key);
    const chat_id = await db
      .insert(chats)
      .values({
        fileKey: file_key,
        pdfName: file_name,
        pdfUrl: getS3Url(file_key),
        userEmail: email!,
      })
      .returning({
        insertedId: chats.id,
      });

    return NextResponse.json(
      {
        chat_id: chat_id[0].insertedId,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "internal server error" },
      { status: 500 }
    );
  }
}