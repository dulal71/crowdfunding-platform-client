
import { CampaignByIdResponse, CampaignResponse } from "@/types/campaign";
import { getData } from "../action/getData";


const getAllCampaign =async (status="",category="", excludeId="" ): Promise<CampaignResponse> => {
 const result=  await getData(`/api/v1/campaigns?status=${status}&category=${category}&excludeId=${excludeId}`)
 return result
};
export default getAllCampaign;


export const getCampaignById=async(campaignId:string): Promise<CampaignByIdResponse>=>{
const result = await getData(`/api/v1/campaigns/${campaignId}`)
return result
}

