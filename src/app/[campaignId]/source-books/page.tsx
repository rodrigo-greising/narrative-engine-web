import FileUpload from "@/components/FileUpload";
import FileList from "@/components/FileList";
import NavMenu from "@/components/NavMenu";
import Chat from "@/components/chat";
import { db } from "@/lib/db";
import { campaignSourcebooks, sourcebooks } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

async function Sourcebooks({params}) {
    const { campaignId } = params;
    const _sourcebooks = await db.select()
    .from(campaignSourcebooks).innerJoin(sourcebooks, eq(sourcebooks.hash, campaignSourcebooks.sourcebookHash))
    .where(eq(campaignSourcebooks.campaignId, campaignId));

    let newFiles = _sourcebooks.map((book) => {
      return {
          name: book.campaign_sourcebooks.title,
          dateUploaded: book.sourcebooks.dateUploaded,
          isIndexed: book.sourcebooks.isIndexed,
          hash: book.sourcebooks.hash,
          imageUrl: book.sourcebooks.imageUrl,
      };
    });

    return (
        <div>
            <NavMenu />
            <div className='p-2 rounded-xl flex justify-center items-center flex-col pt-16'>
                <h4 className="text-2xl h-6 text-blue-violet-500 font-bold pb-16">Upload and manage your source books here.</h4>
                <div className="flex justify-center items-center">
                    <FileUpload />
                </div>
                <FileList files={newFiles}/>
                <Chat />
            </div>
        </div>
    );
}

            export default Sourcebooks;