import { getSessionUser } from "@/app/lib/auth-server";


const AdminLayout = () => {
    const user =  getSessionUser()
    console.log(user);
    return (
        <div>
            
        </div>
    );
};

export default AdminLayout;