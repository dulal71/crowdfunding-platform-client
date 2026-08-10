export type ICampaign = {
  _id:string,
  campaign_title: string;
  campaign_story: string;
  category: string;
  funding_goal: number;
  funded_amount:number;
  minimum_Contribution: number;
  deadline: string;
  reward_info: string;
  campaign_image_url: string;
  status: "pending";
};

export type CampaignResponse = {
  success: boolean;
  message?: string;
  data: {
    campaigns: ICampaign[];
    total: number;
    active: number;
    pending: number;
    completed: number;
  };
};


export type INotification = {
  _id: string;
  type: string;
  title: string;
  message: string;
  userId: string;
  campaignId: string;
  isRead: boolean;
  createdAt: string;
};
