import { getAllUser } from "@/app/lib/service/getAllUser";
import UserManagementToolbar from "@/components/admin/UserManagementToolbar";
import UserTable from "@/components/admin/UserTable";

export default async function ManageUsersPage() {
  
  const {data}=await getAllUser()
  const  users = data?.users
  const total = data?.total ||0
  
  return (
    <section className="space-y-5">
    <div className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-600">Admin</p>
      <h1 className="mt-3 text-2xl font-semibold text-zinc-900">Manage Users</h1>
      <p className="mt-3 text-zinc-600">Review accounts, update roles, and monitor platform access from this section.</p>
      
    </div>
    <UserManagementToolbar></UserManagementToolbar>
    <UserTable users={users}></UserTable>
    </section>
  );
}