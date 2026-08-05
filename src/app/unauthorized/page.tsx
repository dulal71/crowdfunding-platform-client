import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-8 text-center shadow-2xl backdrop-blur">
        <p className="text-sm uppercase tracking-[0.3em] text-rose-400">403 - Access Denied</p>
        <h1 className="mt-3 text-2xl font-semibold text-zinc-100">Unauthorized</h1>
        <p className="mt-3 text-sm text-zinc-400">
          You do not have permission to access this page. Please contact an administrator if you
          believe this is a mistake.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link
            href="/"
            className="rounded-lg bg-cyan-500 px-4 py-2 text-sm font-medium text-zinc-950 transition hover:bg-cyan-400"
          >
            Go to Home
          </Link>
          <Link
            href="/login"
            className="rounded-lg border border-white/10 bg-zinc-900 px-4 py-2 text-sm font-medium text-zinc-100 transition hover:bg-zinc-800"
          >
            Login
          </Link>
        </div>
      </div>
    </main>
  );
}
