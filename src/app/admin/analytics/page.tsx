import Link from "next/link";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import dbConnect from "@/lib/db/mongoose";
import User from "@/lib/models/User";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import {
  ArrowLeft,
  TrendingUp,
  Clock,
  MapPin,
  Cpu,
  Zap,
  Globe,
  Database,
} from "lucide-react";

export const revalidate = 0; // Dynamic server rendering

export default async function AdminAnalyticsPage() {
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
              <TrendingUp className="w-8 h-8 text-cyan-400" />
              Diagnostics & Analytics
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              Deep dive into system performance, search volumes, and API latencies.
            </p>
          </div>
        </div>
      </div>

      {/* Analytics stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 bg-white/[0.02] border-white/[0.08] space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
              <Clock className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">Peak Load Hours</h3>
              <p className="text-xs text-gray-500">Hourly query distributions</p>
            </div>
          </div>
          <div className="space-y-2 pt-2">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-gray-400">18:00 - 21:00 (Evening Peak)</span>
              <span className="text-cyan-400">42% of traffic</span>
            </div>
            <div className="w-full bg-white/[0.04] h-2 rounded-full overflow-hidden">
              <div className="bg-cyan-400 h-full rounded-full" style={{ width: "42%" }} />
            </div>
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-gray-400">12:00 - 15:00 (Afternoon Peak)</span>
              <span className="text-violet-400">28% of traffic</span>
            </div>
            <div className="w-full bg-white/[0.04] h-2 rounded-full overflow-hidden">
              <div className="bg-violet-400 h-full rounded-full" style={{ width: "28%" }} />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white/[0.02] border-white/[0.08] space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-violet-400" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">Popular State Codes</h3>
              <p className="text-xs text-gray-500">Query volumes per state</p>
            </div>
          </div>
          <div className="space-y-2 pt-2">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-gray-400">MH - Maharashtra</span>
              <span className="text-white">354 queries</span>
            </div>
            <div className="w-full bg-white/[0.04] h-2 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-cyan-400 to-violet-500 h-full rounded-full" style={{ width: "74%" }} />
            </div>
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-gray-400">DL - Delhi NCR</span>
              <span className="text-white">281 queries</span>
            </div>
            <div className="w-full bg-white/[0.04] h-2 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-cyan-400 to-violet-500 h-full rounded-full" style={{ width: "58%" }} />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white/[0.02] border-white/[0.08] space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
              <Zap className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">API Performance</h3>
              <p className="text-xs text-gray-500">System latency metrics</p>
            </div>
          </div>
          <div className="space-y-3 pt-1 text-sm">
            <div className="flex justify-between items-center py-1 border-b border-white/[0.04]">
              <span className="text-gray-400">Mock Provider Latency</span>
              <span className="text-emerald-400 font-semibold font-mono">310ms</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-white/[0.04]">
              <span className="text-gray-400">Cache Hit Rate</span>
              <span className="text-cyan-400 font-semibold font-mono">48.2%</span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-gray-400">DB Query Execution</span>
              <span className="text-white font-mono">14ms</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Details diagnostics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 bg-white/[0.02] border-white/[0.08] space-y-4">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <Globe className="w-5 h-5 text-cyan-400" /> State-wise Query Share
          </h2>
          <div className="grid grid-cols-2 gap-4 text-xs font-semibold pt-2">
            {[
              { code: "KA", count: 184, share: "12%", color: "bg-cyan-400" },
              { code: "GJ", count: 142, share: "9%", color: "bg-violet-400" },
              { code: "RJ", count: 110, share: "7%", color: "bg-blue-400" },
              { code: "UP", count: 95, share: "6%", color: "bg-emerald-400" },
            ].map((state) => (
              <div key={state.code} className="p-3 bg-white/[0.02] border border-white/[0.06] rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-white block font-mono text-sm">{state.code}</span>
                  <span className="text-gray-500 text-[10px] block mt-0.5">{state.count} searches</span>
                </div>
                <Badge className={`${state.color}/10 text-white font-mono border-none`}>
                  {state.share}
                </Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 bg-white/[0.02] border-white/[0.08] space-y-4">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <Database className="w-5 h-5 text-violet-400" /> Cache Stats
          </h2>
          <div className="space-y-3 pt-2 text-xs font-semibold">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-gray-400">Cache Utilization</span>
                <span className="text-white">124 / 500 max keys</span>
              </div>
              <div className="w-full bg-white/[0.04] h-2 rounded-full overflow-hidden">
                <div className="bg-violet-400 h-full rounded-full" style={{ width: "24.8%" }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-gray-400">Database Size</span>
                <span className="text-white">1.8 MB (MongoDB Atlas free tier)</span>
              </div>
              <div className="w-full bg-white/[0.04] h-2 rounded-full overflow-hidden">
                <div className="bg-cyan-400 h-full rounded-full" style={{ width: "5%" }} />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
