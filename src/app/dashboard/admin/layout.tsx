import { getSessionUser } from "@/app/lib/auth-server";
import { redirect } from "next/navigation";


const AdminLayout =async ({ children }: { children: React.ReactNode }) => {
   const user = await getSessionUser();
   
     if (!user) {
       redirect("/login");
     }
   
     if (user.role !== "admin") {
       redirect("/unauthorized");
     }
   
     return <div>{children}</div>;
};

export default AdminLayout;