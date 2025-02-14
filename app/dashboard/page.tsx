import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import DashboardContent from "../components/DashboardContent";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export default async function Dashboard() {
  // Get session on the server-side
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const headersData = await headers(); // Await headers() to get the actual headers object
  const headersObject = Object.fromEntries(headersData.entries()); // Convert to plain object

  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/users`, {
    method: "GET",
    headers: {
      ...headersObject,
      "Content-Type": "application/json",
    },
    credentials: "include", // Ensures cookies are sent
  });
  const users = await res.json();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <DashboardContent session={session} users={users} />
    </div>
  );
}
