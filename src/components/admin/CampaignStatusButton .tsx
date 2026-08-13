// components/CampaignStatusButton.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import updateStatus from "@/app/lib/service/updateStatus";
import toast from "react-hot-toast";

type Props = {
  campaignId: string;
  initialStatus: string;
};

const CampaignStatusButton = ({ campaignId, initialStatus }: Props) => {
  const [status, setStatus] = useState(initialStatus);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const isActive = status === "active";

  const handleToggleStatus = async () => {
    const newStatus = isActive ? "pending" : "active";
   setLoading(true)
    try {
  const res =   await updateStatus(campaignId,newStatus)
if(res.data.modifiedCount >0){
toast.success("Campaign activated successfully!");
setStatus(newStatus);
      router.refresh(); 
}
     
    } catch (error) {
      console.error(error);
      toast.error("Failed to activate campaign. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleToggleStatus}
      disabled={loading}
      className={`w-full md:w-auto px-8 py-3 text-white font-semibold rounded-lg transition ${
        isActive
          ? "bg-red-600  hover:bg-red-800 cursor-pointer"
          : "bg-blue-600  hover:bg-blue-800 cursor-pointer"
      } ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
    >
      {loading
        ? "Updating..."
        : isActive
        ? "Deactivate Campaign"
        : "Activate Campaign"}
    </button>
  );
};

export default CampaignStatusButton;