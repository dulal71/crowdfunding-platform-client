
import { CampaignResponse } from "@/types/campaign";
import { getData } from "../action/getData";


const getAllCampaign =async (status="" ): Promise<CampaignResponse> => {
 const result=  await getData(`/campaigns?status=${status}`)
 return result
};

export default getAllCampaign;