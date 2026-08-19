import getAllCampaign, { getCampaignById } from "@/app/lib/service/getAllCampaign";

import Image from "next/image";

import ContributeButton from "@/components/supporter/ContributeButton";
import { FaArrowRightLong } from "react-icons/fa6";
import Link from "next/link";
import CampaignCard from "@/components/campaign/CampaignCard";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

const CampaignDetailsPage = async ({ params }: Props) => {
  const { id } = await params;
const {data:campaign} = await getCampaignById(id);
   const {
    _id,
    campaign_image_url,
    campaign_story,
    campaign_title,
    category,
    createdAt,
    deadline,
    funded_amount,
    funding_goal,
    minimum_Contribution,
    reward_info,
    status,
    user_name,
    user_email,
  } = campaign;  

 const {data} = await getAllCampaign("active",category,_id);
     
    const relatedCampaigns = data?.campaigns ?? [];

  if (!campaign) {
    return (
      <div className="p-10">
        <h1 className="text-2xl font-bold text-red-600">
          Campaign not found
        </h1>
      </div>
    );
  }

 

  const progressPercent = Math.min(
    100,
    Math.round((funded_amount / funding_goal) * 100)
  );

  const daysLeft = Math.max(
    0,
    Math.ceil(
      (new Date(deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
    )
  );

  return (
    <div className="max-w-7xl  mx-auto p-6 md:p-5 space-y-8">
       
       
       <div className="flex items-center justify-center ">
  <div className="flex items-center gap-2 text-sm">
    <Link href={'/'} className="font-medium text-text-muted hover:text-primary cursor-pointer transition-colors">
      Home
    </Link>

    <FaArrowRightLong className="text-primary-light text-xs" />

    <Link href={'/campaigns'} className="font-medium text-text-muted hover:text-primary cursor-pointer transition-colors">
      Explore Campaigns
    </Link>

    <FaArrowRightLong className="text-primary-light text-xs" />

    <span className="font-semibold text-primary">
      Details Page
    </span>
  </div>
</div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2  lg:gap-10">
         {/* Image */}
        <div className="relative w-full h-72 md:h-96 rounded-xl overflow-hidden mb-6">
        <Image
          src={campaign_image_url}
          alt={campaign_title}
          fill
          className="object-cover"
          priority
        />
      </div>
    <div>
         {/* Header */}
      <div className="flex flex-wrap items-center gap-3 mb-2">
        <span className="text-xs font-medium px-3 py-1 rounded-full bg-white text-primary border border-primary-light">
          {category}
        </span>
        <span
          className={`text-xs font-medium px-3 py-1 rounded-full ${
            status === "pending"
              ? "bg-yellow-100 text-yellow-700"
              : status === "active"
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          {status}
        </span>
      </div>

      <h1 className="text-3xl text-primary md:text-4xl font-bold mb-2">
        {campaign_title}
      </h1>

      <p className="text-sm text-gray-500 mb-6">
        Organized by <span className="font-medium">{user_name}</span> (
        {user_email}) &middot;{" "}
        {new Date(createdAt).toLocaleDateString(undefined, {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>

      {/* Progress */}
      <div className="mb-8">
        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <div className="flex justify-between mt-2 text-sm text-text">
          <span>
            <span className="font-semibold text-primary-light">
              ${funded_amount}
            </span>{" "}
            raised of <span className="text-primary-light">${funding_goal}</span>
          </span>
          <span><span className="text-primary-light"> {progressPercent}%</span> funded</span>
        </div>

        <div className="flex justify-between mt-1 text-sm text-text">
          <span>Minimum contribution: <span className="text-primary-light">${minimum_Contribution}</span></span>
          <span><span className="text-primary-light">{daysLeft}</span> days left</span>
        </div>
      </div>

      {/* Story */}
      <section className="mb-8">
        <h2 className="text-xl text-primary font-semibold mb-2">Campaign Story</h2>
        <p className="text-text-muted leading-relaxed whitespace-pre-line">
          {campaign_story}
        </p>
      </section>

      {/* Reward */}
      {reward_info && (
        <section className="mb-8 bg-gray-50 border border-primary-light rounded-lg p-4">
          <h2 className="text-lg text-primary font-semibold mb-1">Reward</h2>
          <p className="text-text-muted">{reward_info}</p>
        </section>
      )}

      
<ContributeButton minimumAmount={minimum_Contribution} />
    </div>
      </div>
    {relatedCampaigns.length > 0 && (
  <div>
    <h2 className="text-2xl text-center text-primary font-semibold mb-4">
      Related Campaigns
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {relatedCampaigns.map((campaign) => (
        <CampaignCard
          key={campaign._id}
          campaign={campaign}
        />
      ))}
    </div>
  </div>
)}
      
    </div>
  );
};

export default CampaignDetailsPage;