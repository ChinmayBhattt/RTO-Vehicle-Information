'use client';

import { useState, useEffect, use } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import {
  ArrowLeft,
  Download,
  Share2,
  Bookmark,
  Car,
  User,
  Settings,
  ShieldCheck,
  Wallet,
  AlertTriangle,
  History,
  ClipboardList,
  MapPin,
  Calendar,
  Fuel,
  Palette,
  Hash,
  Phone,
  Home,
  CreditCard,
  Scale,
  FileWarning,
  CircleAlert,
  CheckCircle,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { VehicleInfo, getStatusBadgeClasses } from '@/lib/types/vehicle';

/* ────────────── shimmer skeleton ────────────── */
function Skeleton({ className = '' }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-lg bg-white/[0.06] ${className}`}
    />
  );
}

function LoadingSkeleton() {
  return (
    <div className="space-y-6">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="rounded-2xl bg-white/[0.03] border border-white/[0.08] p-6"
        >
          <Skeleton className="h-6 w-48 mb-6" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[...Array(6)].map((_, j) => (
              <div key={j}>
                <Skeleton className="h-3 w-24 mb-2" />
                <Skeleton className="h-5 w-40" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ────────────── data field display ────────────── */
interface DataFieldProps {
  label: string;
  value: string | number | undefined;
  isStatus?: boolean;
  isMono?: boolean;
  icon?: LucideIcon;
}

function DataField({ label, value, isStatus, isMono, icon: Icon }: DataFieldProps) {
  const display = value?.toString() || '—';
  return (
    <div className="py-3">
      <div className="flex items-center gap-1.5 mb-1">
        {Icon && <Icon className="w-3.5 h-3.5 text-gray-600" />}
        <span className="text-xs text-gray-500 uppercase tracking-wider font-medium">
          {label}
        </span>
      </div>
      {isStatus ? (
        <span
          className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClasses(display)}`}
        >
          {display}
        </span>
      ) : (
        <span
          className={`text-white text-sm ${isMono ? 'font-mono tracking-wider' : ''}`}
        >
          {display}
        </span>
      )}
    </div>
  );
}

/* ────────────── info card group ────────────── */
interface CardGroupProps {
  title: string;
  icon: LucideIcon;
  borderColor: string;
  children: React.ReactNode;
  delay?: number;
}

function CardGroup({ title, icon: Icon, borderColor, children, delay = 0 }: CardGroupProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] as const }}
      className={`rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] overflow-hidden ${borderColor}`}
    >
      <div className="px-6 py-4 border-b border-white/[0.06] flex items-center gap-3">
        <Icon className="w-5 h-5 text-gray-400" />
        <h3 className="text-white font-semibold">{title}</h3>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-0">
          {children}
        </div>
      </div>
    </motion.div>
  );
}

/* ────────────── main page ────────────── */
export default function VehicleDetailsPage({
  params,
}: {
  params: Promise<{ regNumber: string }>;
}) {
  const { regNumber } = use(params);
  const [vehicle, setVehicle] = useState<VehicleInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  const fetchVehicle = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/vehicle/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ registrationNumber: decodeURIComponent(regNumber) }),
      });
      
      const resData = await res.json().catch(() => null);
      
      if (!res.ok) {
        throw new Error(resData?.error || `Vehicle not found (${res.status})`);
      }
      
      if (resData && resData.success) {
        setVehicle(resData.data);
      } else {
        throw new Error(resData?.error || 'Failed to parse vehicle data');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const checkSavedStatus = async () => {
    try {
      const res = await fetch("/api/saved");
      const resData = await res.json();
      if (resData.success) {
        const cleanReg = decodeURIComponent(regNumber).toUpperCase().replace(/[\s\-]/g, "");
        const found = resData.data.some(
          (item: any) => item.registrationNumber === cleanReg
        );
        setIsSaved(found);
      }
    } catch (err) {
      console.error("Error checking saved status:", err);
    }
  };

  const handleSave = async () => {
    if (!vehicle) return;
    setSaving(true);
    try {
      if (isSaved) {
        const cleanReg = vehicle.registration.number;
        const res = await fetch(`/api/saved?reg=${cleanReg}`, { method: "DELETE" });
        const resData = await res.json();
        if (resData.success) {
          setIsSaved(false);
          toast.success("Removed from saved list");
        } else {
          toast.error(resData.error || "Failed to remove vehicle");
        }
      } else {
        const res = await fetch("/api/saved", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            registrationNumber: vehicle.registration.number,
            vehicleData: vehicle,
            nickname: `${vehicle.vehicle.manufacturer} ${vehicle.vehicle.model}`,
          }),
        });
        const resData = await res.json();
        if (resData.success) {
          setIsSaved(true);
          toast.success("Saved to dashboard");
        } else {
          toast.error(resData.error || "Failed to save vehicle. Make sure you are logged in.");
        }
      }
    } catch {
      toast.error("Authentication required to save vehicles.");
    } finally {
      setSaving(false);
    }
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Copied details link to clipboard!");
    }
  };

  const handleExport = () => {
    toast.success("Generating report PDF... Starting download.");
    window.print();
  };

  useEffect(() => {
    fetchVehicle();
    checkSavedStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [regNumber]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0a0a1a] via-[#111827] to-[#0d1117] text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {/* ── Header ── */}
        <motion.div
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/[0.05] border border-white/[0.08] hover:bg-white/[0.1] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold font-mono tracking-wider">
                {decodeURIComponent(regNumber)}
              </h1>
              <p className="text-gray-500 text-sm mt-0.5">Vehicle Registration Details</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSave}
              disabled={saving}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm transition-all cursor-pointer ${
                isSaved
                  ? 'bg-cyan-500/10 border-cyan-400/40 text-cyan-400'
                  : 'bg-white/[0.05] border-white/[0.08] text-gray-400 hover:bg-white/[0.1] hover:text-white'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-cyan-400' : ''}`} />
              <span className="hidden sm:inline">{isSaved ? 'Saved' : 'Save'}</span>
            </button>
            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.05] border border-white/[0.08] text-sm text-gray-400 hover:bg-white/[0.1] hover:text-white transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Export</span>
            </button>
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.05] border border-white/[0.08] text-sm text-gray-400 hover:bg-white/[0.1] hover:text-white transition-all cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">Share</span>
            </button>
          </div>
        </motion.div>

        {/* ── Loading ── */}
        {loading && <LoadingSkeleton />}

        {/* ── Error ── */}
        {!loading && error && (
          <motion.div
            className="flex flex-col items-center justify-center py-20 text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center mb-6">
              <CircleAlert className="w-8 h-8 text-red-400" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Unable to Fetch Data</h2>
            <p className="text-gray-500 mb-6 max-w-md">{error}</p>
            <button
              onClick={fetchVehicle}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-violet-500 text-white font-medium hover:shadow-[0_0_25px_rgba(6,182,212,0.3)] transition-all cursor-pointer"
            >
              Retry
            </button>
          </motion.div>
        )}

        {/* ── Vehicle Data ── */}
        {!loading && vehicle && (
          <div className="space-y-6">
            {/* Registration Info */}
            <CardGroup
              title="Registration Info"
              icon={ClipboardList}
              borderColor="border-l-4 border-l-cyan-400"
              delay={0}
            >
              <DataField label="Registration Number" value={vehicle.registration.number} isMono icon={Hash} />
              <DataField label="Registration Date" value={vehicle.registration.date} icon={Calendar} />
              <DataField label="Validity" value={vehicle.registration.validity} icon={Calendar} />
              <DataField label="State" value={vehicle.registration.state} icon={MapPin} />
              <DataField label="RTO Office" value={vehicle.registration.rtoOffice} icon={Home} />
              <DataField label="Vehicle Class" value={vehicle.registration.vehicleClass} icon={Car} />
            </CardGroup>

            {/* Owner Details */}
            <CardGroup
              title="Owner Details"
              icon={User}
              borderColor="border-l-4 border-l-violet-500"
              delay={0.1}
            >
              <DataField label="Owner Name" value={vehicle.owner.name} icon={User} />
              <DataField label="Father's Name" value={vehicle.owner.fatherName} icon={User} />
              <DataField label="Address" value={vehicle.owner.address} icon={MapPin} />
              <DataField label="Mobile" value={vehicle.owner.mobile} icon={Phone} />
            </CardGroup>

            {/* Vehicle Specifications */}
            <CardGroup
              title="Vehicle Specifications"
              icon={Settings}
              borderColor="border-l-4 border-l-blue-400"
              delay={0.2}
            >
              <DataField label="Model" value={vehicle.vehicle.model} icon={Car} />
              <DataField label="Manufacturer" value={vehicle.vehicle.manufacturer} />
              <DataField label="Vehicle Type" value={vehicle.vehicle.type} />
              <DataField label="Color" value={vehicle.vehicle.color} icon={Palette} />
              <DataField label="Fuel Type" value={vehicle.vehicle.fuelType} icon={Fuel} />
              <DataField label="Engine No." value={vehicle.vehicle.engineNo} isMono icon={Hash} />
              <DataField label="Chassis No." value={vehicle.vehicle.chassisNo} isMono icon={Hash} />
              <DataField label="Cubic Capacity" value={vehicle.vehicle.cubicCapacity ? `${vehicle.vehicle.cubicCapacity} cc` : undefined} />
              <DataField label="Seating Capacity" value={vehicle.vehicle.seatingCapacity} />
              <DataField label="Manufacture Year" value={vehicle.vehicle.manufactureYear} icon={Calendar} />
            </CardGroup>

            {/* Compliance & Status */}
            <CardGroup
              title="Compliance & Status"
              icon={ShieldCheck}
              borderColor="border-l-4 border-l-emerald-400"
              delay={0.3}
            >
              <DataField label="RC Status" value={vehicle.compliance.rcStatus} isStatus />
              <DataField label="Insurance Status" value={vehicle.compliance.insuranceStatus} isStatus />
              <DataField label="Insurance Expiry" value={vehicle.compliance.insuranceExpiry} icon={Calendar} />
              <DataField label="Insurance Company" value={vehicle.compliance.insuranceCompany} />
              <DataField label="PUC Status" value={vehicle.compliance.pucStatus} isStatus />
              <DataField label="PUC Expiry" value={vehicle.compliance.pucExpiry} icon={Calendar} />
              <DataField label="Fitness Status" value={vehicle.compliance.fitnessStatus} isStatus />
              <DataField label="Fitness Expiry" value={vehicle.compliance.fitnessExpiry} icon={Calendar} />
              <DataField label="Road Tax Status" value={vehicle.compliance.roadTaxStatus} isStatus />
              <DataField label="Road Tax Paid Upto" value={vehicle.compliance.roadTaxPaidUpto} icon={Calendar} />
            </CardGroup>

            {/* Financial Details */}
            <CardGroup
              title="Financial Details"
              icon={Wallet}
              borderColor="border-l-4 border-l-amber-400"
              delay={0.4}
            >
              <DataField label="Financed" value={vehicle.financial.financed} isStatus />
              <DataField label="Financier" value={vehicle.financial.financerName} icon={CreditCard} />
              <DataField label="Hypothecation" value={vehicle.financial.hypothecation} />
              <DataField label="Permit Type" value={vehicle.financial.permitType} />
              <DataField label="Permit Number" value={vehicle.financial.permitNumber} isMono />
              <DataField label="Permit Validity" value={vehicle.financial.permitValidity} icon={Calendar} />
            </CardGroup>

            {/* Safety & Legal */}
            <CardGroup
              title="Safety & Legal"
              icon={AlertTriangle}
              borderColor="border-l-4 border-l-red-400"
              delay={0.5}
            >
              <DataField label="Blacklist Status" value={vehicle.safety.blacklistStatus} isStatus />
              <DataField label="Challan Pending" value={vehicle.safety.challanPending} isStatus />
              <DataField label="Challan Count" value={vehicle.safety.challanCount} />
              <DataField label="Stolen Status" value={vehicle.safety.stolenStatus} isStatus />
              <DataField label="NOC Details" value={vehicle.safety.nocDetails} icon={FileWarning} />
            </CardGroup>

            {/* History */}
            <CardGroup
              title="History"
              icon={History}
              borderColor="border-l-4 border-l-purple-400"
              delay={0.6}
            >
              <DataField label="Previous Owners" value={vehicle.history.previousOwners} />
              <DataField label="Last Transfer Date" value={vehicle.history.lastTransferDate} icon={Calendar} />
              <DataField label="Accident History" value={vehicle.history.accidentHistory} isStatus />
              {vehicle.history.ownershipChanges && vehicle.history.ownershipChanges.length > 0 && (
                <div className="sm:col-span-2 py-3">
                  <span className="text-xs text-gray-500 uppercase tracking-wider font-medium flex items-center gap-1.5 mb-2">
                    <Scale className="w-3.5 h-3.5 text-gray-600" /> Ownership Changes
                  </span>
                  <ul className="space-y-1">
                    {vehicle.history.ownershipChanges.map((change, i) => (
                      <li key={i} className="text-white text-sm">
                        • {change}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardGroup>
          </div>
        )}
      </div>
    </main>
  );
}
