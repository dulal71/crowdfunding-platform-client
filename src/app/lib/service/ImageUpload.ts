'use server'


const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

interface ImgBBResponse {
  data: {
    id: string;
    title: string;
    url: string;
    display_url: string;
    delete_url: string;
  };
  success: boolean;
  status: number;
}

async function uploadToImgBB(file: File): Promise<string> {
  if (!IMGBB_API_KEY) {
    throw new Error("Missing ImgBB API key. Set NEXT_PUBLIC_IMGBB_API_KEY in your .env.");
  }

  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch(
    `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
    {
      method: "POST",
      body: formData,
    }
  );

  const result: ImgBBResponse = await res.json();

  if (!res.ok || !result.success) {
    throw new Error("Upload failed. Please try again.");
  }

  return result.data.url;
}

export default uploadToImgBB;