"use client";

import { useState, useRef, useEffect } from "react";

import { Logo } from "../layout/Logo";
import { INotification } from "@/types/campaign";

import Notification from "./Notification";
import { TbCredits } from "react-icons/tb";
import { FaCreditCard } from "react-icons/fa";


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
          <span className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-primary-light px-3 py-1.5 text-sm font-semibold ">
            <FaCreditCard className="text-accent" />
            <span className="text-accent">{user.credits}</span>
            <span className="hidden text-text sm:inline">Credits</span>
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