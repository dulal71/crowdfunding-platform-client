'use server'
import { revalidatePath } from "next/cache";
import { deleteData } from "../action/deleteData";


const deleteNotification =async (id:string) => {
     const res = await deleteData(`/api/notifications/${id}`)
 if (res.data?.deletedCount > 0) {
    revalidatePath("/dashboard/admin");
  }
     return res
    };

export default deleteNotification;