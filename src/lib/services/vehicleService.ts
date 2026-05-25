/**
 * Vehicle Service — Adapter Pattern
 *
 * Abstracts vehicle data retrieval behind a provider interface.
 * Checks cache first, then calls the active provider, then caches the result.
 */

import type { VehicleInfo } from "@/lib/types/vehicle";
import { generateMockVehicleData } from "./mockDataProvider";
import dbConnect from "@/lib/db/mongoose";
import SystemConfig from "@/lib/models/SystemConfig";

// ─── Provider Interface ─────────────────────────────────────────────────────

export interface IVehicleDataProvider {
  searchVehicle(registrationNumber: string): Promise<VehicleInfo>;
}

// ─── Mock Provider ──────────────────────────────────────────────────────────

class MockVehicleProvider implements IVehicleDataProvider {
  async searchVehicle(registrationNumber: string): Promise<VehicleInfo> {
    // Simulate network delay (200-600ms)
    await new Promise((resolve) =>
      setTimeout(resolve, 200 + Math.random() * 400)
    );
    return generateMockVehicleData(registrationNumber);
  }
}

// ─── RapidAPI Provider ──────────────────────────────────────────────────────

class RapidApiVehicleProvider implements IVehicleDataProvider {
  private apiKey?: string;
  private apiHost: string;
  private apiUrl: string;

  constructor(apiKey?: string, apiHost?: string, apiUrl?: string) {
    this.apiKey = apiKey;
    this.apiHost = apiHost || "rto-vehicle-information.p.rapidapi.com";
    this.apiUrl = apiUrl || `https://${this.apiHost}/api/v1/vehicle`;
  }

  async searchVehicle(registrationNumber: string): Promise<VehicleInfo> {
    const apiKey = this.apiKey;
    const apiHost = this.apiHost;
    const apiUrl = this.apiUrl;

    if (!apiKey) {
      throw new Error("RAPIDAPI_KEY is not configured. Please configure it in the Admin Settings.");
    }

    try {
      // Attempt POST request first (standard for many RapidAPI vehicle APIs)
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-rapidapi-key": apiKey,
          "x-rapidapi-host": apiHost,
        },
        body: JSON.stringify({
          reg_no: registrationNumber,
          consent: "Y",
          consent_text: "I consent to verify this vehicle's registration details",
        }),
      });

      if (!response.ok) {
        // Fallback to GET request in case the selected API endpoint is query-based
        const getUrl = `https://${apiHost}/vehicle-info?reg_num=${registrationNumber}&reg_no=${registrationNumber}`;
        const fallbackResponse = await fetch(getUrl, {
          method: "GET",
          headers: {
            "x-rapidapi-key": apiKey,
            "x-rapidapi-host": apiHost,
          },
        });

        if (!fallbackResponse.ok) {
          throw new Error(`API returned error status: ${response.status}`);
        }

        const resData = await fallbackResponse.json();
        return this.mapResponseToVehicleInfo(registrationNumber, resData);
      }

      const resData = await response.json();
      return this.mapResponseToVehicleInfo(registrationNumber, resData);
    } catch (apiError) {
      console.error("[RapidAPI Call Failed]", apiError);
      throw new Error(`Real-time vehicle search failed. ${apiError instanceof Error ? apiError.message : ""}`);
    }
  }

  private mapResponseToVehicleInfo(regNum: string, apiData: any): VehicleInfo {
    // Dig into common nested structures returned by RapidAPI wrappers (e.g. data or result)
    const raw = apiData.data || apiData.result || apiData.vehicle_details || apiData;

    // Helper to fetch keys in a case-insensitive / format-agnostic way
    const getVal = (...keys: string[]): any => {
      for (const key of keys) {
        if (raw[key] !== undefined && raw[key] !== null) return raw[key];
        
        // try snake_case conversion
        const snake = key.replace(/([A-Z])/g, "_$1").toLowerCase();
        if (raw[snake] !== undefined && raw[snake] !== null) return raw[snake];
        
        // try all lowercase
        const lcase = key.toLowerCase();
        if (raw[lcase] !== undefined && raw[lcase] !== null) return raw[lcase];
      }
      return undefined;
    };

    const manufacturer = getVal("manufacturer", "make", "maker", "brand") || "Unknown Manufacturer";
    const model = getVal("model", "modelName", "makerModel", "typeModel") || "Vehicle Model";

    // Extract dates
    const regDate = getVal("registrationDate", "regDate", "reg_date") || new Date().toISOString().split("T")[0];
    const validityDate = getVal("registrationValidity", "regValidity", "validity", "fitness_upto", "fitness") || "—";
    
    // Parse compliance status flags
    const rcStatus = getVal("rcStatus", "status", "rc_status") || "Active";
    const isBlacklisted = getVal("blacklistStatus", "blacklisted", "blacklist_status");
    const hasChallan = getVal("challanStatus", "challan_pending", "has_challans");
    const isStolen = getVal("stolenStatus", "stolen", "stolen_status");

    return {
      registration: {
        number: regNum,
        date: regDate,
        validity: validityDate,
        state: getVal("state", "stateName", "state_code") || "—",
        rtoOffice: getVal("rtoOffice", "rto", "rtoName", "rto_location") || "—",
        vehicleClass: getVal("vehicleClass", "class", "vehicle_class") || "Motor Car",
      },
      owner: {
        name: getVal("ownerName", "owner", "registeredOwner") || "—",
        fatherName: getVal("fatherName", "father_name", "guardianName") || "—",
        address: getVal("ownerAddress", "address", "permanentAddress") || "—",
        mobile: getVal("mobileNumber", "mobile", "phoneNumber") || "—",
      },
      vehicle: {
        model: model,
        manufacturer: manufacturer,
        type: getVal("vehicleType", "type", "category") || "Four Wheeler",
        color: getVal("color", "colour") || "—",
        fuelType: getVal("fuelType", "fuel") || "Petrol",
        engineNo: getVal("engineNumber", "engineNo", "engine_no") || "—",
        chassisNo: getVal("chassisNumber", "chassisNo", "chassis_no") || "—",
        cubicCapacity: Number(getVal("cubicCapacity", "cc", "capacity")) || undefined,
        seatingCapacity: Number(getVal("seatingCapacity", "seats", "seating")) || 5,
        manufactureYear: Number(getVal("manufactureYear", "year", "mfgYear")) || new Date(regDate).getFullYear() || new Date().getFullYear(),
      },
      compliance: {
        rcStatus: rcStatus,
        insuranceStatus: getVal("insuranceStatus", "insurance_status") || "—",
        insuranceExpiry: getVal("insuranceExpiry", "insurance_upto", "insuranceValidity") || "—",
        insuranceCompany: getVal("insuranceCompany", "insurance_name") || "—",
        pucStatus: getVal("pucStatus", "puc_status") || "—",
        pucExpiry: getVal("pucExpiry", "puc_upto", "pucValidity") || "—",
        fitnessStatus: getVal("fitnessStatus", "fitness_status") || "—",
        fitnessExpiry: getVal("fitnessExpiry", "fitness_upto", "fitness_validity") || "—",
        roadTaxStatus: getVal("roadTaxStatus", "road_tax_status", "tax_status") || "—",
        roadTaxPaidUpto: getVal("roadTaxPaidUpto", "tax_upto", "taxValidity") || "—",
      },
      financial: {
        financed: getVal("financed", "finance_status", "finance") ? "Yes" : "No",
        financerName: getVal("financerName", "financer", "finance_by") || undefined,
        hypothecation: getVal("hypothecation", "hypothecated_to") || "None",
        permitType: getVal("permitType", "permit_type") || "Private",
        permitNumber: getVal("permitNumber", "permit_no") || undefined,
        permitValidity: getVal("permitValidity", "permit_upto") || undefined,
      },
      safety: {
        blacklistStatus: isBlacklisted === true || isBlacklisted === "Yes" ? "Yes" : "No",
        challanPending: hasChallan === true || hasChallan === "Yes" ? "Yes" : "No",
        challanCount: Number(getVal("challanCount", "challans_count")) || 0,
        stolenStatus: isStolen === true || isStolen === "Yes" ? "Yes" : "No",
        nocDetails: getVal("nocDetails", "noc_status") || "Available",
      },
      history: {
        previousOwners: Number(getVal("previousOwners", "owners_count", "owner_count")) || 1,
        lastTransferDate: getVal("lastTransferDate", "transfer_date") || undefined,
        accidentHistory: getVal("accidentHistory", "accidents") || "None",
        ownershipChanges: getVal("ownershipChanges", "owners_history") || [],
      },
    };
  }
}

// ─── Dynamic Config Loader ──────────────────────────────────────────────────

async function getActiveProviderAndConfig() {
  await dbConnect();
  
  // Default values from environment
  let providerType = process.env.RAPIDAPI_KEY ? "rapidapi" : (process.env.VEHICLE_API_PROVIDER || "mock");
  let apiKey = process.env.RAPIDAPI_KEY;
  let apiHost = process.env.RAPIDAPI_HOST || "rto-vehicle-information.p.rapidapi.com";
  let apiUrl = process.env.RAPIDAPI_URL;

  try {
    const configProvider = await SystemConfig.findOne({ key: "active_provider" });
    if (configProvider) {
      providerType = configProvider.value;
    }
    const configKey = await SystemConfig.findOne({ key: "rapidapi_key" });
    if (configKey) {
      apiKey = configKey.value;
    }
    const configHost = await SystemConfig.findOne({ key: "rapidapi_host" });
    if (configHost) {
      apiHost = configHost.value;
    }
    const configUrl = await SystemConfig.findOne({ key: "rapidapi_url" });
    if (configUrl) {
      apiUrl = configUrl.value;
    }
  } catch (err) {
    console.error("[Config DB Read Failed]", err);
  }

  if (!apiUrl) {
    apiUrl = `https://${apiHost}/api/v1/vehicle`;
  }

  return { providerType, apiKey, apiHost, apiUrl };
}

// ─── Main Search Function ───────────────────────────────────────────────────

const memoryCache = new Map<string, { data: VehicleInfo; expiry: number }>();
const CACHE_TTL = 3600_000; // 1 hour cached

export async function searchVehicle(registrationNumber: string): Promise<VehicleInfo> {
  const normalizedReg = registrationNumber.toUpperCase().replace(/[\s\-]/g, "");

  // Check cache
  const cached = memoryCache.get(normalizedReg);
  if (cached && cached.expiry > Date.now()) {
    return cached.data;
  }

  // Load config dynamically
  const { providerType, apiKey, apiHost, apiUrl } = await getActiveProviderAndConfig();

  let data: VehicleInfo;
  if (providerType === "rapidapi") {
    const provider = new RapidApiVehicleProvider(apiKey, apiHost, apiUrl);
    data = await provider.searchVehicle(normalizedReg);
  } else {
    const provider = new MockVehicleProvider();
    data = await provider.searchVehicle(normalizedReg);
  }

  // Store in cache
  memoryCache.set(normalizedReg, { data, expiry: Date.now() + CACHE_TTL });

  // Cleanup old cache entries
  if (memoryCache.size > 1000) {
    const now = Date.now();
    for (const [key, value] of memoryCache) {
      if (value.expiry < now) memoryCache.delete(key);
    }
  }

  return data;
}
