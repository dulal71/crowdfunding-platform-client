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
import Link from "next/link";
import ContributeButton from "../supporter/ContributeButton";

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
  funded_amount,
  minimum_Contribution,
  deadline,
  reward_info,
  campaign_image_url,
  status,
  } = campaign;

  const raised = funded_amount  ?? 0;
  const goal = funding_goal ?? 0;

  const pct = useMemo(()=>{
if (goal <= 0) return 0;
return  Math.min(100, Math.round((raised / goal) * 100))
  },[raised, goal])
     
  
  const remainingDays = daysLeft(deadline);


  return (
    <div className="w-full max-w-sm mx-auto bg-white rounded-[22px] overflow-hidden shadow-lg shadow-primary-light/20 ">
      {/* Hero image */}
      <div className="relative">
  <Image
    src={campaign_image_url}
    alt={campaign_title}
    width={500}
    height={300}
    className="w-full h-64 object-cover rounded-xl"
  />

  {category && (
    <span className="absolute top-3.5 left-3.5 bg-white/95 text-accent text-[11px] font-bold uppercase tracking-wide px-3 py-1.5 rounded-full shadow">
      {category}
    </span>
  )}


</div>

      {/* Body */}
      <div className="px-5 pt-4 pb-5">
        {campaign_title && (
          <h3 className="font-serif text-xl font-semibold leading-snug text-primary mb-2">
            {campaign_title}
          </h3>
        )}

        {campaign_story && (
          <>
            <p className={`text-sm text-text leading-relaxed ${expanded ? "" : "line-clamp-2"}`}>
              {campaign_story}
            </p>
            <button
              type="button"
              onClick={() => setExpanded((e) => !e)}
              className="text-primary-light text-xs font-semibold py-1.5 hover:text-cyan-700"
            >
              {expanded ? "Show less" : "Read more"}
            </button>
          </>
        )}

        {/* Meta row */}
        {(deadline || minimum_Contribution != null) && (
          <div className="flex flex-wrap gap-4 mb-3.5">
            {deadline && (
              <div className="flex items-center gap-1.5 text-xs text-text">
                <CgLock size={15} className="text-accent" />
                {remainingDays !== null && remainingDays > 0
                  ? `${remainingDays} days left`
                  : "Deadline passed"}
              </div>
            )}
            {minimum_Contribution != null && (
              <div className="flex items-center gap-1.5 text-xs text-text">
                <BiCoinStack size={15} className="text-accent" />
                Min. <strong className="text-primary-light">{formatMoney(minimum_Contribution)}</strong> credits
              </div>
            )}
          </div>
        )}

        {reward_info && (
          <div className="bg-info/10 rounded-xl px-3 py-2.5 text-xs text-text-muted leading-relaxed mb-4">
             {reward_info}
          </div>
        )}

        {/* Social + Donate */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-2.5">
            {[FaFacebook, BsTwitter, FiMessageCircle].map((Icon, i) => (
              <span
                key={i}
                className="w-[34px] h-[34px] rounded-full bg-white border border-primary flex items-center justify-center cursor-pointer hover:bg-slate-50"
              >
                <Icon size={15} className="text-accent" />
              </span>
            ))}
          </div>
          <div className="flex items-center gap-1">
            <Link href={`/campaigns/${campaign._id}`}
            
            className="border-[1.5px] border-info text-info font-bold text-xs px-[18px] py-2 rounded-full hover:bg-blue-900 hover:text-white transition-colors"
          >
            Details
          </Link>
          <ContributeButton minimumAmount={minimum_Contribution}></ContributeButton>
          </div>
        </div>

        {/* Progress */}
        {funding_goal != null && (
          <div className="bg-info/10 rounded-2xl px-3.5 py-3">
            <div className="flex justify-between text-sm text-text mb-2">
              <span>
                Raised <strong className="text-primary-light">${formatMoney(raised)}</strong>
              </span>
              <span>
                Goal: <strong className="text-primary-light">${formatMoney(funding_goal)}</strong>
              </span>
            </div>
            <div className="h-2.5 w-full bg-white rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full  transition-all duration-500 
                  ${
      pct >= 100
        ? "bg-red-500"
        : "bg-primary-light"
    }
                  `}
                style={{ width: `${pct}%` }}
              />
            </div>
            <div className="text-[11.5px] text-primary-light font-semibold mt-1.5">{pct}% funded</div>
          </div>
        )}
      </div>
    </div>
  );
}