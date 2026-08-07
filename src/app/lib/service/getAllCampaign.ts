
import { CampaignResponse } from "@/types/campaign";
import { getData } from "../action/getData";


const getAllCampaign =async (): Promise<CampaignResponse> => {
 const result=  await getData('/campaigns')
 return result
};

export default getAllCampaign;