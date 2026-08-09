"use client";

import { useState, useRef, useEffect } from "react";

import { Logo } from "../layout/Logo";
import { Notification } from "@/types/campaign";


type DashboardUser = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  credits:number,
  role?: string | null;
};



type DashboardNavbarProps = {
  user: DashboardUser;
  notifications?: Notification[];
};

export function DashboardNavbar({user, notifications = [] }: DashboardNavbarProps) {

 
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setIsNotifOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const initials =
    user?.name
      ?.split(" ")
      .map((part) => part[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() ?? "?";

  return (
    <header className="border-b border-zinc-200 bg-white backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center">
          <Logo />
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          {/* Available Credits */}
          <span className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-sm font-semibold text-zinc-700">
            <span className="inline-flex h-2.5 w-2.5 rounded-full bg-red-500" />
            <span className="text-red-500">{user.credits}</span>
            <span className="hidden text-zinc-500 sm:inline">Credits</span>
          </span>

          {/* Notifications */}
          <div className="relative" ref={notifRef}>
            <button
              type="button"
              aria-label="Notifications"
              onClick={() => setIsNotifOpen((prev) => !prev)}
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-600 transition hover:bg-zinc-50"
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
                <path d="M6 8a6 6 0 0 1 12 0c0 4 1.5 5.5 2 6H4c.5-.5 2-2 2-6Z" />
                <path d="M10 20a2 2 0 0 0 4 0" />
              </svg>
              {unreadCount > 0 ? (
                <span className="absolute -right-0.5 -top-0.5 inline-flex h-4 w-4 items-center justify-center rounded-full bg-cyan-600 text-[10px] font-semibold text-white">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              ) : null}
            </button>

            {isNotifOpen ? (
              <div className="absolute right-0 z-20 mt-2 w-72 rounded-2xl border border-zinc-200 bg-white p-2 shadow-lg">
                <div className="px-2 py-1.5 text-sm font-semibold text-zinc-700">Notifications</div>
                {notifications.length === 0 ? (
                  <p className="px-2 py-3 text-sm text-zinc-500">You're all caught up.</p>
                ) : (
                  <ul className="flex flex-col gap-1">
                    {notifications.map((n) => (
                      <li
                        key={n._id}
                        className={`rounded-lg px-2 py-2 text-sm ${
                          n.read ? "text-zinc-500" : "font-medium text-zinc-800"
                        } hover:bg-zinc-50`}
                      >
                        {n.title}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ) : null}
          </div>

          
        </div>
      </div>
    </header>
  );
}