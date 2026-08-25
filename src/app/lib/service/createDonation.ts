'use server'
import { revalidatePath } from "next/cache";
import { postData } from "../action/postData";
import updateData from "../action/updateData";


const createDonation =async (data:object) => {
    console.log(data);
const res = await postData('/api/donations',data)
return res;
};

export default createDonation;



export const updateDonationStatus=async(id:string,data:object)=>{
  const res = await updateData(`/api/donations/${id}`,data)
 if (res.data?.modifiedCount > 0) {
     revalidatePath(`/dashboard/creator/notification/${id}`);
   }
  return res;
}