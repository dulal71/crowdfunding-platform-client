import getAllCampaign from "@/app/lib/service/getAllCampaign";
import CampaignCard from "@/components/campaign/CampaignCard";
import { ICampaign } from "@/types/campaign";

const CampaignsPage = async () => {
  const {data:campaigns} = await getAllCampaign();



  return (
    <div>
      {campaigns.map((campaign:ICampaign) => (
        <CampaignCard key={campaign._id} campaign={campaign}></CampaignCard>
      ))}
    </div>
  );
};

export default CampaignsPage;