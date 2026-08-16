'use server'

import { getData } from "../action/getData"


export const getAllUser=async()=>{
 const   res = await getData('/api/users')
 return res;
}