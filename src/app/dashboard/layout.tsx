import type { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 lg:px-8">
        <header className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-4 backdrop-blur">
          <div>
            <p className="text-sm text-zinc-400">Dashboard</p>
            <h1 className="text-xl font-semibold">CrowdLaunch</h1>
          </div>
          <div className="text-sm text-zinc-400">Role-based workspace</div>
        </header>

        <div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
          <aside className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
            <p className="mb-3 text-xs uppercase tracking-[0.3em] text-zinc-500">
              Navigation
            </p>
            <nav className="space-y-2 text-sm text-zinc-300">
              <div className="rounded-lg px-3 py-2 hover:bg-white/10">Home</div>
              <div className="rounded-lg px-3 py-2 hover:bg-white/10">Explore Campaigns</div>
              <div className="rounded-lg px-3 py-2 hover:bg-white/10">My Contributions</div>
              <div className="rounded-lg px-3 py-2 hover:bg-white/10">Purchase Credit</div>
              <div className="rounded-lg px-3 py-2 hover:bg-white/10">Payment History</div>
            </nav>
          </aside>

          <main className="rounded-2xl border border-white/10 bg-zinc-900/70 p-6 backdrop-blur">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
