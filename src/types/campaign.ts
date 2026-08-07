export type ICampaign = {
  campaign_title: string;
  campaign_story: string;
  category: string;
  funding_goal: number;
  minimum_Contribution: number;
  deadline: string;
  reward_info: string;
  campaign_image_url: string;
  status: "pending";
};

export type CampaignResponse = {
  success: boolean;
  message?: string;
  data: ICampaign[];
};