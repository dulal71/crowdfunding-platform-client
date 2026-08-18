"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Unbounded } from "next/font/google";

const unbounded = Unbounded({
  subsets: ["latin"],
  weight: ["700"],
});

export function Logo({
  href = "/",
  className = "",
}: {
  href?: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`relative inline-block overflow-hidden ${className}`}
    >
      <motion.span
  animate={{
    backgroundPosition: [
      "0% 50%",
      "100% 50%",
      "0% 50%",
    ],
  }}
  transition={{
    duration: 5,
    repeat: Infinity,
    ease: "linear",
  }}
 className={`${unbounded.className}
  bg-[linear-gradient(90deg,var(--color-primary),var(--color-primary-light),var(--color-accent))]
  bg-[length:300%_300%]
  bg-clip-text
  text-transparent
  text-2xl
  font-bold`}
>
  CROWDLAUNCH
</motion.span>

      <motion.div
        className="absolute inset-y-0 -left-24 w-20 bg-gradient-to-r from-transparent via-white/70 to-transparent blur-md"
        animate={{
          x: ["0%", "450%"],
        }}
        transition={{
          duration: 2.8,
          repeat: Infinity,
          ease: "linear",
          repeatDelay: 1,
        }}
      />
    </Link>
  );
}