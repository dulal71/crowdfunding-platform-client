import { headers } from "next/headers";
import { auth } from "@/app/lib/auth";

export type DashboardUser = {
  id?: string;
  name?: string;
  email?: string;
  role?: string;
  credits?: number;
};

export async function getSessionUser(): Promise<DashboardUser | null> {
  const session = await auth.api.getSession({ headers: await headers() });
  return (session?.user as DashboardUser | undefined) ?? null;
}
