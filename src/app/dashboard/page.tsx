
import NavMenu from "@/components/NavMenu";
import { db } from "@/lib/db";
import { campaignMembers, campaigns } from "@/lib/db/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import Image from "next/image";


const Dashboard = async () => {
    const user = await currentUser();

    const discordData = user!.externalAccounts.filter(acc => acc.provider == "oauth_discord")[0];


    const campaignList = await db.select()
    .from(campaigns)
    .innerJoin(campaignMembers, eq(campaigns.id, campaignMembers.campaignId))
    .where(eq(campaignMembers.userId, discordData.externalId));

    return (
        <div>
            <NavMenu />
            <div className="m-4">
                    {campaignList.map((campaign) => (
                        <div 
                            key={campaign.campaign.id} 
                            className="relative shadow-md rounded-3xl w-1/3"
                        >
                            <div className="relative w-full h-80 rounded-t-3xl">
                                <Image 
                                    src={campaign.campaign.image!} 
                                    alt={campaign.campaign.title}
                                    objectFit="cover"
                                    fill={true}
                                    className="rounded-t-3xl"
                                />
                            </div>
                            <div className="bg-slate-50 rounded-b-3xl mt-0">
                                <h2 className="text-lg font-bold mb-2">{campaign.campaign.title}</h2>
                                <p className="text-md text-gray-700">{campaign.campaign.description}</p>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default Dashboard;