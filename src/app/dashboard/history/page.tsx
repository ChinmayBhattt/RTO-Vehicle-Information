"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import {
  Car,
  History as HistoryIcon,
  Trash2,
  Calendar,
  ExternalLink,
  Search,
  ChevronRight,
  ArrowLeft,
  RefreshCw,
} from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Skeleton from "@/components/ui/Skeleton";


export default function HistoryPage() {
  const [historyItems, setHistoryItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [clearing, setClearing] = useState(false);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/history?limit=50");
      const resData = await res.json();
      if (resData.success) {
        setHistoryItems(resData.data.items);
      } else {
        toast.error(resData.error || "Failed to load search history");
      }
    } catch {
      toast.error("Failed to fetch search history");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const deleteItem = async (id: string) => {
    try {
      const res = await fetch(`/api/history?id=${id}`, { method: "DELETE" });
      const resData = await res.json();
      if (resData.success) {
        setHistoryItems((prev) => prev.filter((item) => item._id !== id));
        toast.success("History item deleted");
      } else {
        toast.error(resData.error || "Failed to delete item");
      }
    } catch {
      toast.error("An error occurred. Please try again.");
    }
  };

  const clearAll = async () => {
    if (!confirm("Are you sure you want to clear your entire search history?")) return;
    setClearing(true);
    try {
      const res = await fetch("/api/history", { method: "DELETE" });
      const resData = await res.json();
      if (resData.success) {
        setHistoryItems([]);
        toast.success("Search history cleared");
      } else {
        toast.error(resData.error || "Failed to clear history");
      }
    } catch {
      toast.error("An error occurred. Please try again.");
    } finally {
      setClearing(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-2">
            <HistoryIcon className="w-8 h-8 text-cyan-400" />
            Search History
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            View, open, or manage your recent vehicle lookups.
          </p>
        </div>
        {historyItems.length > 0 && (
          <Button
            onClick={clearAll}
            disabled={clearing}
            variant="outline"
            className="border-red-500/20 hover:bg-red-500/10 text-red-400 flex items-center gap-2 cursor-pointer h-10 px-4"
          >
            <Trash2 className="w-4 h-4" />
            {clearing ? "Clearing..." : "Clear All History"}
          </Button>
        )}
      </div>

      {/* Main List */}
      {loading ? (
        <div className="space-y-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between"
            >
              <div className="flex items-center gap-4 w-full">
                <Skeleton className="w-10 h-10 rounded-xl" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-4 w-48" />
                </div>
              </div>
              <Skeleton className="w-24 h-8 rounded-lg" />
            </div>
          ))}
        </div>
      ) : historyItems.length === 0 ? (
        <Card className="p-12 text-center bg-white/[0.02] border-white/[0.08] flex flex-col items-center justify-center">
          <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center mb-6">
            <HistoryIcon className="w-8 h-8 text-gray-500" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">No Searches Found</h3>
          <p className="text-gray-400 max-w-sm mb-6 text-sm">
            You haven't searched for any vehicles yet. Go back to the dashboard to run your first search.
          </p>
          <Link href="/dashboard">
            <Button className="bg-gradient-to-r from-cyan-400 to-violet-500 text-white font-semibold flex items-center gap-2 px-6 py-2.5 rounded-xl cursor-pointer">
              <Search className="w-4 h-4" /> Start Search
            </Button>
          </Link>
        </Card>
      ) : (
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {historyItems.map((item, index) => {
              const regNum = item.registrationNumber;
              const model = item.vehicleData?.vehicle?.model || "Unknown";
              const manufacturer = item.vehicleData?.vehicle?.manufacturer || "Vehicle";
              const fuelType = item.vehicleData?.vehicle?.fuelType;
              const owner = item.vehicleData?.owner?.name;
              const dateStr = new Date(item.searchedAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              });

              return (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: index * 0.03 }}
                >
                  <Card className="p-4 sm:p-5 bg-white/[0.02] border-white/[0.08] hover:border-cyan-500/20 hover:bg-white/[0.03] transition-all flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center shrink-0">
                        <Car className="w-6 h-6 text-cyan-400" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-base font-bold text-white font-mono tracking-wider">
                            {regNum}
                          </h3>
                          {fuelType && (
                            <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-white/[0.05] text-gray-400 border border-white/[0.08]">
                              {fuelType}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-300 mt-1">
                          {manufacturer} {model} {owner ? `• Owned by ${owner}` : ""}
                        </p>
                        <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-2">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>Searched on {dateStr}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 sm:self-center self-end">
                      <Link href={`/vehicle/${encodeURIComponent(regNum)}`}>
                        <Button variant="outline" className="text-xs h-9 px-3 flex items-center gap-1.5">
                          View Report
                          <ChevronRight className="w-3.5 h-3.5" />
                        </Button>
                      </Link>
                      <Button
                        onClick={() => deleteItem(item._id)}
                        variant="outline"
                        className="border-white/[0.08] hover:border-red-500/20 hover:bg-red-500/10 hover:text-red-400 text-gray-500 h-9 w-9 p-0 flex items-center justify-center cursor-pointer"
                        aria-label="Delete history item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
