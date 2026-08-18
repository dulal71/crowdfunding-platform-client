
import { CampaignByIdResponse, CampaignResponse } from "@/types/campaign";
import { getData } from "../action/getData";


const getAllCampaign =async (status="" ): Promise<CampaignResponse> => {
 const result=  await getData(`/api/v1/campaigns?status=${status}`)
 return result
};
export default getAllCampaign;


export const getCampaignById=async(campaignId:string): Promise<CampaignByIdResponse>=>{
const result = await getData(`/api/v1/campaigns/${campaignId}`)
return result
}

