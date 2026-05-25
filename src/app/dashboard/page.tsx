import { auth } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import dbConnect from "@/lib/db/mongoose";
import SearchHistory from "@/lib/models/SearchHistory";
import SavedVehicle from "@/lib/models/SavedVehicle";
import User from "@/lib/models/User";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import QuickSearchForm from "@/components/dashboard/QuickSearchForm";
import {
  Car,
  History,
  Bookmark,
  TrendingUp,
  Search,
  User as UserIcon,
  Zap,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

export const revalidate = 0; // Dynamic server rendering

export default async function DashboardPage() {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/login");
  }

  await dbConnect();

  // Find user in database
  let dbUser = await User.findOne({ email: session.user.email });

  // If not found in DB (e.g. demo session), create a temporary user or fetch details
  if (!dbUser) {
    dbUser = new User({
      name: session.user.name || "Demo User",
      email: session.user.email,
      role: "user",
      plan: "free",
      searchCount: 14, // realistic mock data
    });
  }

  const userId = dbUser._id;

  // Fetch stats from DB
  const historyCount = await SearchHistory.countDocuments({ userId });
  const savedCount = await SavedVehicle.countDocuments({ userId });
  const recentSearches = await SearchHistory.find({ userId })
    .sort({ searchedAt: -1 })
    .limit(5)
    .lean();

  // If DB is empty, let's create a few mock searches for the demo user
  const displayHistory = recentSearches.length > 0 
    ? recentSearches 
    : [
        {
          registrationNumber: "MH02AB1234",
          vehicleData: { vehicle: { model: "Creta", manufacturer: "Hyundai" } },
          searchedAt: new Date(Date.now() - 3600000),
        },
        {
          registrationNumber: "DL01CA4321",
          vehicleData: { vehicle: { model: "Swift", manufacturer: "Maruti Suzuki" } },
          searchedAt: new Date(Date.now() - 86400000),
        },
        {
          registrationNumber: "KA03MM8888",
          vehicleData: { vehicle: { model: "Nexon", manufacturer: "Tata Motors" } },
          searchedAt: new Date(Date.now() - 172800000),
        },
      ];

  const displayHistoryCount = historyCount || displayHistory.length;
  const displaySavedCount = savedCount || 2; // default mock

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Welcome banner */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-white/[0.04] to-white/[0.01] backdrop-blur-xl border border-white/[0.08] p-6 sm:p-8">
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-gradient-to-bl from-cyan-500/10 to-transparent blur-3xl pointer-events-none" />
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <span className="text-cyan-400 font-semibold text-sm uppercase tracking-wider">
              Workspace Overview
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold mt-1 text-white tracking-tight">
              Welcome back, {dbUser.name}!
            </h1>
            <p className="text-gray-400 mt-2 text-sm max-w-md">
              Retrieve comprehensive vehicle reports instantly. You have used {dbUser.searchCount} searches of your current plan.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 py-1.5 px-3 text-xs font-semibold">
              <Zap className="w-3.5 h-3.5 mr-1 inline" /> {dbUser.plan.toUpperCase()} PLAN
            </Badge>
            {dbUser.role === "admin" && (
              <Link href="/admin">
                <Button variant="outline" className="text-xs py-1.5 px-3">
                  Admin Panel
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Quick Search */}
      <Card className="p-6 bg-white/[0.02] border-white/[0.08]">
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Search className="w-5 h-5 text-cyan-400" />
          Quick Vehicle Lookup
        </h2>
        <QuickSearchForm />
      </Card>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Card className="p-6 bg-white/[0.02] border-white/[0.08] flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
            <Search className="w-6 h-6 text-cyan-400" />
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
              Total Searches
            </p>
            <h3 className="text-2xl font-bold text-white mt-1">
              {dbUser.searchCount}
            </h3>
          </div>
        </Card>

        <Card className="p-6 bg-white/[0.02] border-white/[0.08] flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
            <Bookmark className="w-6 h-6 text-violet-400" />
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
              Saved Vehicles
            </p>
            <h3 className="text-2xl font-bold text-white mt-1">
              {displaySavedCount}
            </h3>
          </div>
        </Card>

        <Card className="p-6 bg-white/[0.02] border-white/[0.08] flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6 text-emerald-400" />
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
              Account Status
            </p>
            <h3 className="text-2xl font-bold text-emerald-400 mt-1 flex items-center gap-1.5">
              Verified
            </h3>
          </div>
        </Card>
      </div>

      {/* Main Grid: Recent searches & Quick tips */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Searches */}
        <Card className="lg:col-span-2 p-6 bg-white/[0.02] border-white/[0.08] space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <History className="w-5 h-5 text-gray-400" />
              Recent Searches
            </h2>
            <Link
              href="/dashboard/history"
              className="text-xs text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1"
            >
              View All <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="divide-y divide-white/[0.06]">
            {displayHistory.map((item: any, i) => {
              const model = item.vehicleData?.vehicle?.model || "Unknown";
              const manufacturer = item.vehicleData?.vehicle?.manufacturer || "Vehicle";
              const num = item.registrationNumber;
              const dateStr = new Date(item.searchedAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              });

              return (
                <div key={i} className="py-4 flex justify-between items-center first:pt-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center">
                      <Car className="w-5 h-5 text-gray-400" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white font-mono tracking-wide">
                        {num}
                      </h4>
                      <p className="text-xs text-gray-500">
                        {manufacturer} {model}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-500 hidden sm:inline">{dateStr}</span>
                    <Link href={`/vehicle/${encodeURIComponent(num)}`}>
                      <Button variant="outline" className="text-xs py-1 h-8 px-3">
                        View Report
                      </Button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Info panel */}
        <Card className="p-6 bg-white/[0.02] border-white/[0.08] space-y-4">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-gray-400" />
            Pro Tip
          </h2>
          <div className="space-y-4 text-sm text-gray-400">
            <p>
              Looking to check vehicle insurance expiry, fitness details, or blacklist status? All records are fetched in real-time.
            </p>
            <div className="p-3 bg-white/[0.03] border border-white/[0.06] rounded-xl space-y-2">
              <span className="text-xs text-cyan-400 font-semibold block">
                Sample Registration Format:
              </span>
              <code className="text-xs font-mono text-white block bg-black/30 p-2 rounded">
                MH02AB1234
              </code>
              <span className="text-xs text-gray-500 block">
                State code (e.g. MH) + RTO code (e.g. 02) + Series + Number.
              </span>
            </div>
            <p className="text-xs">
              Need assistance? Head over to your profile settings or review our terms.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
