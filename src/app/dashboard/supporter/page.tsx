import { SupporterDashboard } from "@/components/supporter/supporterDashboard";
import { getSessionUser } from "@/app/lib/auth-server";

export default async function SupporterHomePage() {
  const user = await getSessionUser();

  return <SupporterDashboard user={user ?? undefined} />;
}
