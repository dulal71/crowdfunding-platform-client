import type { IconType } from "react-icons";
import {
  FiBarChart2,
  FiCreditCard,
  FiLayout,
  FiSettings,
  FiStar,
  FiUsers,
  FiPlusCircle,
  FiBookOpen,
  FiFileText,
  FiUser,
  FiBox,
  FiDollarSign,
} from "react-icons/fi";

export type DashboardNavItem = {
  label: string;
  href: string;
  description: string;
  icon: IconType;
};

export const dashboardNavItemsByRole: Record<string, DashboardNavItem[]> = {
  supporter: [
    { label: "Dashboard", href: "/dashboard/supporter", description: "Overview", icon: FiLayout },
    { label: "My Donations", href: "/dashboard/supporter/my-contributions", description: "Your funding activity", icon: FiDollarSign },
    { label: "Explore Campaigns", href: "/dashboard/supporter/explore-campaigns", description: "Saved campaigns", icon: FiStar },
    { label: "Payment History", href: "/profile", description: "payment-history", icon: FiUser },
    { label: "Purchase Credit", href: "/dashboard/supporter/purchase-credit", description: "Preferences", icon: FiSettings },
  ],
  creator: [
    { label: "Dashboard", href: "/dashboard/creator", description: "Overview", icon: FiLayout },
    { label: "My Campaigns", href: "/dashboard/creator/my-campaigns", description: "Your active projects", icon: FiBookOpen },
    { label: "Create Campaign", href: "/dashboard/creator/new-campaign", description: "Launch a new project", icon: FiPlusCircle },
    { label: "Supporters", href: "/dashboard/creator/supporters", description: "Community updates", icon: FiUsers },
    { label: "Analytics", href: "/dashboard/creator/analytics", description: "Performance insights", icon: FiBarChart2 },
    { label: "Profile", href: "/profile", description: "Account details", icon: FiUser },
    { label: "Settings", href: "/dashboard/creator/settings", description: "Preferences", icon: FiSettings },
  ],
  admin: [
    { label: "Dashboard", href: "/dashboard/admin", description: "Overview", icon: FiLayout },
    { label: "Manage Users", href: "/dashboard/admin/manage-users", description: "User administration", icon: FiUsers },
    { label: "Manage Campaigns", href: "/dashboard/admin/campaigns", description: "Review campaigns", icon: FiBox },
    { label: "Donations", href: "/dashboard/admin/donations", description: "Funding activity", icon: FiCreditCard },
    { label: "Reports", href: "/dashboard/admin/reports", description: "Insights and exports", icon: FiFileText },
    { label: "Settings", href: "/dashboard/admin/settings", description: "Platform preferences", icon: FiSettings },
  ],
};
export const getDashboardHref = (role: string) => {
  switch (role) {
    case 'admin':
      return '/dashboard/admin';
    case 'creator':
      return '/dashboard/creator';
    case 'supporter':
    default:
      return '/dashboard/supporter';
  }
};

export function getDashboardNavItems(role?: string | null) {
  return dashboardNavItemsByRole[role ?? "supporter"] ?? dashboardNavItemsByRole.supporter;
}
