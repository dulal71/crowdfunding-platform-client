"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import type { IconType } from "react-icons";
import { GiHamburgerMenu } from "react-icons/gi";
import {
  FiCode,
  FiCompass,
  FiGrid,
  FiHome,
  FiLogIn,
  FiLogOut,
  FiUserPlus,
} from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { getDashboardHref } from "../dashboard/dashboard-navigation";

interface NavUser {
  name?: string;
  image?: string | null;
  role?: string;
}

interface MobileMenuProps {
  isMenuOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  user?: NavUser | null;
  onLogout: () => void;
  isLoggingOut: boolean;
}

interface NavLinkConfig {
  label: string;
  href: string;
  icon: IconType;
}

const NAV_LINKS: NavLinkConfig[] = [
  { label: "Home", href: "/", icon: FiHome },
  { label: "Explore Campaigns", href: "/campaigns", icon: FiCompass },
];

function NavLinkItem({
  href,
  label,
  icon: Icon,
  isActive,
  onClose,
}: NavLinkConfig & { isActive: boolean; onClose: () => void }) {
  return (
    <Link
      href={href}
      onClick={onClose}
      aria-current={isActive ? "page" : undefined}
      className={`group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 transition-colors ${
        isActive
          ? "bg-cyan-500/10 text-cyan-700"
          : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
      }`}
    >
      <span
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors ${
          isActive
            ? "bg-cyan-500/15 text-cyan-600"
            : "bg-zinc-100 text-zinc-500 group-hover:bg-zinc-200 group-hover:text-zinc-700"
        }`}
      >
        <Icon className="h-[18px] w-[18px]" />
      </span>
      <span className="text-base font-medium">{label}</span>
    </Link>
  );
}

export default function MobileMenu({
  isMenuOpen,
  onOpen,
  onClose,
  user,
  onLogout,
  isLoggingOut,
}: MobileMenuProps) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    if (!isMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen, onClose]);
  useEffect(() => {
  setMounted(true);
}, []);

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(href));

  const dashboardHref = user
    ? getDashboardHref(user.role ?? "supporter")
    : "/dashboard/supporter";

  const drawer = (
    <>
      <div
        aria-hidden="true"
        onClick={onClose}
        className={`fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm transition-opacity duration-500 ${
          isMenuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        inert={!isMenuOpen}
        className={`fixed top-0 right-0 z-[70] flex h-[100dvh] w-[85%] max-w-sm flex-col bg-white shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header className="flex shrink-0 items-center justify-between border-b border-zinc-200 px-6 py-4">
          <span className="text-lg font-bold tracking-wide text-zinc-900">
            MENU
          </span>
          <button
            type="button"
            aria-label="Close menu"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-100 text-zinc-700 transition-colors hover:bg-zinc-200"
          >
            <IoClose size={20} />
          </button>
        </header>

        <nav className="flex-1 overflow-y-auto px-4 py-4">
          <ul className="flex flex-col gap-1.5">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <NavLinkItem
                  {...link}
                  isActive={isActive(link.href)}
                  onClose={onClose}
                />
              </li>
            ))}
          </ul>

          <div className="my-4 border-t border-zinc-200" />

          <ul className="flex flex-col gap-1.5">
            {!user ? (
              <>
                <li>
                  <NavLinkItem
                    href="/login"
                    label="Login"
                    icon={FiLogIn}
                    isActive={isActive("/login")}
                    onClose={onClose}
                  />
                </li>
                <li>
                  <NavLinkItem
                    href="/register"
                    label="Register"
                    icon={FiUserPlus}
                    isActive={isActive("/register")}
                    onClose={onClose}
                  />
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLinkItem
                    href={dashboardHref}
                    label="Dashboard"
                    icon={FiGrid}
                    isActive={isActive(dashboardHref)}
                    onClose={onClose}
                  />
                </li>
                <li>
                  <button
                    type="button"
                    onClick={onLogout}
                    disabled={isLoggingOut}
                    className="group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 disabled:opacity-60"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-zinc-100 text-zinc-500 transition-colors group-hover:bg-zinc-200 group-hover:text-zinc-700">
                      <FiLogOut className="h-[18px] w-[18px]" />
                    </span>
                    <span className="text-base font-medium">
                      {isLoggingOut ? "Logging out..." : "Logout"}
                    </span>
                  </button>
                </li>
              </>
            )}
          </ul>
        </nav>

        <footer className="shrink-0 border-t border-zinc-200 p-4">
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            onClick={onClose}
            className="group flex w-full items-center justify-center gap-2 rounded-full bg-cyan-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-cyan-700"
          >
            <FiCode className="h-4 w-4" />
            Join as Developer
          </a>
        </footer>
      </aside>
    </>
  );

 return (
  <div className="md:hidden">
    <button
      type="button"
      aria-label="Open menu"
      aria-expanded={isMenuOpen}
      onClick={onOpen}
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-zinc-700 transition-colors hover:bg-zinc-200"
    >
      <GiHamburgerMenu size={18} />
    </button>

    {mounted && createPortal(drawer, document.body)}
  </div>
);
}
