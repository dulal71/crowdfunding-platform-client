"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { authClient } from "@/app/lib/auth-client";
import { Logo } from "./Logo";
import { motion } from "framer-motion";
import { UserMenu } from "./UserMenu";
import MobileMenu from "./MobileMenu";

type NavUser = {
  name?: string;
  image?: string | null;
  role?: string;
};

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const user = (session?.user ?? null) as NavUser | null;

  const isActiveLink = (href: string) => pathname === href || (href !== "/" && pathname.startsWith(href));

 const NAV_LINKS = [
  { href: "/", label: "HOME" },
  { href: "/campaigns", label: "EXPLORE CAMPAIGNS" },
  { href: "/about", label: "ABOUT" },
];

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
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex min-w-0 items-center">
          <Logo />
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map(({ href, label }) => {
            const active = isActiveLink(href);
            return (
              <Link
                key={href}
                href={href}
                className={`relative text-md font-medium transition pb-1 ${
                  active ? "text-primary" : "text-text hover:text-primary-light"
                }`}
              >
                {label}
                {active && (
                  <motion.div
                    layoutId="navbar-underline"
                    className="absolute left-0 right-0 -bottom-1 h-0.5 bg-primary rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex md:items-center md:gap-4">
          {!user ? (
            <>
              <Link href="/login" className="border border-black px-2 py-0.5 text-black rounded-full transition-all duration-500 hover:bg-red-700 hover:text-white ">
                Login
              </Link>
              <Link href="/register" className="shadow rounded-full px-3 py-0.5 bg-linear-to-r from-cyan-800 to-violet-500">
                Register
              </Link>
            </>
          ) : (
            <UserMenu user={user as { name?: string; image?: string; role: string }} onLogout={handleLogout} isLoggingOut={isLoggingOut} />
          )}
        </div>

        {/* Mobile Menu Toggle Button */}
        <MobileMenu
          isMenuOpen={isMenuOpen}
          onOpen={() => setIsMenuOpen(true)}
          onClose={closeMenu}
          user={user}
          onLogout={handleLogout}
          isLoggingOut={isLoggingOut}
        />
      </div>
    </header>
  );
}