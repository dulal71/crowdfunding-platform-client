'use server'

import { getData } from "../action/getData";

const getDonationById =async (donationId:string) => {
   return  await getData(`/api/donations/${donationId}`) 
};

export default getDonationById;

