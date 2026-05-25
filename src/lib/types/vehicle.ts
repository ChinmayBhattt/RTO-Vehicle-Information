/**
 * Vehicle Information Types
 *
 * Comprehensive type definitions for vehicle data returned by RTO lookups.
 * All fields align with the data available through Indian government VAHAN/Parivahan APIs.
 */

// ─── Vehicle Status Enums ────────────────────────────────────────────────────

export type RCStatus = "Active" | "Expired" | "Suspended" | "Cancelled" | "NOC Issued";
export type InsuranceStatus = "Active" | "Expired" | "Not Available";
export type PUCStatus = "Valid" | "Expired" | "Not Available";
export type FitnessStatus = "Valid" | "Expired" | "Not Applicable";
export type RoadTaxStatus = "Paid" | "Pending" | "Lifetime Tax Paid" | "Exempted";
export type FuelType = "Petrol" | "Diesel" | "CNG" | "LPG" | "Electric" | "Hybrid" | "Petrol+CNG";
export type VehicleType = "Two Wheeler" | "Four Wheeler" | "Three Wheeler" | "Commercial" | "Heavy Vehicle";
export type VehicleClass =
  | "Motor Car"
  | "Motor Cycle"
  | "Scooter"
  | "SUV"
  | "Hatchback"
  | "Sedan"
  | "Mini Bus"
  | "Bus"
  | "Truck"
  | "Auto Rickshaw"
  | "Goods Carrier"
  | "Tractor";

// ─── Main Vehicle Info Interface ─────────────────────────────────────────────

export interface VehicleInfo {
  registration: {
    number: string;
    date: string;
    validity: string;
    state: string;
    rtoOffice: string;
    vehicleClass: string;
  };
  owner: {
    name: string;
    fatherName: string;
    address: string;
    mobile: string;
  };
  vehicle: {
    model: string;
    manufacturer: string;
    type: string;
    color: string;
    fuelType: string;
    engineNo: string;
    chassisNo: string;
    cubicCapacity?: number;
    seatingCapacity: number;
    manufactureYear: number;
  };
  compliance: {
    rcStatus: string;
    insuranceStatus: string;
    insuranceExpiry: string;
    insuranceCompany?: string;
    pucStatus: string;
    pucExpiry?: string;
    fitnessStatus: string;
    fitnessExpiry?: string;
    roadTaxStatus: string;
    roadTaxPaidUpto?: string;
  };
  financial: {
    financed: string;
    financerName?: string;
    hypothecation?: string;
    permitType?: string;
    permitNumber?: string;
    permitValidity?: string;
  };
  safety: {
    blacklistStatus: string;
    challanPending: string;
    challanCount?: number;
    stolenStatus: string;
    nocDetails?: string;
  };
  history: {
    previousOwners: number;
    lastTransferDate?: string;
    accidentHistory: string;
    ownershipChanges?: string[];
  };
}

// ─── Application Types ───────────────────────────────────────────────────────

export interface SearchHistoryItem {
  id: string;
  userId: string;
  registrationNumber: string;
  vehicleData: VehicleInfo;
  searchedAt: string;
}

export interface SavedVehicleItem {
  id: string;
  userId: string;
  registrationNumber: string;
  nickname: string;
  vehicleData: VehicleInfo;
  savedAt: string;
}

export type UserRole = "user" | "admin";
export type UserPlan = "free" | "pro" | "enterprise";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  plan: UserPlan;
  searchCount: number;
  createdAt: string;
  updatedAt: string;
}

// ─── API Response Types ──────────────────────────────────────────────────────

export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
  cached?: boolean;
}

export interface ApiErrorResponse {
  success: false;
  error: string;
  code?: string;
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// ─── Status Helper Functions (used by frontend components) ───────────────────

export type StatusType = "active" | "expired" | "pending" | "clear" | "warning" | "none";

export function getStatusColor(status: string): string {
  const s = status.toLowerCase();
  if (["active", "clear", "valid", "paid", "no", "none", "not stolen", "not blacklisted", "false"].includes(s))
    return "text-emerald-400";
  if (["expired", "stolen", "blacklisted", "yes", "true"].includes(s))
    return "text-red-400";
  if (["pending", "warning", "due"].includes(s))
    return "text-amber-400";
  return "text-gray-400";
}

export function getStatusBadgeClasses(status: string): string {
  const s = status.toLowerCase();
  if (["active", "clear", "valid", "paid", "no", "none", "not stolen", "not blacklisted", "false"].includes(s))
    return "bg-emerald-400/10 text-emerald-400 border border-emerald-400/20";
  if (["expired", "stolen", "blacklisted", "yes", "true"].includes(s))
    return "bg-red-400/10 text-red-400 border border-red-400/20";
  if (["pending", "warning", "due"].includes(s))
    return "bg-amber-400/10 text-amber-400 border border-amber-400/20";
  return "bg-gray-400/10 text-gray-400 border border-gray-400/20";
}
