"use client";
import { AnimatePresence, motion } from "framer-motion";
import { FiChevronDown, FiUser, FiGrid, FiLogOut } from "react-icons/fi";
import { useState, useRef } from "react";
import Link from "next/link";
import { Avatar } from "@heroui/react";
import { getDashboardHref } from "../dashboard/dashboard-navigation";

export function UserMenu({
  user,
  onLogout,
  isLoggingOut,
}: {
  user: { name?: string; image?: string ;role:string};
  onLogout: () => void;
  isLoggingOut: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openMenu = () => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    setIsOpen(true);
  };

  const scheduleClose = () => {
    closeTimeout.current = setTimeout(() => setIsOpen(false), 150);
  };

  const menuItems = [
  { label: "Profile", href: "/profile", icon: FiUser },
  { label: "Dashboard", href: getDashboardHref(user.role), icon: FiGrid },
];

  return (
    <div
      className="relative z-999"
      onMouseEnter={openMenu}
      onMouseLeave={scheduleClose}
    >
      <button
        type="button"
        className="flex items-center gap-2 rounded-full px-2 py-1 text-sm font-medium text-zinc-700 shadow transition hover:bg-zinc-50"
      >
        <Avatar>
          <Avatar.Image alt={user.name} src={user.image} />
          <Avatar.Fallback>{user.name}</Avatar.Fallback>
        </Avatar>
        <span>{user.name}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="flex items-center"
        >
          <FiChevronDown className="h-3 w-3" />
        </motion.span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute right-0 top-full z-50 mt-2 w-56 origin-top-right rounded-xl border border-zinc-200 bg-white py-2 shadow-lg"
            onMouseEnter={openMenu}
            onMouseLeave={scheduleClose}
          >
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-2 px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-50"
                onClick={() => setIsOpen(false)}
              >
                <item.icon className="h-4 w-4 text-zinc-500" />
                {item.label}
              </Link>
            ))}
            <button
              type="button"
              onClick={onLogout}
              disabled={isLoggingOut}
              className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-zinc-700 hover:bg-zinc-50 disabled:opacity-60"
            >
              <FiLogOut className="h-4 w-4 text-zinc-500" />
              {isLoggingOut ? "Signing out..." : "Sign out"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}