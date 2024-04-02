import { db } from '@/lib/db';
import { chats } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from "@/lib/auth"


// /api/files
export async function handler(req: NextApiRequest, res: NextApiResponse) {
  
  // get the user session
  const session = await getServerSession(req, res, authOptions);
  
  const userEmail = session?.user?.email;

  try {

    // DB Query management
    const _chats = await db.select().from(chats).where(eq(chats.userEmail, userEmail!));

    let newFiles = _chats.map((chat) => {
      return {
          name: chat.pdfName,
          dateUploaded: chat.createdAt,
          isIndexed: true,
      };
    });

    if (!newFiles.length) {
        newFiles = [];
    }
    
    return res.status(200).json(newFiles);

  } catch (error) {

    console.error("An error occurred:", error);
    return res.status(500).json({ error: 'An error occurred while fetching files.' })

  }
}

export default handler;