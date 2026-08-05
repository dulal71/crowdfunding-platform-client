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
  FiSearch,
  FiClock,
  FiHeart,
} from "react-icons/fi";
import { GiReceiveMoney } from "react-icons/gi";
import { PiCoins } from "react-icons/pi";

export type DashboardNavItem = {
  label: string;
  href: string;
  description: string;
  icon: IconType;
};

export const dashboardNavItemsByRole: Record<string, DashboardNavItem[]> = {
  supporter: [
    { label: "Dashboard", href: "/dashboard/supporter", description: "Overview", icon: FiLayout },
    { label: "My Donations", href: "/dashboard/supporter/my-contributions", description: "My Donations", icon:GiReceiveMoney  },
    { label: "Explore Campaigns", href: "/dashboard/supporter/explore-campaigns", description: "Explore Campaigns", icon:FiSearch },
    { label: "Payment History", href: "/dashboard/supporter/payment-history", description: "payment-history", icon: FiClock },
    { label: "Purchase Credit", href: "/dashboard/supporter/purchase-credit", description: "Preferences", icon: PiCoins },
  ],
creator: [
  {
    label: "Dashboard",
    href: "/dashboard/creator",
    description: "Campaign overview",
    icon: FiLayout,
  },
  {
    label: "My Campaigns",
    href: "/dashboard/creator/my-campaigns",
    description: "Manage your campaigns",
    icon: FiBookOpen,
  },
  {
    label: "Create Campaign",
    href: "/dashboard/creator/new-campaigns",
    description: "Start a new fundraiser",
    icon: FiPlusCircle,
  },
  {
    label: "Supporters",
    href: "/dashboard/creator/withdrawals",
    description: "View your supporters",
    icon: FiHeart,
  },
  {
    label: "payment-History",
    href: "/dashboard/creator/payment-history",
    description: "Track campaign performance",
    icon: FiBarChart2,
  },
  {
    label: "Profile",
    href: "/profile",
    description: "Manage your profile",
    icon: FiUser,
  },
  
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
