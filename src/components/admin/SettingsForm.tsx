"use client";

import React, { useState } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { 
  Save, 
  RefreshCw, 
  Key, 
  Globe, 
  Database, 
  Eye, 
  EyeOff, 
  CheckCircle, 
  AlertCircle,
  HelpCircle,
  Activity
} from "lucide-react";

interface SettingsFormProps {
  initialSettings: {
    activeProvider: string;
    rapidApiKey: string;
    rapidApiHost: string;
    rapidApiUrl: string;
    hasApiKey: boolean;
  };
}

export default function SettingsForm({ initialSettings }: SettingsFormProps) {
  const [activeProvider, setActiveProvider] = useState(initialSettings.activeProvider);
  const [rapidApiKey, setRapidApiKey] = useState(initialSettings.rapidApiKey);
  const [rapidApiHost, setRapidApiHost] = useState(initialSettings.rapidApiHost);
  const [rapidApiUrl, setRapidApiUrl] = useState(initialSettings.rapidApiUrl);
  const [showKey, setShowKey] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error" | null; message: string }>({
    type: null,
    message: "",
  });

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/admin/settings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          activeProvider,
          rapidApiKey: rapidApiKey || null,
          rapidApiHost: rapidApiHost || null,
          rapidApiUrl: rapidApiUrl || null,
        }),
      });

      const resData = await response.json();

      if (response.ok && resData.success) {
        setStatus({
          type: "success",
          message: "Settings saved successfully! Cache cleared and changes applied.",
        });
        // Mask the API key locally if user typed a new one
        if (rapidApiKey && !rapidApiKey.includes("...") && !rapidApiKey.includes("••")) {
          setRapidApiKey(
            rapidApiKey.length > 8 
              ? `${rapidApiKey.substring(0, 4)}...${rapidApiKey.substring(rapidApiKey.length - 4)}` 
              : "••••••••"
          );
        }
      } else {
        setStatus({
          type: "error",
          message: resData.error || "Failed to update configuration settings.",
        });
      }
    } catch (err: any) {
      setStatus({
        type: "error",
        message: err.message || "An unexpected error occurred. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSave} className="space-y-6">
      {/* Provider Selector Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Mock Provider Selection */}
        <div 
          onClick={() => setActiveProvider("mock")}
          className={`cursor-pointer transition-all duration-300 rounded-2xl p-6 border text-left flex flex-col justify-between h-48 relative overflow-hidden group
            ${activeProvider === "mock" 
              ? "bg-cyan-500/[0.03] border-cyan-500/50 shadow-[0_0_30px_rgba(6,182,212,0.1)]" 
              : "bg-white/[0.02] border-white/[0.08] hover:border-white/20 hover:bg-white/[0.04]"
            }`}
        >
          {activeProvider === "mock" && (
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-cyan-500/10 to-transparent pointer-events-none" />
          )}
          <div className="flex justify-between items-start">
            <div className={`p-3 rounded-xl ${activeProvider === "mock" ? "bg-cyan-500/20 text-cyan-400" : "bg-white/[0.04] text-gray-400"}`}>
              <Database className="w-6 h-6" />
            </div>
            {activeProvider === "mock" && (
              <span className="text-xs bg-cyan-500/20 text-cyan-300 px-2.5 py-1 rounded-full border border-cyan-400/20 font-medium">
                Active Mode
              </span>
            )}
          </div>
          <div>
            <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors duration-200">
              Mock/Offline Data
            </h3>
            <p className="text-gray-400 text-xs mt-1.5 leading-relaxed">
              Deterministic simulated data generated on the fly. Free, fast, works offline, and requires no API setup.
            </p>
          </div>
        </div>

        {/* Live Provider Selection */}
        <div 
          onClick={() => setActiveProvider("rapidapi")}
          className={`cursor-pointer transition-all duration-300 rounded-2xl p-6 border text-left flex flex-col justify-between h-48 relative overflow-hidden group
            ${activeProvider === "rapidapi" 
              ? "bg-violet-500/[0.03] border-violet-500/50 shadow-[0_0_30px_rgba(139,92,246,0.1)]" 
              : "bg-white/[0.02] border-white/[0.08] hover:border-white/20 hover:bg-white/[0.04]"
            }`}
        >
          {activeProvider === "rapidapi" && (
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-violet-500/10 to-transparent pointer-events-none" />
          )}
          <div className="flex justify-between items-start">
            <div className={`p-3 rounded-xl ${activeProvider === "rapidapi" ? "bg-violet-500/20 text-violet-400" : "bg-white/[0.04] text-gray-400"}`}>
              <Activity className="w-6 h-6" />
            </div>
            {activeProvider === "rapidapi" && (
              <span className="text-xs bg-violet-500/20 text-violet-300 px-2.5 py-1 rounded-full border border-violet-400/20 font-medium">
                Active Mode
              </span>
            )}
          </div>
          <div>
            <h3 className="text-lg font-bold text-white group-hover:text-violet-300 transition-colors duration-200">
              Live RTO Database
            </h3>
            <p className="text-gray-400 text-xs mt-1.5 leading-relaxed">
              Real-time vehicle lookup from official Parivahan/Vahan registers via RapidAPI integrations.
            </p>
          </div>
        </div>
      </div>

      {/* Settings inputs */}
      <Card className="p-6 border-white/[0.08] bg-white/[0.02] relative">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Key className="w-5 h-5 text-cyan-400" />
          RapidAPI Credentials
        </h3>

        <div className="space-y-4">
          {/* API Key */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">
              RapidAPI Key
            </label>
            <div className="relative">
              <input
                type={showKey ? "text" : "password"}
                value={rapidApiKey || ""}
                onChange={(e) => setRapidApiKey(e.target.value)}
                placeholder="Enter your X-RapidAPI-Key (e.g. 5d5a71a93fmsh147...)"
                disabled={activeProvider === "mock"}
                className={`w-full bg-[#0d0d1a] border rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-1 transition-all duration-200
                  ${activeProvider === "mock" 
                    ? "border-white/[0.04] opacity-50 cursor-not-allowed" 
                    : "border-white/[0.1] focus:border-cyan-400/50 focus:ring-cyan-400/50"
                  }`}
              />
              {rapidApiKey && (
                <button
                  type="button"
                  onClick={() => setShowKey(!showKey)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200 cursor-pointer"
                >
                  {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              )}
            </div>
            <span className="text-[10px] text-gray-500 leading-normal block">
              Your API key will remain securely stored in your MongoDB server. We never share it.
            </span>
          </div>

          {/* API Host */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">
                RapidAPI Host
              </label>
              <input
                type="text"
                value={rapidApiHost || ""}
                onChange={(e) => setRapidApiHost(e.target.value)}
                placeholder="e.g. rto-vehicle-information.p.rapidapi.com"
                disabled={activeProvider === "mock"}
                className={`w-full bg-[#0d0d1a] border rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-1 transition-all duration-200
                  ${activeProvider === "mock" 
                    ? "border-white/[0.04] opacity-50 cursor-not-allowed" 
                    : "border-white/[0.1] focus:border-cyan-400/50 focus:ring-cyan-400/50"
                  }`}
              />
            </div>

            {/* API URL */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">
                API Base URL
              </label>
              <input
                type="text"
                value={rapidApiUrl || ""}
                onChange={(e) => setRapidApiUrl(e.target.value)}
                placeholder="e.g. https://rto-vehicle-information.p.rapidapi.com/api/v1/vehicle"
                disabled={activeProvider === "mock"}
                className={`w-full bg-[#0d0d1a] border rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-1 transition-all duration-200
                  ${activeProvider === "mock" 
                    ? "border-white/[0.04] opacity-50 cursor-not-allowed" 
                    : "border-white/[0.1] focus:border-cyan-400/50 focus:ring-cyan-400/50"
                  }`}
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Guide Card */}
      <Card className="p-6 border-white/[0.08] bg-white/[0.02]">
        <h3 className="text-md font-bold text-white mb-3 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-violet-400" />
          Setup Guide: How to fetch Real-time Live Vehicle Data?
        </h3>
        <div className="text-xs text-gray-400 space-y-2 leading-relaxed">
          <p>
            To fetch original registration, ownership, compliance, and engine details for Indian vehicles, you will need to subscribe to an RTO / Vahan database wrapper on RapidAPI.
          </p>
          <ol className="list-decimal list-inside space-y-1.5 pl-1">
            <li>
              Go to <a href="https://rapidapi.com/" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">RapidAPI.com</a> and sign up for a free account.
            </li>
            <li>
              Search for APIs like <strong className="text-gray-300">"RTO Vehicle Information"</strong>, <strong className="text-gray-300">"Car Info"</strong>, or <strong className="text-gray-300">"Vehicle Verification"</strong>.
            </li>
            <li>
              Select a provider (such as <code className="text-cyan-300 font-mono">rto-vehicle-information.p.rapidapi.com</code>) and subscribe to their free tier/trial plan.
            </li>
            <li>
              Copy the <code className="text-cyan-300 font-mono">X-RapidAPI-Key</code> and <code className="text-cyan-300 font-mono">X-RapidAPI-Host</code> parameters from your RapidAPI dashboard.
            </li>
            <li>
              Fill in the credentials above, choose <strong className="text-violet-400">Live RTO Database</strong>, and click <strong className="text-gray-300">Save Configuration</strong>.
            </li>
          </ol>
          <p className="text-[10px] text-gray-500 mt-2 bg-white/[0.01] border border-white/[0.04] p-2 rounded-lg">
            <strong>Supported Formats:</strong> Our API system is built with a pluggable normalization parser that automatically resolves different vendor schemas (camelCase, snake_case, etc.) and extracts dates, compliance status indicators, and owner records dynamically.
          </p>
        </div>
      </Card>

      {/* Status Notifications */}
      {status.type && (
        <div className={`p-4 rounded-xl border flex items-start gap-3 transition-all duration-200
          ${status.type === "success" 
            ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" 
            : "bg-red-500/10 border-red-500/30 text-red-400"
          }`}
        >
          {status.type === "success" ? (
            <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          )}
          <span className="text-sm font-medium">{status.message}</span>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-end gap-3">
        <Button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 bg-gradient-to-r from-cyan-400 to-violet-500 text-white font-bold px-6 cursor-pointer"
        >
          {loading ? (
            <RefreshCw className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          {loading ? "Saving Settings..." : "Save Configuration"}
        </Button>
      </div>
    </form>
  );
}
