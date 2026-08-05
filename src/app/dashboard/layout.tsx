import { redirect } from "next/navigation";
import { getSessionUser } from "@/app/lib/auth-server";

import { DashboardNavbar } from "@/components/dashboard/DashboardNavbar";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await getSessionUser();

  if (!user) {
    redirect("/login");
  }

  
console.log(user);
  const notifications = [
    { id: "1", title: "New Donation Received" },
    { id: "2", title: "Campaign Approved" },
    { id: "3", title: "Funding Milestone Reached" },
    { id: "4", title: "Profile Successfully Verified" },
    { id: "5", title: "New Supporter Message" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <header>
        <DashboardNavbar notifications={notifications} user={user} />
      </header>

      <div className="flex flex-1 flex-col md:flex-row">
        <aside className="md:py-4 md:pl-4">
          <DashboardSidebar user={user} />
        </aside>

        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}