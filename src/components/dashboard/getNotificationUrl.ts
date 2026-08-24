import { INotification } from "@/types/campaign";

export const getNotificationUrl = (notification: INotification) => {
  switch (notification.type) {
    case "DONATION_RECEIVED":
      return `/dashboard/creator/notification/${notification.donationId}`;

    case "DONATION_PENDING":
    case "DONATION_APPROVED":
    case "DONATION_REJECTED":
      return `/dashboard/supporter/donations/${notification.donationId}`;

    case "CAMPAIGN_CREATED":
      return `/dashboard/admin/campaigns/${notification.campaignId}`;

    case "CAMPAIGN_APPROVED":
    case "CAMPAIGN_REJECTED":
    case "CAMPAIGN_COMPLETED":
      return `/dashboard/creator/campaigns/${notification.campaignId}`;

    default:
      return "/dashboard";
  }
};

