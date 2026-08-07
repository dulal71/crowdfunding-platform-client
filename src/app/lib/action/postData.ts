'use server'

const baseUrl=process.env.SERVER_URL

export const postData = async(path:string,data:unknown)=>{
const res=await fetch(`${baseUrl}${path}`,{
 method:'POST'   ,
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
}