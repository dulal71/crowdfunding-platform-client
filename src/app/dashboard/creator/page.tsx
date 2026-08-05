import { CreatorDashboard } from "@/components/creator/creatorDashboard";
import { getSessionUser } from "@/app/lib/auth-server";

export default async function CreatorHomePage() {
  const user = await getSessionUser();

  return <CreatorDashboard user={user ?? undefined} />;
}
