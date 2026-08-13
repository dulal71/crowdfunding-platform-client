'use server'

import updateData from "../action/updateData";

const updateStatus =async (campaignId:string,status:string) => {
return await updateData(`/api/v1/campaigns/${campaignId}`,{status})  
};

export default updateStatus;