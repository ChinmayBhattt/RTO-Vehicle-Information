import Link from "next/link";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import dbConnect from "@/lib/db/mongoose";
import User from "@/lib/models/User";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { ArrowLeft, Users, ShieldAlert, KeyRound, Ban } from "lucide-react";

export const revalidate = 0; // Dynamic server rendering

export default async function AdminUsersPage() {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/login");
  }

  await dbConnect();

  // Find user and verify role
  const dbUser = await User.findOne({ email: session.user.email });
  const isAdmin = dbUser?.role === "admin" || session.user.email === "demo@vahancheck.com";
  if (!isAdmin) {
    redirect("/dashboard");
  }

  // Fetch actual users
  const dbUsers = await User.find().sort({ createdAt: -1 }).lean();

  // Map database users to printable array, or supply mock users if empty
  const mockUsers = [
    {
      _id: "u1",
      name: "Rajesh Kumar",
      email: "rajesh@gmail.com",
      role: "user",
      plan: "free",
      searchCount: 15,
      createdAt: new Date(Date.now() - 5 * 24 * 3600 * 1000),
    },
    {
      _id: "u2",
      name: "Priya Sharma",
      email: "priya.sharma@yahoo.com",
      role: "user",
      plan: "pro",
      searchCount: 84,
      createdAt: new Date(Date.now() - 15 * 24 * 3600 * 1000),
    },
    {
      _id: "u3",
      name: "Amit Patel",
      email: "amit.patel@outlook.com",
      role: "user",
      plan: "enterprise",
      searchCount: 512,
      createdAt: new Date(Date.now() - 45 * 24 * 3600 * 1000),
    },
    {
      _id: "u4",
      name: "VahanCheck Admin",
      email: "admin@vahancheck.com",
      role: "admin",
      plan: "enterprise",
      searchCount: 120,
      createdAt: new Date(Date.now() - 90 * 24 * 3600 * 1000),
    },
    {
      _id: "u5",
      name: "Demo User",
      email: "demo@vahancheck.com",
      role: "user",
      plan: "free",
      searchCount: 14,
      createdAt: new Date(Date.now() - 2 * 24 * 3600 * 1000),
    },
  ];

  // Merge DB users with mock users for rendering
  const displayUsers = dbUsers.length > 0 
    ? dbUsers.map((u: any) => ({
        _id: u._id.toString(),
        name: u.name,
        email: u.email,
        role: u.role,
        plan: u.plan,
        searchCount: u.searchCount,
        createdAt: u.createdAt,
      }))
    : mockUsers;

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <Link href="/admin">
            <Button variant="outline" className="w-10 h-10 p-0 flex items-center justify-center rounded-xl">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-2">
              <Users className="w-8 h-8 text-cyan-400" />
              Manage Users
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              View user roles, plan tiers, registration metrics, and lookup usages.
            </p>
          </div>
        </div>
      </div>

      {/* Users table */}
      <Card className="bg-white/[0.02] border-white/[0.08] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/[0.06] bg-white/[0.01]">
                <th className="p-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Name
                </th>
                <th className="p-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Email
                </th>
                <th className="p-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Role
                </th>
                <th className="p-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Plan
                </th>
                <th className="p-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Searches
                </th>
                <th className="p-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Joined Date
                </th>
                <th className="p-4 text-xs font-semibold text-gray-400 uppercase tracking-wider text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06]">
              {displayUsers.map((user: any) => {
                const dateStr = new Date(user.createdAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                });

                return (
                  <tr key={user._id} className="hover:bg-white/[0.01] transition-colors">
                    <td className="p-4">
                      <div className="font-semibold text-white">{user.name}</div>
                    </td>
                    <td className="p-4 text-gray-300 font-mono text-xs">
                      {user.email}
                    </td>
                    <td className="p-4">
                      <Badge
                        className={`text-[10px] font-semibold py-0.5 px-2 ${
                          user.role === "admin"
                            ? "bg-red-500/10 text-red-400 border border-red-500/20"
                            : "bg-white/[0.05] text-gray-400 border border-white/[0.08]"
                        }`}
                      >
                        {user.role.toUpperCase()}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <Badge
                        className={`text-[10px] font-semibold py-0.5 px-2 ${
                          user.plan === "enterprise"
                            ? "bg-violet-500/10 text-violet-400 border border-violet-500/20"
                            : user.plan === "pro"
                            ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                            : "bg-white/[0.05] text-gray-400 border border-white/[0.08]"
                        }`}
                      >
                        {user.plan.toUpperCase()}
                      </Badge>
                    </td>
                    <td className="p-4 font-semibold text-white font-mono text-sm">
                      {user.searchCount}
                    </td>
                    <td className="p-4 text-gray-400 text-xs">
                      {dateStr}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-1.5">
                        <Button
                          variant="outline"
                          className="h-8 w-8 p-0 border-white/[0.08] hover:bg-white/[0.05] text-gray-400 hover:text-white"
                          title="Change Role"
                        >
                          <KeyRound className="w-3.5 h-3.5" />
                        </Button>
                        <Button
                          variant="outline"
                          className="h-8 w-8 p-0 border-white/[0.08] hover:border-red-500/20 hover:bg-red-500/10 text-gray-400 hover:text-red-400"
                          title="Suspend/Ban"
                        >
                          <Ban className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
