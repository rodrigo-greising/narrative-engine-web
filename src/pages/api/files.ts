import { db } from '@/lib/db';
import { campaignSourcebooks, sourcebooks } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { NextApiRequest, NextApiResponse } from 'next';
import { getAuth } from "@clerk/nextjs/server";


// /api/files
export async function handler(req: NextApiRequest, res: NextApiResponse) {

  const {campaignId} = await req.body;

  
  // get the user session
  const session = await getAuth(req);

  if (!session) {
    return res.status(401).json({ error: 'You must be signed in to view files.' });
  }

  try {

    // DB Query management
    const _sourcebooks = await db.select()
    .from(campaignSourcebooks).innerJoin(sourcebooks, eq(sourcebooks.hash, campaignSourcebooks.sourcebookHash))
    .where(eq(campaignSourcebooks.campaignId, campaignId));

    let newFiles = _sourcebooks.map((book) => {
      return {
          name: book.campaign_sourcebooks.title,
          dateUploaded: book.sourcebooks.dateUploaded,
          isIndexed: book.sourcebooks.isIndexed,
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