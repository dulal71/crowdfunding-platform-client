"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { authClient } from "@/app/lib/auth-client";
import { Logo } from "./Logo";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinkClass = (href: string) =>
    `text-md font-medium transition ${
      pathname === href ? "text-cyan-600" : "text-zinc-600 hover:text-zinc-900"
    }`;

  const isLoggedIn = Boolean(session?.user);

  const closeMenu = () => setIsMenuOpen(false);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await authClient.signOut();
      closeMenu();
      router.push("/");
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <header className="border-b border-zinc-200 bg-white backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:px-8">
        <div className="flex min-w-0 items-center">
          <Logo />
        </div>

        <nav className="hidden lg:flex lg:items-center lg:justify-center lg:gap-4">
          <Link href="/campaigns" className={navLinkClass("/campaigns")}>
            Explore Campaigns
          </Link>

          {isLoggedIn ? (
            <>
              <Link href="/dashboard" className={navLinkClass("/dashboard")}>
                Dashboard
              </Link>
              <Link href="/profile" className={navLinkClass("/profile")}>
                Profile
              </Link>
            </>
          ) : null}
        </nav>

        <div className="hidden lg:flex lg:items-center lg:justify-end lg:gap-4">
          {!isLoggedIn ? (
            <>
              <Link href="/login" className={navLinkClass("/login")}>
                Login
              </Link>
              <Link href="/register" className={navLinkClass("/register")}>
                Register
              </Link>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="whitespace-nowrap rounded-full border border-cyan-500 bg-cyan-50 px-3 py-2 text-sm font-medium text-cyan-700 transition hover:bg-cyan-100"
              >
                Join as Developer
              </a>
            </>
          ) : (
            <>
              <span className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-zinc-700">
                <span className="inline-flex h-2.5 w-2.5 rounded-full bg-red-500" />
                <span className="text-red-500">{session?.user?.credits ?? 0}</span>
                <span className="text-zinc-500">Credits</span>
              </span>
              <button
                type="button"
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="whitespace-nowrap rounded-full border border-zinc-200 bg-white px-3 py-2 text-sm font-medium text-zinc-700 transition hover:-translate-y-0.5 hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isLoggingOut ? "Logging out..." : "Logout"}
              </button>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="whitespace-nowrap rounded-full border border-cyan-300 bg-gradient-to-r from-cyan-50 to-sky-50 px-3 py-2 text-sm font-semibold text-cyan-700 transition hover:-translate-y-0.5 hover:bg-cyan-100"
              >
                Join as Developer
              </a>
            </>
          )}
        </div>

        <button
          type="button"
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-700 shadow-sm transition hover:bg-zinc-50 lg:hidden"
        >
          <svg
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            {isMenuOpen ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <>
                <path d="M4 7h16" />
                <path d="M4 12h16" />
                <path d="M4 17h16" />
              </>
            )}
          </svg>
        </button>
      </div>

      {isMenuOpen ? (
        <div id="mobile-navigation" className="border-t border-zinc-200 bg-white px-4 py-4 lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-3">
            <nav className="flex flex-col gap-2">
              <Link
                href="/campaigns"
                onClick={closeMenu}
                className={`${navLinkClass("/campaigns")} block rounded-lg px-3 py-2 hover:bg-zinc-50`}
              >
                Explore Campaigns
              </Link>

              {isLoggedIn ? (
                <>
                  <Link
                    href="/dashboard"
                    onClick={closeMenu}
                    className={`${navLinkClass("/dashboard")} block rounded-lg px-3 py-2 hover:bg-zinc-50`}
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/profile"
                    onClick={closeMenu}
                    className={`${navLinkClass("/profile")} block rounded-lg px-3 py-2 hover:bg-zinc-50`}
                  >
                    Profile
                  </Link>
                </>
              ) : null}
            </nav>

            <div className="flex flex-col gap-2">
              {!isLoggedIn ? (
                <>
                  <Link
                    href="/login"
                    onClick={closeMenu}
                    className={`${navLinkClass("/login")} block rounded-lg px-3 py-2 hover:bg-zinc-50`}
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    onClick={closeMenu}
                    className={`${navLinkClass("/register")} block rounded-lg px-3 py-2 hover:bg-zinc-50`}
                  >
                    Register
                  </Link>
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noreferrer"
                    onClick={closeMenu}
                    className="whitespace-nowrap rounded-full border border-cyan-500 bg-cyan-50 px-3 py-2 text-sm font-medium text-cyan-700 transition hover:bg-cyan-100"
                  >
                    Join as Developer
                  </a>
                </>
              ) : (
                <>
                  <span className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-white py-2 text-sm font-semibold text-zinc-700">
                    <span className="inline-flex h-2.5 w-2.5 rounded-full bg-red-500" />
                    <span className="text-red-500">{session?.user?.credits ?? 0}</span>
                    <span className="text-zinc-500">Credits</span>
                  </span>
                  <button
                    type="button"
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className="rounded-full border border-zinc-200 bg-white px-3 py-2 text-left text-sm font-medium text-zinc-700 transition hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isLoggingOut ? "Logging out..." : "Logout"}
                  </button>
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noreferrer"
                    onClick={closeMenu}
                    className="whitespace-nowrap rounded-full border border-cyan-300 bg-gradient-to-r from-cyan-50 to-sky-50 px-3 py-2 text-sm font-semibold text-cyan-700 transition hover:bg-cyan-100"
                  >
                    Join as Developer
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
