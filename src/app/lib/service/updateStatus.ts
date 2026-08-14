'use server'

import { revalidatePath } from "next/cache";
import updateData from "../action/updateData";

const updateStatus =async (campaignId:string,status:string) => {
const res = await updateData(`/api/v1/campaigns/${campaignId}`,{status}) 
if(res.data.modifiedCount >0){
revalidatePath('/dashboard/admin/campaigns')   
}
return res
};

export default updateStatus;