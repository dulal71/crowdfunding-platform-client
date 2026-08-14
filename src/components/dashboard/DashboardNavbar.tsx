"use client";

import { useState, useRef, useEffect } from "react";

import { Logo } from "../layout/Logo";
import { INotification } from "@/types/campaign";

import Notification from "./Notification";


type DashboardUser = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  credits:number,
  role?: string | null;
};



type DashboardNavbarProps = {
  user: DashboardUser;
  notifications?: INotification[];
};

export function DashboardNavbar({user, notifications = [] }: DashboardNavbarProps) {

  
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

 return (
    <header className="relative border-b border-zinc-200 bg-white backdrop-blur z-50">
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
          
<Notification
notifications={notifications}
  isNotifOpen={isNotifOpen}
  setIsNotifOpen={setIsNotifOpen}
  unreadCount={unreadCount}
  notifRef={notifRef}
/>
          
        </div>
      </div>
    </header>
  );
}