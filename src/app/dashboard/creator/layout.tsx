import { getSessionUser } from "@/app/lib/auth-server";
import { redirect } from "next/navigation";



const CreatorLayout = async ({ children }: { children: React.ReactNode }) => {
    const user = await getSessionUser();
    
      if (!user) {
        redirect("/login");
      }
    
      if (user.role !== "creator") {
        redirect("/unauthorized");
      }
    
      return <div>{children}</div>;
};

export default CreatorLayout;