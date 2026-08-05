"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getDashboardNavItems } from "@/components/dashboard/dashboard-navigation";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FiSearch,
  FiSettings,
  FiLogOut,
  FiSun,
  FiMoon,
  FiMenu,
  FiX,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

type DashboardUser = {
  role: string;
  name: string;
  email?: string;
  credits: number;
};
type DashboardSidebarProps = {
  user: DashboardUser;
};
export function DashboardSidebar({
  user

}: DashboardSidebarProps) {
  const pathname = usePathname();
  const items = getDashboardNavItems(user.role);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [search, setSearch] = useState("");

  const handleNavigate = () => {
   
    setMobileOpen(false);
  };

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const filteredItems = items.filter((item) =>
    item.label.toLowerCase().includes(search.toLowerCase())
  );

  const showLabel = !collapsed;

  const sidebarContent = (
    <div
      className={`flex h-full flex-col rounded-3xl border border-zinc-100 bg-white p-4 shadow-sm transition-[width] duration-200 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Logo + collapse toggle */}
      <div className="mb-4 flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-zinc-900 text-sm font-bold text-white">
            {user.name.charAt(0).toUpperCase()}
          </div>
          {showLabel && (
            <span className="text-lg font-semibold text-zinc-900">CrowdLaunch</span>
          )}
        </div>

        {/* Desktop: collapse/expand toggle */}
        <button
          type="button"
          onClick={() => setCollapsed((prev) => !prev)}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="hidden h-7 w-7 items-center justify-center rounded-full text-zinc-400 hover:bg-zinc-100 md:flex"
        >
          {collapsed ? <FiChevronRight size={14} /> : <FiChevronLeft size={14} />}
        </button>

        {/* Mobile: close */}
        <button
          type="button"
          onClick={() => setMobileOpen(false)}
          aria-label="Close menu"
          className="flex h-8 w-8 items-center justify-center rounded-full text-zinc-400 hover:bg-zinc-100 md:hidden"
        >
          <FiX size={16} />
        </button>
      </div>

      {/* Search */}
      <div
        className={`mb-4 flex items-center gap-2 rounded-2xl bg-zinc-50 px-3 py-2.5 ${
          collapsed ? "justify-center px-2" : ""
        }`}
      >
        <FiSearch size={16} className="shrink-0 text-zinc-400" />
        {showLabel && (
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
            className="w-full bg-transparent text-sm text-zinc-700 placeholder:text-zinc-400 focus:outline-none"
          />
        )}
      </div>

      {/* Nav items */}
      <nav className="flex-1 space-y-1 overflow-y-auto">
        {filteredItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (pathname.startsWith(item.href + "/") &&
              !items.some(
                (other) =>
                  other.href !== item.href && other.href.startsWith(item.href)
              ));
          const Icon = item.icon;

          return (
            <Link
              key={`${item.label}-${item.href}`}
              href={item.href}
              onClick={handleNavigate}
              title={collapsed ? item.label : undefined}
              className={`group flex items-center rounded-2xl px-3 py-2.5 text-sm font-medium transition ${
                isActive
                  ? "bg-zinc-900 text-white"
                  : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900"
              } ${collapsed ? "justify-center px-2" : "justify-between"}`}
            >
              <span className={`flex items-center ${collapsed ? "" : "gap-3"}`}>
                <Icon
                  size={17}
                  className={`shrink-0 ${isActive ? "text-white" : "text-zinc-400 group-hover:text-zinc-600"}`}
                />
                {showLabel && item.label}
              </span>
              {showLabel && item.badge ? (
                <span
                  className={`rounded-md px-1.5 py-0.5 text-xs font-semibold ${
                    isActive ? "bg-white/20 text-white" : "bg-zinc-100 text-zinc-500"
                  }`}
                >
                  {item.badge}
                </span>
              ) : null}
            </Link>
          );
        })}
      </nav>

      {/* Settings / Logout */}
      <div className="mt-4 space-y-1 border-t border-zinc-100 pt-4">
        <Link
          href="/dashboard/settings"
          onClick={handleNavigate}
          title={collapsed ? "Settings" : undefined}
          className={`flex items-center rounded-2xl px-3 py-2.5 text-sm font-medium text-zinc-500 transition hover:bg-zinc-50 hover:text-zinc-900 ${
            collapsed ? "justify-center px-2" : "gap-3"
          }`}
        >
          <FiSettings size={17} className="shrink-0 text-zinc-400" />
          {showLabel && "Settings"}
        </Link>
        <button
          type="button"
          title={collapsed ? "Logout" : undefined}
          className={`flex w-full items-center rounded-2xl px-3 py-2.5 text-sm font-medium text-zinc-500 transition hover:bg-zinc-50 hover:text-zinc-900 ${
            collapsed ? "justify-center px-2" : "gap-3"
          }`}
        >
          <FiLogOut size={17} className="shrink-0 text-zinc-400" />
          {showLabel && "Logout"}
        </button>
      </div>

      {/* Light / Dark toggle */}
      {showLabel ? (
        <div className="mt-3 flex items-center gap-2 rounded-2xl bg-zinc-50 p-1">
          <button
            type="button"
            onClick={() => setTheme("light")}
            className={`flex flex-1 items-center justify-center gap-1.5 rounded-xl py-2 text-xs font-semibold transition ${
              theme === "light" ? "bg-white text-zinc-900 shadow-sm" : "text-zinc-400"
            }`}
          >
            <FiSun size={14} />
            Light
          </button>
          <button
            type="button"
            onClick={() => setTheme("dark")}
            className={`flex flex-1 items-center justify-center gap-1.5 rounded-xl py-2 text-xs font-semibold transition ${
              theme === "dark" ? "bg-white text-zinc-900 shadow-sm" : "text-zinc-400"
            }`}
          >
            <FiMoon size={14} />
            Dark
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          aria-label="Toggle theme"
          className="mt-3 flex items-center justify-center rounded-2xl bg-zinc-50 p-2.5 text-zinc-500 hover:bg-zinc-100"
        >
          {theme === "light" ? <FiSun size={16} /> : <FiMoon size={16} />}
        </button>
      )}

      {/* User profile card */}
      <div
        className={`mt-3 flex items-center gap-2.5 rounded-2xl bg-zinc-50 p-2.5 ${
          collapsed ? "justify-center" : ""
        }`}
      >
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-sm font-semibold text-white">
          {user.name.charAt(0).toUpperCase()}
        </div>
        {showLabel && (
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-zinc-900">{user.name}</p>
            {user.email ? (
              <p className="truncate text-xs text-zinc-400">{user.email}</p>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile top bar */}
      <div className="flex items-center justify-between p-3 md:hidden">
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-700 shadow-sm"
        >
          <FiMenu size={20} />
        </button>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden h-full md:block">{sidebarContent}</div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-40 bg-black/40 md:hidden"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.25, ease: "easeOut" }}
              className="fixed inset-y-0 left-0 z-50 p-3 md:hidden"
            >
              {sidebarContent}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}