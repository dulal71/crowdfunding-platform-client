"use client";

import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

interface Stat {
  label: string;
  value: number | string;
}

interface StatCardProps {
  title: string;
  subtitle: string;
  stats: Stat[];
}

export default function StatCard({ title, subtitle, stats }: StatCardProps) {
  return (
    <div className="space-y-6 bg-linear-to-t from-sky-50 to-white shadow p-6 rounded-2xl">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <h1 className="text-2xl font-bold text-cyan-600">{title}</h1>
        <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
      </motion.div>

      {/* Stats grid */}
      <motion.div
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {stats.map((stat) => (
          <motion.div
            key={stat.label}
            variants={itemVariants}
            whileHover={{ y: -4, boxShadow: "0 8px 20px rgba(0,0,0,0.08)" }}
            className="rounded-xl bg-white p-5 shadow-sm"
          >
            <p className="text-sm text-gray-500">{stat.label}</p>
            <h2 className="mt-2 text-2xl font-bold text-gray-900">{stat.value}</h2>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}