import { getCampaignById } from "@/app/lib/service/getAllCampaign";

type Props = {
  params: Promise<{
    campaignId: string;
  }>;
};

const CampaignDetailsPage = async ({ params }: Props) => {
  const { campaignId } = await params;
const  campaign=await getCampaignById(campaignId)
console.log(campaign);
  return (
     <div className="p-10">
      <h1 className="text-3xl font-bold">
        Campaign Details Page
      </h1>
    </div>
  );
};

export default CampaignDetailsPage;