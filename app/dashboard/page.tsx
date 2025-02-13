import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import DashboardContent from "../components/DashboardContent";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  // Get session on the server-side
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  // Fetch users using cache tags
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/users`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "same-origin", // This ensures cookies are sent
  });

  const users = await res.json();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <DashboardContent session={session} users={users} />
    </div>
  );
}
