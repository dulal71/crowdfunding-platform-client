import { postData } from "../action/postData";


const createDonation =async (data:object) => {
    console.log(data);
const res = await postData('/api/donations',data)
return res;
};

export default createDonation;