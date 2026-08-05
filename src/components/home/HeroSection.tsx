"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function HeroSection() {

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-[linear-gradient(135deg,#f6fbff_0%,#eef7ff_35%,#f7faff_100%)] px-4 py-20 sm:px-6 lg:px-8 lg:py-10">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.18),transparent_55%)]" />
      <div className="absolute left-1/2 top-1/2 -z-10 h-112 w-md -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/25 blur-[140px]" />

      <div className="mx-auto flex w-full max-w-7xl flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <div className="mb-6 inline-flex items-center rounded-full border border-cyan-200/80 bg-white/70 px-4 py-2 text-sm font-medium text-cyan-700 shadow-sm backdrop-blur">
            <span className="mr-2 h-2.5 w-2.5 rounded-full bg-cyan-500" />
            Crowdnest • Trusted Crowdfunding
          </div>

          <h1 className="text-4xl font-semibold leading-tight tracking-tight text-zinc-900 sm:text-5xl lg:text-7xl">
            Fund the Future
            <motion.span
              className="block bg-linear-to-r from-cyan-500 via-sky-500 to-violet-500 bg-clip-text text-transparent"
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            >
              Together.
            </motion.span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-zinc-600 sm:text-xl">
            Discover meaningful campaigns, support creators with credits, and help turn great ideas into reality.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/campaigns"
              className="inline-flex items-center justify-center rounded-full bg-cyan-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-600/20 transition hover:-translate-y-0.5 hover:bg-cyan-500"
            >
              Explore Campaigns
            </Link>
            <Link
              href="/register"
              className="inline-flex items-center justify-center rounded-full border border-zinc-200 bg-white/80 px-6 py-3 text-sm font-semibold text-zinc-700 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
            >
              Start Campaign
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}