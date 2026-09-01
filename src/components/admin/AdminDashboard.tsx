import getAllCampaign from "@/app/lib/service/getAllCampaign";
import { getAllUser } from "@/app/lib/service/getAllUser";


const AdminDashboard = async () => {
  const { data: campaignData } = await getAllCampaign();
  const { total: totalCampaigns, active, pending, completed } = campaignData ?? {};

  const { data: userData } = await getAllUser();
  const totalUsers = userData?.total || 0;

  const content = {
    heading: "Admin overview",
    description:
      "Keep the platform healthy with user management, campaign oversight, and reporting.",
    stats: [
      { label: "Users", value: totalUsers },
      { label: "Campaigns", value: totalCampaigns ?? 0 },
      { label: "Active", value: active ?? 0 },
      { label: "Pending", value: pending ?? 0 },
      { label: "Completed", value: completed ?? 0 },
      { label: "Donations", value: "$84k" },
    ],
    widgets: [
      {
        title: "Recent activity",
        body: "There are 7 pending moderation tasks and 3 withdrawal requests to review.",
      },
      {
        title: "Quick actions",
        body: "Manage users, review campaigns, and export reports.",
      },
    ],
  };

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-rose-900">
          Dashboard
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-primary">
          {content.heading}
        </h1>
        <p className="mt-3 max-w-2xl text-text">{content.description}</p>
      </section>

      <section className="grid gap-4 md:grid-cols-3 xl:grid-cols-6">
        {content.stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl  bg-white p-5 shadow"
          >
            <p className="text-md font-bold text-primary">{stat.label}</p>
            <p className="mt-2 text-4xl font-semibold text-accent">
              {stat.value}
            </p>
          </div>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        {content.widgets.map((widget) => (
          <div
            key={widget.title}
            className="rounded-2xl  bg-white p-6 shadow"
          >
            <h2 className="text-lg font-semibold text-primary">
              {widget.title}
            </h2>
            <p className="mt-2 text-sm leading-6 text-text">
              {widget.body}
            </p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default AdminDashboard;