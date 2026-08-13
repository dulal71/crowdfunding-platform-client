'use server'
const baseUrl=process.env.SERVER_URL
const updateData =async (path:string,data:object) => {

 const res=await fetch(`${baseUrl}${path}`,{
 method:'PATCH'   ,
 headers:{
   'Content-Type':'application/json', 
 },
 body:JSON.stringify(data)
})
const result = await res.json()
 if (!res.ok) {
    throw new Error(result.message || "Something went wrong");
  }

  return result;   
};

export default updateData;