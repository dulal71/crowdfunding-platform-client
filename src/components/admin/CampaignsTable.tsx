"use client";


import { ICampaign } from "@/types/campaign";
import Link from "next/link";
import updateStatus from "@/app/lib/service/updateStatus";
import toast from "react-hot-toast";


interface CampaignsTableProps {
  campaigns: ICampaign[];
}

// Truncate title to max 3 words
const truncateTitle = (title: string, wordLimit = 3) => {
  const words = title.trim().split(/\s+/);
  if (words.length <= wordLimit) return title;
  return `${words.slice(0, wordLimit).join(" ")}...`;
};

const statusBadgeStyles: Record<string, string> = {
  pending: "bg-amber-50 text-amber-700 border-amber-200",
  active: "bg-green-50 text-green-700 border-green-200",
  completed: "bg-sky-50 text-sky-700 border-sky-200",
};

const CampaignsTable = ({ campaigns }: CampaignsTableProps) => {

   

  const handleStatus = async (id: string,status:string) => {
   
    try {
      const res =   await updateStatus(id,status)
if(res.data.modifiedCount >0){
toast.success(
        status === "active"
          ? "Campaign activated successfully!"
          : "Campaign deactivated successfully!"
      );  
}
    } catch (error) {
      console.error(error);
      toast.error("Failed to activate campaign. Please try again.");
    } 
  };

  if (!campaigns || campaigns.length === 0) {
    return (
      <div className="rounded-xl border border-gray-100 bg-white p-8 text-center text-sm text-gray-500 shadow-sm">
        No campaigns found.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] divide-y divide-gray-100 text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                Campaign
              </th>
              <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wide text-gray-500">
                Category
              </th>
              <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wide text-gray-500">
                Goal
              </th>
              <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wide text-gray-500">
                Funded
              </th>
              <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wide text-gray-500">
                Deadline
              </th>
              <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wide text-gray-500">
                Status
              </th>
              <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wide text-gray-500">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {campaigns.map((campaign) => (
              <tr
                key={campaign._id}
                className="transition-colors hover:bg-sky-50/40"
              >
                <td className="px-4 py-3">
                  <span
                    title={campaign.campaign_title}
                    className="font-medium text-gray-900 cursor-default"
                  >
                    {truncateTitle(campaign.campaign_title)}
                  </span>
                </td>

                <td className="px-4 py-3 text-center text-gray-700">
                  {campaign.category}
                </td>

                <td className="px-4 py-3 text-center text-gray-700">
                  ${campaign.funding_goal.toLocaleString()}
                </td>

                <td className="px-4 py-3 text-center text-gray-700">
                  ${campaign.funded_amount.toLocaleString()}
                </td>

                <td className="px-4 py-3 text-center text-gray-700">
                  {new Date(campaign.deadline).toLocaleDateString()}
                </td>

                {/* Status column — always shows correct badge */}
                <td className="px-4 py-3">
                  <div className="flex justify-center">
                    <span
                      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize ${
                        statusBadgeStyles[campaign.status] ??
                        "bg-gray-50 text-gray-700 border-gray-200"
                      }`}
                    >
                      {campaign.status}
                    </span>
                  </div>
                </td>

                {/* Action column — Activate button only for pending, View always */}
                <td className="px-4 py-3">
                  <div className="flex items-center justify-center gap-2">
                    {campaign.status === "pending" ? 
                    (
                      <button
                        onClick={() => handleStatus(campaign._id,"active")}

                        className="rounded-md bg-cyan-600 px-3 py-1 text-xs font-medium text-white transition-colors hover:bg-cyan-700 disabled:opacity-60"
                      >
                      Activate
                      </button>
                    ) :  (
                      <button
                        onClick={() => handleStatus(campaign._id,"pending")}

                        className="rounded-md bg-red-700 px-3 py-1 text-xs font-medium text-white transition-colors hover:bg-red-900 disabled:opacity-60"
                      >
                     Deactivate
                      </button>
                    )
                  }
                   
                    <Link href={`/dashboard/admin/campaigns/${campaign._id}`} className="text-xs font-medium text-cyan-600 hover:text-cyan-700">
                      View
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CampaignsTable;