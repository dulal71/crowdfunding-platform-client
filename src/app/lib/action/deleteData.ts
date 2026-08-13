'use server'
const baseUrl = process.env.SERVER_URL;
export const deleteData =async(path:string)=>{
const res = await fetch(`${baseUrl}${path}`,{
  method:'DELETE'
});

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Something went wrong");
  }

  return result;
}