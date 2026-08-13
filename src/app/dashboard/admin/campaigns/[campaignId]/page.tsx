import Image from "next/image";
import { getCampaignById } from "@/app/lib/service/getAllCampaign";
import CampaignStatusButton from "@/components/admin/CampaignStatusButton ";

type Props = {
  params: Promise<{
    campaignId: string;
  }>;
};

const CampaignDetailsPage = async ({ params }: Props) => {
  const { campaignId } = await params;
  const { data: campaign } = await getCampaignById(campaignId);
     console.log(campaign);
  if (!campaign) {
    return (
      <div className="p-10">
        <h1 className="text-2xl font-bold text-red-600">
          Campaign not found
        </h1>
      </div>
    );
  }

  const {
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
    <div className="max-w-4xl mx-auto p-6 md:p-10">
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

      {/* Header */}
      <div className="flex flex-wrap items-center gap-3 mb-2">
        <span className="text-xs font-medium px-3 py-1 rounded-full bg-blue-100 text-blue-700">
          {category}
        </span>
        <span
          className={`text-xs font-medium px-3 py-1 rounded-full ${
            status === "pending"
              ? "bg-yellow-100 text-yellow-700"
              : status === "approved"
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          {status}
        </span>
      </div>

      <h1 className="text-3xl text-black md:text-4xl font-bold mb-2">
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
            className="h-full bg-blue-600 rounded-full transition-all"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <div className="flex justify-between mt-2 text-sm text-gray-600">
          <span>
            <span className="font-semibold text-gray-900">
              ${funded_amount.toLocaleString()}
            </span>{" "}
            raised of ${funding_goal.toLocaleString()}
          </span>
          <span>{progressPercent}% funded</span>
        </div>

        <div className="flex justify-between mt-1 text-sm text-gray-600">
          <span>Minimum contribution: ${minimum_Contribution}</span>
          <span>{daysLeft} days left</span>
        </div>
      </div>

      {/* Story */}
      <section className="mb-8">
        <h2 className="text-xl text-black font-semibold mb-2">Campaign Story</h2>
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
          {campaign_story}
        </p>
      </section>

      {/* Reward */}
      {reward_info && (
        <section className="mb-8 bg-gray-50 border border-gray-200 rounded-lg p-4">
          <h2 className="text-lg text-black font-semibold mb-1">Reward</h2>
          <p className="text-gray-700">{reward_info}</p>
        </section>
      )}

      {/* CTA */}
     <CampaignStatusButton campaignId={campaign._id} initialStatus={campaign.status}></CampaignStatusButton>
    </div>
  );
};

export default CampaignDetailsPage;