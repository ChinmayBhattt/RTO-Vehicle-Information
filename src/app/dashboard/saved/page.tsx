"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import {
  Car,
  Bookmark,
  Trash2,
  Calendar,
  ChevronRight,
  Search,
  ExternalLink,
} from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Skeleton from "@/components/ui/Skeleton";
import Badge from "@/components/ui/Badge";
import { getStatusBadgeClasses } from "@/lib/types/vehicle";

export default function SavedVehiclesPage() {
  const [savedItems, setSavedItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSaved = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/saved");
      const resData = await res.json();
      if (resData.success) {
        setSavedItems(resData.data);
      } else {
        toast.error(resData.error || "Failed to load saved vehicles");
      }
    } catch {
      toast.error("Failed to fetch saved vehicles");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSaved();
  }, []);

  const removeVehicle = async (id: string) => {
    try {
      const res = await fetch(`/api/saved?id=${id}`, { method: "DELETE" });
      const resData = await res.json();
      if (resData.success) {
        setSavedItems((prev) => prev.filter((item) => item._id !== id));
        toast.success("Vehicle removed from saved list");
      } else {
        toast.error(resData.error || "Failed to remove vehicle");
      }
    } catch {
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white flex items-center gap-2">
          <Bookmark className="w-8 h-8 text-cyan-400 fill-cyan-400/20" />
          Saved Vehicles
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Keep track of your frequently accessed vehicles. Check their compliance status in real-time.
        </p>
      </div>

      {/* Main Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-4"
            >
              <div className="flex justify-between items-start">
                <Skeleton className="w-12 h-12 rounded-xl" />
                <Skeleton className="w-20 h-6 rounded-full" />
              </div>
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <div className="flex gap-2 pt-2">
                <Skeleton className="h-9 flex-1 rounded-lg" />
                <Skeleton className="h-9 w-9 rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      ) : savedItems.length === 0 ? (
        <Card className="p-12 text-center bg-white/[0.02] border-white/[0.08] flex flex-col items-center justify-center">
          <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center mb-6">
            <Bookmark className="w-8 h-8 text-gray-500" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">No Saved Vehicles</h3>
          <p className="text-gray-400 max-w-sm mb-6 text-sm">
            Save vehicles here from their details page to keep them handy for fast lookup and compliance alerts.
          </p>
          <Link href="/dashboard">
            <Button className="bg-gradient-to-r from-cyan-400 to-violet-500 text-white font-semibold flex items-center gap-2 px-6 py-2.5 rounded-xl cursor-pointer">
              <Search className="w-4 h-4" /> Search Vehicles
            </Button>
          </Link>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {savedItems.map((item, index) => {
              const regNum = item.registrationNumber;
              const nickname = item.nickname || "My Vehicle";
              const model = item.vehicleData?.vehicle?.model || "Unknown";
              const manufacturer = item.vehicleData?.vehicle?.manufacturer || "Vehicle";
              const rcStatus = item.vehicleData?.compliance?.rcStatus || "Active";
              const fuelType = item.vehicleData?.vehicle?.fuelType;

              return (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Card className="p-6 bg-white/[0.02] border-white/[0.08] hover:border-cyan-500/20 hover:bg-white/[0.03] transition-all flex flex-col justify-between h-full space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-start">
                        <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                          <Car className="w-6 h-6 text-cyan-400" />
                        </div>
                        <span
                          className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${getStatusBadgeClasses(rcStatus)}`}
                        >
                          RC: {rcStatus}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white font-mono tracking-wider">
                          {regNum}
                        </h3>
                        <p className="text-sm font-semibold text-cyan-400/80 mt-1">
                          {nickname}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {manufacturer} {model} {fuelType ? `(${fuelType})` : ""}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Link href={`/vehicle/${encodeURIComponent(regNum)}`} className="flex-1">
                        <Button
                          variant="outline"
                          className="w-full text-xs h-9 flex items-center justify-center gap-1.5 hover:bg-white/[0.05]"
                        >
                          View Details
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button
                        onClick={() => removeVehicle(item._id)}
                        variant="outline"
                        className="border-white/[0.08] hover:border-red-500/20 hover:bg-red-500/10 hover:text-red-400 text-gray-500 h-9 w-9 p-0 flex items-center justify-center cursor-pointer"
                        aria-label="Remove vehicle"
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
