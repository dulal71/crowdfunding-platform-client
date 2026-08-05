type CreatorDashboardProps = {
  user?: {
    name?: string;
  };
};

const stats = [
  { label: "Live campaigns", value: "4" },
  { label: "Supporters", value: "1.2k" },
  { label: "Raised", value: "$18.6k" },
];

export function CreatorDashboard({ user }: CreatorDashboardProps) {
  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-600">Creator</p>
        <h1 className="mt-3 text-3xl font-semibold text-zinc-900">
          {user?.name ? `Welcome back, ${user.name}` : "Creator overview"}
        </h1>
        <p className="mt-3 max-w-2xl text-zinc-600">
          Monitor campaign progress, supporter engagement, and your next best actions.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-zinc-500">{stat.label}</p>
            <p className="mt-2 text-2xl font-semibold text-zinc-900">{stat.value}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-zinc-900">Recent activity</h2>
          <p className="mt-2 text-sm leading-6 text-zinc-600">
            Two new supporters joined your latest campaign and a payout is ready for withdrawal.
          </p>
        </div>
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-zinc-900">Quick actions</h2>
          <p className="mt-2 text-sm leading-6 text-zinc-600">
            Create a campaign, review analytics, and manage your withdrawals.
          </p>
        </div>
      </section>
    </div>
  );
}
