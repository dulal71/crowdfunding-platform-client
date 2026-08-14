
import { CampaignResponse } from "@/types/campaign";
import { getData } from "../action/getData";


const getAllCampaign =async (status="" ): Promise<CampaignResponse> => {
 const result=  await getData(`/api/v1/campaigns?status=${status}`)
 return result
};
export default getAllCampaign;


export const getCampaignById=async(userId:string)=>{
const result = await getData(`/api/v1/campaigns/${userId}`)
return result
}

