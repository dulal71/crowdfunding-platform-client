import getAllCampaign from "@/app/lib/service/getAllCampaign";
import CampaignsTable from "@/components/admin/CampaignsTable";
import StatCard from "@/components/admin/StatCard";


const ManageCampaigns =async () => {
      const {data} = await getAllCampaign();
      const {campaigns,total,active,pending,completed} = data;
      const stats = [
    { label: "Total Campaigns", value: total },
    { label: "Active Campaigns", value: active },
    { label: "Pending Campaigns", value: pending },
    { label: "Completed Campaigns", value: completed },
  ];
      return (
              <div className="space-y-6">
  {/* Page Header */}
   <StatCard
      title="Manage Campaigns"
      subtitle="View and manage all crowdfunding campaigns."
      stats={stats}
    />
    <div className="bg-linear-to-t from-sky-50 to-white p-3 md:p-6 shadow rounded-2xl">
       <CampaignsTable campaigns={campaigns}></CampaignsTable>
    </div>
   
</div>  
    
    );
};

export default ManageCampaigns;