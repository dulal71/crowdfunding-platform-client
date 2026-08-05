import { redirect } from "next/navigation";
import { getSessionUser } from "@/app/lib/auth-server";

type RoleGuardProps = {
  allowedRoles: string[];
  children: React.ReactNode;
};

export async function RoleGuard({ allowedRoles, children }: RoleGuardProps) {
  const user = await getSessionUser();

  if (!user?.role || !allowedRoles.includes(user.role)) {
    redirect("/");
  }

  return <>{children}</>;
}
