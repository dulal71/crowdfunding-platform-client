'use server'
import { revalidatePath } from "next/cache";

import updateData from "../action/updateData";


const readNotification =async (id:string,data:object) => {
     const res = await updateData(`/api/notifications/${id}`,data)
    console.log(res);
     if (res.data?.modifiedCount > 0) {
    revalidatePath("/dashboard");
  }
     return res
    };

export default readNotification ;