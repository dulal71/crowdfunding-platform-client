type SupporterDashboardProps = {
  user?: {
    name?: string;
    credits?: number;
  };
};

const stats = [
  { label: "Total donated", value: "$2,450" },
  { label: "Active favorites", value: "12" },
];

export function SupporterDashboard({ user }: SupporterDashboardProps) {
  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-600">Supporter</p>
        <h1 className="mt-3 text-3xl font-semibold text-zinc-900">
          {user?.name ? `Welcome back, ${user.name}` : "Supporter overview"}
        </h1>
        <p className="mt-3 max-w-2xl text-zinc-600">
          Track your contributions, saved campaigns, and account balance in one place.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-zinc-500">{stat.label}</p>
            <p className="mt-2 text-2xl font-semibold text-zinc-900">{stat.value}</p>
          </div>
        ))}
        <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-zinc-500">Available credits</p>
          <p className="mt-2 text-2xl font-semibold text-cyan-600">{user?.credits ?? 0}</p>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-zinc-900">Recent activity</h2>
          <p className="mt-2 text-sm leading-6 text-zinc-600">
            You backed 3 campaigns this month and received 2 project updates from creators you support.
          </p>
        </div>
      </section>
    </div>
  );
}
