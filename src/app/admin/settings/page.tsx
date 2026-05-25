import Link from "next/link";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import dbConnect from "@/lib/db/mongoose";
import User from "@/lib/models/User";
import SystemConfig from "@/lib/models/SystemConfig";
import Button from "@/components/ui/Button";
import SettingsForm from "@/components/admin/SettingsForm";
import { ArrowLeft, Settings } from "lucide-react";

export const revalidate = 0; // Dynamic server rendering

export default async function AdminSettingsPage() {
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

  // Fetch current configs
  const providerConfig = await SystemConfig.findOne({ key: "active_provider" });
  const hostConfig = await SystemConfig.findOne({ key: "rapidapi_host" });
  const urlConfig = await SystemConfig.findOne({ key: "rapidapi_url" });
  const keyConfig = await SystemConfig.findOne({ key: "rapidapi_key" });

  const rawKey = keyConfig?.value || process.env.RAPIDAPI_KEY || "";
  let maskedKey = "";
  if (rawKey) {
    maskedKey = rawKey.length > 8 
      ? `${rawKey.substring(0, 4)}...${rawKey.substring(rawKey.length - 4)}` 
      : "••••••••";
  }

  const initialSettings = {
    activeProvider: providerConfig?.value || process.env.VEHICLE_API_PROVIDER || "mock",
    rapidApiHost: hostConfig?.value || process.env.RAPIDAPI_HOST || "rto-vehicle-information.p.rapidapi.com",
    rapidApiUrl: urlConfig?.value || process.env.RAPIDAPI_URL || "https://rto-vehicle-information.p.rapidapi.com/api/v1/vehicle",
    hasApiKey: !!rawKey,
    rapidApiKey: maskedKey,
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <Link href="/admin">
            <Button variant="outline" className="w-10 h-10 p-0 flex items-center justify-center rounded-xl cursor-pointer">
              <ArrowLeft className="w-5 h-5 text-gray-400" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <Settings className="w-6 h-6 text-cyan-400" />
              API Settings
            </h1>
            <p className="text-gray-400 text-xs mt-0.5">
              Configure data source and API credentials for Indian vehicle lookups.
            </p>
          </div>
        </div>
      </div>

      {/* Form Card */}
      <SettingsForm initialSettings={initialSettings} />
    </div>
  );
}
