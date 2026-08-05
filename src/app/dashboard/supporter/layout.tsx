import { redirect } from "next/navigation";
import { getSessionUser } from "@/app/lib/auth-server";

const SupporterLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getSessionUser();

  if (!user) {
    redirect("/login");
  }

  if (user.role !== "supporter") {
    redirect("/unauthorized");
  }

  return <div>{children}</div>;
};

export default SupporterLayout;
