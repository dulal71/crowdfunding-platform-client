"use server";

const baseUrl = process.env.SERVER_URL;

export const getData = async (path: string) => {
  const res = await fetch(`${baseUrl}${path}`);

  const result = await res.json();

  console.log(result);

  if (!res.ok) {
    throw new Error(result.message || "Something went wrong");
  }

  return result;
};