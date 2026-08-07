'use server'

import { ICampaign } from "@/types/campaign"
import { postData } from "../action/postData"

export const addCampaign=async(data:ICampaign)=>{
    return postData('/campaigns',data)
}