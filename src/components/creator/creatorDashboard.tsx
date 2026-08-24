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
      <section className="rounded-2xl  bg-white p-8 shadow">

        <h1 className="mt-3 text-3xl font-semibold text-primary">
          {user?.name ? `Welcome back, ${user.name}` : "Creator overview"}
        </h1>
        <p className="mt-3 max-w-2xl text-text">
          Monitor campaign progress, supporter engagement, and your next best actions.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-2xl  bg-white p-5 shadow">
            <p className="text-md text-primary">{stat.label}</p>
            <p className="mt-2 text-2xl font-semibold text-accent">{stat.value}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl  bg-white p-6 shadow">
          <h2 className="text-lg font-semibold text-primary-light">Recent activity</h2>
          <p className="mt-2 text-sm leading-6 text-text">
            Two new supporters joined your latest campaign and a payout is ready for withdrawal.
          </p>
        </div>
        <div className="rounded-2xl  bg-white p-6 shadow">
          <h2 className="text-lg font-semibold text-primary-light">Quick actions</h2>
          <p className="mt-2 text-sm leading-6 text-text">
            Create a campaign, review analytics, and manage your withdrawals.
          </p>
        </div>
      </section>
    </div>
  );
}
