type RoleDashboardHomeProps = {
  role: string;
};

const roleContent: Record<string, { heading: string; description: string; stats: Array<{ label: string; value: string }>; widgets: Array<{ title: string; body: string }> }> = {
  supporter: {
    heading: "Supporter overview",
    description: "Track your contributions, saved campaigns, and account balance in one place.",
    stats: [
      { label: "Total donated", value: "$2,450" },
      { label: "Active favorites", value: "12" },
      { label: "Credits", value: "150" },
    ],
    widgets: [
      { title: "Recent activity", body: "You backed 3 campaigns this month and received 2 project updates." },
      { title: "Quick actions", body: "Explore new campaigns, top up credits, and review your payment history." },
    ],
  },
  creator: {
    heading: "Creator overview",
    description: "Monitor campaign progress, supporter engagement, and your next best actions.",
    stats: [
      { label: "Live campaigns", value: "4" },
      { label: "Supporters", value: "1.2k" },
      { label: "Raised", value: "$18.6k" },
    ],
    widgets: [
      { title: "Recent activity", body: "Two new supporters joined your latest campaign and a payout is ready." },
      { title: "Quick actions", body: "Create a campaign, review analytics, and manage withdrawals." },
    ],
  },
  admin: {
    heading: "Admin overview",
    description: "Keep the platform healthy with user management, campaign oversight, and reporting.",
    stats: [
      { label: "Users", value: "328" },
      { label: "Campaigns", value: "46" },
      { label: "Donations", value: "$84k" },
    ],
    widgets: [
      { title: "Recent activity", body: "There are 7 pending moderation tasks and 3 withdrawal requests to review." },
      { title: "Quick actions", body: "Manage users, review campaigns, and export reports." },
    ],
  },
};

export function RoleDashboardHome({ role }: RoleDashboardHomeProps) {
  const content = roleContent[role] ?? roleContent.supporter;

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-600">Dashboard</p>
        <h1 className="mt-3 text-3xl font-semibold text-zinc-900">{content.heading}</h1>
        <p className="mt-3 max-w-2xl text-zinc-600">{content.description}</p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {content.stats.map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-zinc-500">{stat.label}</p>
            <p className="mt-2 text-2xl font-semibold text-zinc-900">{stat.value}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        {content.widgets.map((widget) => (
          <div key={widget.title} className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-zinc-900">{widget.title}</h2>
            <p className="mt-2 text-sm leading-6 text-zinc-600">{widget.body}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
