import { getSessionUser } from "@/app/lib/auth-server";
import { AddCampaignForm } from "@/components/creator/AddCampaignForm";

export default async function NewCampaignsPage() {
  const user = await getSessionUser()
  return (
    <div>
      <AddCampaignForm  user={user}/>
    </div>
  );
}
