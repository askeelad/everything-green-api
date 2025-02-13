import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import DashboardContent from "@//app/components/DashboardContent";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  // Get session on the server-side
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  // Fetch users using cache tags
  const users = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/users`, {
    next: { tags: ["users-data"] }, // ✅ Correct way to enable cache revalidation
  }).then((res) => res.json());

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <DashboardContent session={session} users={users} />
    </div>
  );
}
