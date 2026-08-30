// components/CampaignCategories.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaBookOpen, FaFutbol, FaHeartbeat, FaHome, FaLaptopCode, FaLeaf, FaMusic, FaPalette, FaTint, FaUsers } from "react-icons/fa";

interface Category {
  title: string;
  description: string;
  image: string;
  accent: string; 
  icon: React.ElementType; 
}

const categories: Category[] = [
  {
    title: "Technology",
    description: "Support innovative technology projects that create positive change.",
    image: "/images/technology.avif",
    accent: "bg-blue-700",
    icon: FaLaptopCode,
  },
  {
    title: "Art",
    description: "Help artists and creative projects bring their ideas to life.",
    image: "/images/art.avif",
    accent: "bg-purple-700",
    icon: FaPalette,
  },
  {
    title: "Community",
    description: "Support projects that strengthen communities and improve lives.",
    image: "/images/community.avif",
    accent: "bg-amber-600",
    icon: FaUsers,
  },
  {
    title: "Health",
    description: "Fund healthcare, medical support, and wellness initiatives.",
    image: "/images/health.avif",
    accent: "bg-rose-700",
    icon: FaHeartbeat,
  },
  {
    title: "Education",
    description: "Fund campaigns that give children access to quality education.",
    image: "/images/education.avif",
    accent: "bg-emerald-700",
    icon: FaBookOpen,
  },
  {
    title: "Environment",
    description: "Support projects that protect nature and create a healthier planet.",
    image: "/images/environment.avif",
    accent: "bg-green-700",
    icon: FaLeaf,
  },
  {
    title: "Music",
    description: "Help musicians and music projects turn creative ideas into reality.",
    image: "/images/music.avif",
    accent: "bg-pink-700",
    icon: FaMusic,
  },
  {
    title: "Sports",
    description: "Support athletes, teams, and sports projects in your community.",
    image: "/images/sports.avif",
    accent: "bg-orange-700",
    icon: FaFutbol,
  },
];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function CampaignCategories() {
  return (
    <section className="bg-[#f6f1e7d2] py-20 px-6">
      <div className="mx-auto max-w-5xl text-center">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-orange-700">
          Explore campaigns
        </p>
        <h2 className="mb-4 text-3xl font-semibold text-primary md:text-4xl">
          Fund the cause you care about
        </h2>
        <p className="mx-auto mb-12 max-w-lg text-text">
          Discover active campaigns across categories and help bring real
          change to communities that need it most.
        </p>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4"
        >
          {categories.map((c) => {
            const Icon = c.icon;
            return (
                <Link 
                key={c.title}
                href={`/campaigns?category=${c.title}`}>
              <motion.div
                variants={item}
                whileHover={{ y: -6 }}
                className="group overflow-hidden h-full rounded-2xl bg-white pb-7 shadow-[0_8px_20px_-14px_rgba(20,48,31,0.25)] transition-shadow hover:shadow-[0_18px_30px_-18px_rgba(20,48,31,0.35)]"
              >
                <div className="relative h-40 w-full overflow-hidden">
                  <Image
                    src={c.image}
                    alt={c.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                <div className="relative -mt-7 flex justify-center">
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-full border-4 border-white shadow-md ${c.accent}`}
                  >
                    <Icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                </div>

                <h3 className="mt-4 px-5 text-base font-semibold text-primary">
                  {c.title}
                </h3>
                <p className="mt-2 px-5 text-sm leading-relaxed text-muted">
                  {c.description}
                </p>
              </motion.div>
              </Link>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}