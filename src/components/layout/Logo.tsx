import Link from "next/link";
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
      className={`inline-flex items-center rounded-xl   ${className}`}
    >
      <span
        className={`${unbounded.className} bg-gradient-to-r from-sky-600 via-cyan-600 to-indigo-600 bg-clip-text text-2xl font-bold tracking-[0.12em] text-transparent uppercase`}
      >
        CROWDNEST
      </span>
    </Link>
  );
}