export const campaignCategories = [
  "Technology",
  "Art",
  "Community",
  "Health",
  "Education",
  "Environment",
  "Music",
  "Sports",
  "Other",
];

export type CampaignFormValues = {
  campaign_title: string;
  campaign_story: string;
  category: string;
  funding_goal: string;
  minimum_Contribution: string;
  deadline: string;
  reward_info: string;
  campaign_image_url: string;
};

export type CampaignErrors = Partial<Record<keyof CampaignFormValues, string>>;

export type CampaignPayload = {
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

export const initialCampaignForm: CampaignFormValues = {
  campaign_title: "",
  campaign_story: "",
  category: "",
  funding_goal: "",
  minimum_Contribution: "",
  deadline: "",
  reward_info: "",
  campaign_image_url: "",
};

export function validateCampaignForm(
  form: CampaignFormValues,
  hasPendingImageUpload: boolean
): CampaignErrors {
  const errors: CampaignErrors = {};
  const fundingGoal = Number(form.funding_goal);
  const minimumContribution = Number(form.minimum_Contribution);
  const deadline = new Date(form.deadline);

  if (!form.campaign_title.trim()) {
    errors.campaign_title = "Campaign title is required.";
  }

  if (form.campaign_story.trim().length < 20) {
    errors.campaign_story = "Campaign story must be at least 20 characters.";
  }

  if (!form.category) {
    errors.category = "Please select a category.";
  }

  if (!form.funding_goal || isNaN(fundingGoal)) {
    errors.funding_goal = "Enter a funding goal greater than 0.";
  } else if (fundingGoal < 0) {
    errors.funding_goal = "Funding goal cannot be negative.";
  } else if (fundingGoal === 0) {
    errors.funding_goal = "Enter a funding goal greater than 0.";
  }

  if (!form.minimum_Contribution || isNaN(minimumContribution)) {
    errors.minimum_Contribution = "Enter a minimum contribution greater than 0.";
  } else if (minimumContribution < 0) {
    errors.minimum_Contribution = "Minimum contribution cannot be negative.";
  } else if (minimumContribution === 0) {
    errors.minimum_Contribution = "Enter a minimum contribution greater than 0.";
  } else if (fundingGoal > 0 && minimumContribution > fundingGoal) {
    errors.minimum_Contribution = "Minimum contribution cannot exceed the funding goal.";
  }

  if (!form.deadline || isNaN(deadline.getTime()) || deadline.getTime() <= Date.now()) {
    errors.deadline = "Please choose a deadline in the future.";
  }

  if (!form.reward_info.trim()) {
    errors.reward_info = "Reward info is required.";
  }

  if (hasPendingImageUpload && !form.campaign_image_url) {
    errors.campaign_image_url = "Please wait for the image upload to finish.";
  }

  if (!form.campaign_image_url) {
    errors.campaign_image_url = "Campaign cover image is required.";
  }

  return errors;
}

export function buildCampaignPayload(form: CampaignFormValues): CampaignPayload {
  return {
    campaign_title: form.campaign_title.trim(),
    campaign_story: form.campaign_story.trim(),
    category: form.category,
    funding_goal: Number(form.funding_goal),
    minimum_Contribution: Number(form.minimum_Contribution),
    deadline: new Date(form.deadline).toISOString(),
    reward_info: form.reward_info.trim(),
    campaign_image_url: form.campaign_image_url,
    status: "pending",
  };
}
