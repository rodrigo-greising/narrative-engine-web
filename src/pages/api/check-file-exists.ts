import { db } from '@/lib/db';
import { campaignSourcebooks, sourcebooks } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from "@/lib/auth"


// /api/check-file-exists
export async function handler(req: NextApiRequest, res: NextApiResponse) {

    const {title, hash , campaignId} = await req.body;

  try {

    // DB Query management
    const sourcebook = await db.select().from(sourcebooks).where(eq(sourcebooks.hash, hash!));

    if (!sourcebook.length) {
        return res.status(204).json({ error: 'File not found' });
    } else {
        await db.insert(campaignSourcebooks).values({title: title, campaignId: campaignId, sourcebookHash: hash!});
        return res.status(200).json({ message: 'File found, added to campaign' });
    }

  } catch (error) {

    console.error("An error occurred:", error);
    return res.status(500).json({ error: 'An error occurred while checking if the file exists.' })

  }
}

export default handler;