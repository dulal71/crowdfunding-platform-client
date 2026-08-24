
import getAllCampaign, { getCampaignById } from '@/app/lib/service/getAllCampaign';
import getDonationById from '@/app/lib/service/getDonation';

import DonationDetailsCard from '@/components/creator/DonationDetailsCard';


type Props = {
  params: Promise<{
    id: string;
  }>;
};
const NotificationDetails = async({params}:Props) => {

   
     const { id } = await params;
  
      const {data:donation}=await getDonationById(id)
        const {data:campaign} = await getCampaignById(donation.campaignId);
      
    return (
        <div className='mx-auto'>
          <div>

          </div>
          <div>
            <DonationDetailsCard campaign={campaign} donation={donation}></DonationDetailsCard>
          </div>
            
        </div>
    );
};

export default NotificationDetails;