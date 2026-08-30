import CampaignCategories from "@/components/layout/CampaignCategories";
import StatsSection from "@/components/layout/StateSection";


const HomePage = () => {
    return (
        <div className="space-y-24 mb-24">
          <CampaignCategories></CampaignCategories>
          <StatsSection></StatsSection>  
        </div>
    );
};

export default HomePage;