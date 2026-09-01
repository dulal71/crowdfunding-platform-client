"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

// ---------------------------------------------------------------------------
// Hero Section following the provided design layout
// Stack: Next.js (App Router) + TypeScript + Tailwind CSS + Framer Motion
// ---------------------------------------------------------------------------

const GALLERY_IMAGES = [
  {
    url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop",
    alt: "Family and child",
    rotation: "-rotate-12 translate-y-6",
  },
  {
    url: "https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=600&auto=format&fit=crop",
    alt: "Community worker",
    rotation: "-rotate-6 translate-y-2",
  },
  {
    url: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=600&auto=format&fit=crop",
    alt: "Pet rescue",
    rotation: "rotate-0 translate-y-0",
  },
  {
    url: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=600&auto=format&fit=crop",
    alt: "Teens carrying equipment",
    rotation: "rotate-6 translate-y-2",
  },
  {
    url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop",
    alt: "Individual fundraiser",
    rotation: "rotate-12 translate-y-6",
  },
];

export default function HeroCrowdfunding() {
  return (
    <section className="relative overflow-hidden bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 text-center sm:px-8">
        
        {/* Top Tag Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-block"
        >
          <span className="inline-flex items-center rounded-full bg-accent/50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#2e7d32]">
            #1 crowdfunding platform
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mx-auto mt-6 max-w-3xl font-serif text-4xl font-extrabold tracking-tight text-primary-light sm:text-6xl lg:text-7xl"
        >
          Where successful <br className="hidden sm:inline" />
          fundraisers start
        </motion.h1>

        {/* Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-9 flex justify-center"
        >
          <Link
            href="/campaigns"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:bg-[#1b5636] hover:shadow-xl"
          >
            Donate Now
            <FiArrowRight className="h-5 w-5" />
          </Link>
        </motion.div>

        {/* Arced / Curved Image Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 flex flex-wrap items-end justify-center gap-4 sm:gap-6 lg:flex-nowrap"
        >
          {GALLERY_IMAGES.map((img, index) => (
            <div
              key={index}
              className={`relative h-56 w-36 overflow-hidden rounded-2xl shadow-xl transition-transform duration-300 hover:scale-105 sm:h-72 sm:w-48 lg:h-80 lg:w-56 ${img.rotation}`}
            >
              <img
                src={img.url}
                alt={img.alt}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}