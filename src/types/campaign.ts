export type CampaignStatus = "pending" | "active" | "approved" | "rejected" | "closed";

export type ICampaign = {
  _id: string;
  campaign_title: string;
  campaign_story: string;
  category: string;
  funding_goal: number;
  funded_amount: number;
  minimum_Contribution: number;
  deadline: string;
  reward_info: string;
  campaign_image_url: string;
  status: CampaignStatus;
  createdAt?: string;
  user_name?: string;
  user_email?: string;
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

export type CampaignByIdResponse = {
  success: boolean;
  message?: string;
  data: ICampaign;
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
