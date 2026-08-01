export default function ProfilePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-12 text-zinc-900 sm:px-6 lg:px-8">
      <div className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-600">Profile</p>
        <h1 className="mt-3 text-3xl font-semibold">Your profile</h1>
        <p className="mt-3 max-w-2xl text-zinc-600">
          Manage your personal information, preferences, and account details here.
        </p>
      </div>
    </main>
  );
}
