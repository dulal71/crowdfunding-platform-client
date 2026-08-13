import getAllCampaign from "@/app/lib/service/getAllCampaign";
import CampaignCard from "@/components/campaign/CampaignCard";
import { ICampaign } from "@/types/campaign";

const CampaignsPage = async () => {
  const {data} = await getAllCampaign('active');
      const {campaigns} = data;




  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 p-5">
      {campaigns.map((campaign:ICampaign) => (
        <CampaignCard key={campaign._id} campaign={campaign}></CampaignCard>
      ))}
    </div>
    </div>
  );
};

export default CampaignsPage;