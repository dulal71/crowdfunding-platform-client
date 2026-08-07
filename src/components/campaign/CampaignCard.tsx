'use client'
import { useState, useMemo } from "react";

import { ICampaign } from "@/types/campaign";
import Image from "next/image";
import { FaDropletSlash, FaFacebook } from "react-icons/fa6";
import { CgLock } from "react-icons/cg";
import { BiCoinStack } from "react-icons/bi";
import { FiMessageCircle } from "react-icons/fi";

import { IconBase } from "react-icons";
import { BsTwitter } from "react-icons/bs";

type CampaignStatus = "pending" | "active" | "closed" | string;



interface CampaignCardProps {
  campaign: ICampaign;
}

const STATUS_STYLES: Record<string, string> = {
  pending: "bg-amber-100 text-amber-800",
  active: "bg-emerald-100 text-emerald-700",
  closed: "bg-slate-200 text-slate-600",
};

function formatMoney(n?: number): string {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(n ?? 0);
}

function daysLeft(deadline?: string): number | null {
  if (!deadline) return null;
  const diff = new Date(deadline).getTime() - Date.now();
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  return days > 0 ? days : 0;
}

export default function CampaignCard({ campaign }: CampaignCardProps) {
  const [expanded, setExpanded] = useState(false);

  const {
    campaign_title,
  campaign_story,
  category,
  funding_goal,
  minimum_Contribution,
  deadline,
  reward_info,
  campaign_image_url,
  status,
  } = campaign;

  const raised =  funding_goal ?? 0;
  const goal = funding_goal || 1;
  const pct = useMemo(
    () => Math.min(100, Math.round((raised / goal) * 100)),
    [raised, goal]
  );
  const remainingDays = daysLeft(deadline);
  const statusClass = status ? STATUS_STYLES[status] ?? STATUS_STYLES.pending : "";

  return (
    <div className="w-full max-w-sm mx-auto bg-linear-to-t from-sky-50 to-white rounded-[22px] overflow-hidden shadow-lg shadow-cyan-900/10 border border-cyan-100">
      {/* Hero image */}
      <div className="relative h-48 w-full">
        {campaign_image_url ? (
          <Image
          width={250}
          height={192}
            src={campaign_image_url}
            alt={campaign_title || "Campaign image"}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-cyan-900 via-cyan-700 to-sky-500">
            <FaDropletSlash size={56} className="text-white/80" strokeWidth={1.5} />
          </div>
        )}

        {category && (
          <span className="absolute top-3.5 left-3.5 bg-white/95 text-cyan-950 text-[11px] font-bold uppercase tracking-wide px-3 py-1.5 rounded-full shadow">
            {category}
          </span>
        )}

        {status && (
          <span className={`absolute top-3.5 right-3.5 text-[11px] font-bold px-3 py-1.5 rounded-full ${statusClass}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        )}

        {/* Wave divider */}
        <svg
          viewBox="0 0 400 24"
          preserveAspectRatio="none"
          className="absolute -bottom-px left-0 w-full h-6 text-sky-50"
        >
          <path
            d="M0,12 C50,24 100,0 150,10 C200,20 250,2 300,10 C350,18 380,6 400,12 L400,24 L0,24 Z"
            fill="currentColor"
          />
        </svg>
      </div>

      {/* Body */}
      <div className="px-5 pt-4 pb-5">
        {campaign_title && (
          <h3 className="font-serif text-xl font-semibold leading-snug text-cyan-950 mb-2">
            {campaign_title}
          </h3>
        )}

        {campaign_story && (
          <>
            <p className={`text-sm text-slate-600 leading-relaxed ${expanded ? "" : "line-clamp-2"}`}>
              {campaign_story}
            </p>
            <button
              type="button"
              onClick={() => setExpanded((e) => !e)}
              className="text-cyan-600 text-xs font-semibold py-1.5 hover:text-cyan-700"
            >
              {expanded ? "Show less" : "Read more"}
            </button>
          </>
        )}

        {/* Meta row */}
        {(deadline || minimum_Contribution != null) && (
          <div className="flex flex-wrap gap-4 mb-3.5">
            {deadline && (
              <div className="flex items-center gap-1.5 text-xs text-slate-600">
                <CgLock size={15} className="text-cyan-600" />
                {remainingDays !== null && remainingDays > 0
                  ? `${remainingDays} days left`
                  : "Deadline passed"}
              </div>
            )}
            {minimum_Contribution != null && (
              <div className="flex items-center gap-1.5 text-xs text-slate-600">
                <BiCoinStack size={15} className="text-cyan-600" />
                Min. {formatMoney(minimum_Contribution)} credits
              </div>
            )}
          </div>
        )}

        {reward_info && (
          <div className="bg-emerald-50 border border-emerald-100 rounded-xl px-3 py-2.5 text-xs text-emerald-800 leading-relaxed mb-4">
             {reward_info}
          </div>
        )}

        {/* Social + Donate */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-2.5">
            {[FaFacebook, BsTwitter, FiMessageCircle].map((Icon, i) => (
              <span
                key={i}
                className="w-[34px] h-[34px] rounded-full bg-white border border-slate-200 flex items-center justify-center cursor-pointer hover:bg-slate-50"
              >
                <IconBase size={15} className="text-cyan-950" />
              </span>
            ))}
          </div>

          <button
            type="button"
            className="border-[1.5px] border-rose-500 text-rose-500 font-bold text-xs px-[18px] py-2 rounded-full hover:bg-rose-500 hover:text-white transition-colors"
          >
            Donate Now
          </button>
        </div>

        {/* Progress */}
        {funding_goal != null && (
          <div className="bg-orange-50 rounded-2xl px-3.5 py-3">
            <div className="flex justify-between text-sm text-cyan-950 mb-2">
              <span>
                Raised <strong>${formatMoney(raised)}</strong>
              </span>
              <span>
                Goal: <strong>${formatMoney(funding_goal)}</strong>
              </span>
            </div>
            <div className="h-2.5 w-full bg-white rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-600 to-sky-400 transition-all duration-500"
                style={{ width: `${pct}%` }}
              />
            </div>
            <div className="text-[11.5px] text-slate-600 font-semibold mt-1.5">{pct}% funded</div>
          </div>
        )}
      </div>
    </div>
  );
}