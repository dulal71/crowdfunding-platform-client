"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import { FaHandsHelping, FaUsers, FaDove } from "react-icons/fa";

const stats = [
  { Icon: FaHandsHelping, value: 1250, suffix: "+", label: "Lives Impacted" },
  { Icon: FaUsers, value: 820, suffix: "+", label: "Volunteers" },
  { Icon: FaDove, value: 350, suffix: "+", label: "Projects Done" },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(0, value, {
      duration: 2,
      ease: "easeOut",
      onUpdate: (latest) => setCount(Math.floor(latest)),
    });

    return () => controls.stop();
  }, [isInView, value]);

  return (
    <span ref={ref} className="text-2xl font-bold text-white">
      {count}
      {suffix}
    </span>
  );
}

export default function StatsSection() {
  return (
    <div className=" max-w-6xl mx-auto rounded-3xl bg-primary p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8">
      {/* Left content */}
      <div className="max-w-md">
        <p className="text-orange-400 text-sm font-medium mb-2">
          • Together, We Can
        </p>
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
          Your Support Creates Real Change
        </h2>
        <p className="text-slate-300 text-sm mb-5">
          Together, we can bring hope, improve lives, and build a brighter
          future for everyone in need.
        </p>
        <button className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-primary hover:bg-primary-light hover:text-white transition-colors">
          Get Involved
        </button>
      </div>

      {/* Stats */}
      <div className="flex gap-8">
        {stats.map(({ Icon, value, suffix, label }) => (
          <div key={label} className="flex flex-col items-center text-center">
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:text-white">
              <Icon className="h-5 w-5 text-white hover:text-accent" />
            </div>
            <Counter value={value} suffix={suffix} />
            <p className="text-xs text-slate-300 mt-1">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}