import getAllCampaign from "@/app/lib/service/getAllCampaign";
import CampaignCard from "@/components/campaign/CampaignCard";
import { ICampaign } from "@/types/campaign";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";

const CampaignsPage = async () => {
  const {data} = await getAllCampaign('active');
      const {campaigns} = data;




  return (
    <div className="md:w-full lg:container  mx-auto space-y-12">
      
      <div className="flex items-center justify-center mt-3">
  <div className="flex items-center gap-2 text-sm">
    <Link href={'/'} className="font-medium text-text-muted hover:text-primary cursor-pointer transition-colors">
      Home
    </Link>

    <FaArrowRightLong className="text-primary-light text-xs" />

    <Link href={'/campaigns'} className="font-medium text-primary-light hover:text-primary cursor-pointer transition-colors">
      Explore Campaigns
    </Link>

   

    
  </div>
</div>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-y-16  lg:grid-cols-4 lg:gap-5 p-5">
      {campaigns.map((campaign:ICampaign) => (
        <CampaignCard key={campaign._id} campaign={campaign}></CampaignCard>
      ))}
    </div>
    </div>
  );
};

export default CampaignsPage;