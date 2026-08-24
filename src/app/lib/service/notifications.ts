'use server'

import { getData } from "../action/getData"

export const getNotification=async(userId:string)=>{

return   await getData(`/api/notifications?userId=${userId}`) 
}

