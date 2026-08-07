import getAllCampaign from "@/app/lib/service/getAllCampaign";

const CampaignsPage = async () => {
  const {data:campaigns} = await getAllCampaign();



  return (
    <div>
      {campaigns.map((campaign) => (
        <div key={campaign.campaign_title}>
          <h2>{campaign.campaign_title}</h2>
          <p>{campaign.campaign_story}</p>
        </div>
      ))}
    </div>
  );
};

export default CampaignsPage;