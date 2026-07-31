"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { authClient } from "@/app/lib/auth-client";
import { Logo } from "./Logo";

export function Navbar() {
  const pathname = usePathname();
  const { data: session, isPending, error, refetch } = authClient.useSession();

  const navLinkClass = (href: string) =>
    `text-sm font-medium transition ${
      pathname === href ? "text-cyan-600" : "text-zinc-600 hover:text-zinc-900"
    }`;

  const isLoggedIn = Boolean(session?.user);

  return (
    <header className="border-b border-zinc-200 bg-white backdrop-blur">
      <div className="mx-auto grid max-w-7xl grid-cols-3 items-center px-4 py-4 sm:px-6 lg:px-8">
        {/* Left: Logo */}
        <div className="flex justify-start">
          <Logo />
        </div>

        {/* Center: Nav links */}
        <nav className="flex items-center justify-center gap-4 sm:gap-6">
          <Link href="/campaigns" className={navLinkClass("/campaigns")}>
            Explore Campaigns
          </Link>

          {isLoggedIn && (
            <>
              <Link href="/dashboard" className={navLinkClass("/dashboard")}>
                Dashboard
              </Link>
              <Link href="/profile" className={navLinkClass("/profile")}>
                {session?.user?.name ?? "Profile"}
              </Link>
            </>
          )}
        </nav>

        {/* Right: Auth / actions */}
        <div className="flex items-center justify-end gap-4 sm:gap-6">
          {!isLoggedIn ? (
            <>
              <Link href="/login" className={navLinkClass("/login")}>
                Login
              </Link>
              <Link href="/register" className={navLinkClass("/register")}>
                Register
              </Link>
              
             <a   href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-cyan-500 bg-cyan-50 px-3 py-2 text-sm font-medium text-cyan-700 transition hover:bg-cyan-100"
              >
                Join as Developer
              </a>
            </>
          ) : (
            <>
              <span className="rounded-full border border-cyan-300 bg-cyan-50 px-3 py-1 text-sm text-cyan-700">
                {session?.user?.credits ?? 0} Credits
              </span>
              <button
                onClick={() => refetch()}
                className="rounded-full border border-zinc-200 px-3 py-2 text-sm text-zinc-600 transition hover:bg-zinc-100"
              >
                {isPending ? "Loading..." : "Refresh"}
              </button>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-cyan-500 bg-cyan-50 px-3 py-2 text-sm font-medium text-cyan-700 transition hover:bg-cyan-100"
              >
                Join as Developer
              </a>
            </>
          )}
        </div>
      </div>
    </header>
  );
}