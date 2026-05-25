/**
 * Mock Vehicle Data Provider
 *
 * Generates realistic, deterministic vehicle data based on registration numbers.
 * Uses a hash of the registration number as a seed for consistent results.
 */

import type { VehicleInfo, FuelType, VehicleType, VehicleClass } from "@/lib/types/vehicle";
import { getStateName, getRTOOffice } from "@/lib/constants/rtoData";

// ─── Seed-based pseudo-random number generator ──────────────────────────────

function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32-bit integer
  }
  return Math.abs(hash);
}

function seededRandom(seed: number, index: number): number {
  const x = Math.sin(seed + index * 9301 + 49297) * 49297;
  return x - Math.floor(x);
}

function pick<T>(arr: T[], seed: number, index: number): T {
  return arr[Math.floor(seededRandom(seed, index) * arr.length)];
}

// ─── Data pools ─────────────────────────────────────────────────────────────

const OWNER_NAMES = [
  "Rajesh Kumar", "Priya Sharma", "Amit Patel", "Sunita Devi",
  "Vikram Singh", "Anjali Gupta", "Suresh Verma", "Meena Kumari",
  "Rahul Joshi", "Deepika Reddy", "Arvind Mishra", "Kavita Nair",
  "Manoj Tiwari", "Pooja Mehta", "Sanjay Chauhan", "Rekha Yadav",
  "Ashok Dubey", "Neha Agarwal", "Ravi Shankar", "Anita Deshmukh",
  "Gaurav Saxena", "Lata Mangeshkar", "Dinesh Choudhary", "Swati Jain",
];

const MANUFACTURERS_MODELS: { manufacturer: string; models: string[]; type: VehicleType; classes: VehicleClass[] }[] = [
  { manufacturer: "Maruti Suzuki", models: ["Swift", "Baleno", "Alto K10", "WagonR", "Brezza", "Ertiga", "Dzire", "Ciaz"], type: "Four Wheeler", classes: ["Hatchback", "Sedan", "SUV"] },
  { manufacturer: "Hyundai", models: ["i20", "Creta", "Venue", "Verna", "Tucson", "Aura", "i10 NIOS"], type: "Four Wheeler", classes: ["Hatchback", "Sedan", "SUV"] },
  { manufacturer: "Tata Motors", models: ["Nexon", "Punch", "Harrier", "Safari", "Altroz", "Tiago", "Tigor"], type: "Four Wheeler", classes: ["Hatchback", "Sedan", "SUV"] },
  { manufacturer: "Mahindra", models: ["XUV700", "Thar", "Scorpio-N", "XUV300", "Bolero", "XUV400"], type: "Four Wheeler", classes: ["SUV"] },
  { manufacturer: "Honda", models: ["City", "Amaze", "Elevate"], type: "Four Wheeler", classes: ["Sedan", "SUV"] },
  { manufacturer: "Toyota", models: ["Fortuner", "Innova Crysta", "Glanza", "Urban Cruiser Hyryder"], type: "Four Wheeler", classes: ["SUV", "Motor Car"] },
  { manufacturer: "Kia", models: ["Seltos", "Sonet", "Carens", "EV6"], type: "Four Wheeler", classes: ["SUV"] },
  { manufacturer: "MG Motors", models: ["Hector", "Astor", "ZS EV", "Gloster"], type: "Four Wheeler", classes: ["SUV"] },
  { manufacturer: "Hero MotoCorp", models: ["Splendor Plus", "HF Deluxe", "Passion Pro", "Xtreme 160R", "Xpulse 200"], type: "Two Wheeler", classes: ["Motor Cycle"] },
  { manufacturer: "Honda Motorcycle", models: ["Activa 6G", "Shine", "Unicorn", "SP 125", "Hornet 2.0"], type: "Two Wheeler", classes: ["Scooter", "Motor Cycle"] },
  { manufacturer: "Bajaj Auto", models: ["Pulsar NS200", "Dominar 400", "Platina", "CT 125X"], type: "Two Wheeler", classes: ["Motor Cycle"] },
  { manufacturer: "Royal Enfield", models: ["Classic 350", "Meteor 350", "Hunter 350", "Himalayan", "Bullet 350"], type: "Two Wheeler", classes: ["Motor Cycle"] },
];

const COLORS = [
  "White", "Silver", "Black", "Grey", "Red", "Blue", "Brown",
  "Beige", "Green", "Orange", "Pearl White", "Midnight Black",
  "Starlight Blue", "Ruby Red", "Titanium Grey",
];

const FUEL_TYPES: FuelType[] = ["Petrol", "Diesel", "CNG", "Electric", "Petrol+CNG", "Hybrid"];

const CITIES = [
  "Jaipur", "Mumbai", "Delhi", "Bangalore", "Chennai", "Hyderabad",
  "Pune", "Ahmedabad", "Kolkata", "Lucknow", "Chandigarh", "Indore",
  "Bhopal", "Patna", "Surat", "Kota", "Jodhpur", "Nagpur",
];

const STREETS = [
  "MG Road", "Station Road", "Civil Lines", "Nehru Nagar",
  "Gandhi Marg", "Subhash Chowk", "Rajiv Colony", "Indira Vihar",
  "Shastri Nagar", "Patel Marg", "Ambedkar Road", "Tilak Nagar",
];

const FINANCERS = [
  "HDFC Bank", "ICICI Bank", "State Bank of India", "Axis Bank",
  "Bajaj Finance", "Mahindra Finance", "Cholamandalam", "Tata Capital",
  "L&T Finance", "Sundaram Finance",
];

// ─── Generator ──────────────────────────────────────────────────────────────

export function generateMockVehicleData(registrationNumber: string): VehicleInfo {
  const reg = registrationNumber.toUpperCase().replace(/[\s\-]/g, "");
  const seed = hashCode(reg);

  // Parse registration components
  const stateCode = reg.substring(0, 2);
  const rtoCode = reg.substring(2, 4);

  const stateName = getStateName(stateCode);
  const rtoOffice = getRTOOffice(stateCode, rtoCode);

  // Pick manufacturer/model
  const mfgData = pick(MANUFACTURERS_MODELS, seed, 1);
  const model = pick(mfgData.models, seed, 2);
  const vehicleClass = pick(mfgData.classes, seed, 3);

  // Generate registration date (1-20 years ago)
  const yearsAgo = 1 + Math.floor(seededRandom(seed, 4) * 20);
  const regDate = new Date();
  regDate.setFullYear(regDate.getFullYear() - yearsAgo);
  regDate.setMonth(Math.floor(seededRandom(seed, 5) * 12));
  regDate.setDate(1 + Math.floor(seededRandom(seed, 6) * 28));

  // Registration validity (15 years from registration for private)
  const validityDate = new Date(regDate);
  validityDate.setFullYear(validityDate.getFullYear() + 15);

  // Insurance dates
  const isInsuranceActive = seededRandom(seed, 7) > 0.25;
  const insuranceExpiry = new Date();
  if (isInsuranceActive) {
    insuranceExpiry.setMonth(insuranceExpiry.getMonth() + Math.floor(seededRandom(seed, 8) * 12));
  } else {
    insuranceExpiry.setMonth(insuranceExpiry.getMonth() - Math.floor(seededRandom(seed, 9) * 24));
  }

  // Fuel type based on vehicle type
  let fuelType: FuelType;
  if (mfgData.type === "Two Wheeler") {
    fuelType = seededRandom(seed, 10) > 0.95 ? "Electric" : "Petrol";
  } else {
    fuelType = pick(FUEL_TYPES, seed, 10);
  }

  // Generate engine & chassis numbers
  const engineChars = "ABCDEFGHJKLMNPRSTUVWXYZ0123456789";
  let engineNumber = "";
  let chassisNumber = "";
  for (let i = 0; i < 10; i++) {
    engineNumber += engineChars[Math.floor(seededRandom(seed, 20 + i) * engineChars.length)];
    chassisNumber += engineChars[Math.floor(seededRandom(seed, 30 + i) * engineChars.length)];
  }
  chassisNumber = "MA" + chassisNumber + engineChars[Math.floor(seededRandom(seed, 40) * engineChars.length)];

  // Status flags
  const rcExpired = validityDate < new Date();
  const isBlacklisted = seededRandom(seed, 50) > 0.92;
  const hasChallan = seededRandom(seed, 51) > 0.7;
  const isStolen = seededRandom(seed, 52) > 0.97;
  const isPUCValid = seededRandom(seed, 53) > 0.3;
  const isFitnessValid = seededRandom(seed, 54) > 0.2;

  // Financial
  const isFinanced = seededRandom(seed, 60) > 0.5;
  const financer = isFinanced ? pick(FINANCERS, seed, 61) : null;

  // Owner info
  const ownerName = pick(OWNER_NAMES, seed, 70);
  const city = rtoOffice.city !== "Unknown" ? rtoOffice.city : pick(CITIES, seed, 71);
  const street = pick(STREETS, seed, 72);
  const houseNum = Math.floor(seededRandom(seed, 73) * 500) + 1;
  const pincode = 100000 + Math.floor(seededRandom(seed, 74) * 899999);
  const phone = "9" + Math.floor(seededRandom(seed, 75) * 900000000 + 100000000).toString();

  // CC and seating
  const cc = mfgData.type === "Two Wheeler"
    ? pick([100, 110, 125, 150, 160, 200, 350, 400], seed, 80)
    : pick([799, 998, 1197, 1248, 1497, 1498, 1950, 1997, 2179, 2694], seed, 80);
  const seating = mfgData.type === "Two Wheeler" ? 2 : pick([4, 5, 7, 8], seed, 81);

  // Previous owners
  const numPrevOwners = Math.floor(seededRandom(seed, 90) * 3);
  const previousOwnership = Array.from({ length: numPrevOwners }, (_, i) => {
    const fromYear = regDate.getFullYear() + i * 3;
    const toYear = fromYear + 2 + Math.floor(seededRandom(seed, 91 + i) * 3);
    return {
      ownerName: pick(OWNER_NAMES, seed, 92 + i),
      fromDate: `${fromYear}-01-01`,
      toDate: `${toYear}-06-15`,
      transferType: pick(["Sale", "Sale", "Sale", "Gift"] as const, seed, 95 + i),
    };
  });

  // Accident history
  const numAccidents = seededRandom(seed, 100) > 0.7 ? Math.floor(seededRandom(seed, 101) * 2) + 1 : 0;

  // Build the nested structure
  return {
    registration: {
      number: reg,
      date: regDate.toISOString().split("T")[0],
      validity: validityDate.toISOString().split("T")[0],
      state: stateName,
      rtoOffice: rtoOffice.name,
      vehicleClass: vehicleClass,
    },
    owner: {
      name: ownerName,
      fatherName: pick(OWNER_NAMES, seed + 5, 76) + " " + pick(["Singh", "Sharma", "Kumar", "Gupta"], seed, 77),
      address: `${houseNum}, ${street}, ${city}, ${stateName} ${pincode}`,
      mobile: phone,
    },
    vehicle: {
      model: model,
      manufacturer: mfgData.manufacturer,
      type: mfgData.type,
      color: pick(COLORS, seed, 110),
      fuelType,
      engineNo: engineNumber,
      chassisNo: chassisNumber,
      cubicCapacity: cc,
      seatingCapacity: seating,
      manufactureYear: regDate.getFullYear(),
    },
    compliance: {
      rcStatus: rcExpired ? "Expired" : "Active",
      insuranceStatus: isInsuranceActive ? "Active" : "Expired",
      insuranceExpiry: insuranceExpiry.toISOString().split("T")[0],
      insuranceCompany: pick(["Digit Insurance", "Acko General Insurance", "ICICI Lombard", "HDFC ERGO", "Tata AIG"], seed, 111),
      pucStatus: isPUCValid ? "Valid" : "Expired",
      pucExpiry: new Date(Date.now() + (isPUCValid ? 90 : -30) * 24 * 3600 * 1000).toISOString().split("T")[0],
      fitnessStatus: isFitnessValid ? "Valid" : "Expired",
      fitnessExpiry: validityDate.toISOString().split("T")[0],
      roadTaxStatus: pick(["Paid", "Lifetime Tax Paid", "Pending"] as const, seed, 120),
      roadTaxPaidUpto: validityDate.toISOString().split("T")[0],
    },
    financial: {
      financed: isFinanced ? "Yes" : "No",
      financerName: financer || undefined,
      hypothecation: isFinanced ? `${financer} Bank` : "None",
      permitType: mfgData.type === "Commercial" ? "All India Permit" : "Private Vehicle",
      permitNumber: mfgData.type === "Commercial" ? `PERMIT-${reg}-AX` : undefined,
      permitValidity: mfgData.type === "Commercial" ? validityDate.toISOString().split("T")[0] : undefined,
    },
    safety: {
      blacklistStatus: isBlacklisted ? "Yes" : "No",
      challanPending: hasChallan ? "Yes" : "No",
      challanCount: hasChallan ? Math.floor(seededRandom(seed, 55) * 5) + 1 : 0,
      stolenStatus: isStolen ? "Yes" : "No",
      nocDetails: isBlacklisted ? "NOC Denied due to pending issues" : "Available",
    },
    history: {
      previousOwners: numPrevOwners + 1,
      lastTransferDate: previousOwnership.length > 0 ? previousOwnership[0].toDate : undefined,
      accidentHistory: numAccidents > 0 ? "Reported" : "None",
      ownershipChanges: previousOwnership.map(
        (o) => `${o.ownerName} (${o.fromDate} to ${o.toDate}) - ${o.transferType}`
      ),
    },
  };
}
