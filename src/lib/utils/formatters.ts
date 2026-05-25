/**
 * Formatting Utilities
 *
 * Functions for formatting dates, masking sensitive data, and display formatting.
 */

/**
 * Formats a date string or Date object into a readable format.
 */
export function formatDate(date: Date | string | null | undefined): string {
  if (!date) return "N/A";
  const d = typeof date === "string" ? new Date(date) : date;
  if (isNaN(d.getTime())) return "N/A";
  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

/**
 * Masks a phone number, showing only the last 4 digits.
 * Example: "9876543210" → "******3210"
 */
export function maskPhoneNumber(phone: string | null | undefined): string {
  if (!phone) return "N/A";
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.length < 4) return "****";
  return "●●●●●●" + cleaned.slice(-4);
}

/**
 * Masks an address, showing only the city/state.
 * Example: "123, Main Street, Sector 5, Jaipur, Rajasthan 302001"
 *        → "●●●●●●, Jaipur, Rajasthan"
 */
export function maskAddress(address: string | null | undefined): string {
  if (!address) return "N/A";
  const parts = address.split(",").map((p) => p.trim());
  if (parts.length <= 2) return "●●●●●●, " + parts[parts.length - 1];
  // Show last 2 parts (city/state) and mask the rest
  const visible = parts.slice(-2).join(", ");
  return `●●●●●●, ${visible}`;
}

/**
 * Formats a registration number with standard spacing.
 * Example: "MH12AB1234" → "MH 12 AB 1234"
 */
export function formatRegistrationNumber(num: string): string {
  if (!num) return "";
  const cleaned = num.toUpperCase().replace(/[\s\-\.]/g, "");
  const match = cleaned.match(/^([A-Z]{2})(\d{1,2})([A-Z]{1,3})(\d{1,4})$/);
  if (!match) return cleaned;
  const [, state, rto, series, number] = match;
  return `${state} ${rto.padStart(2, "0")} ${series} ${number.padStart(4, "0")}`;
}

/**
 * Calculates vehicle age from registration date.
 */
export function calculateVehicleAge(regDate: string | Date): string {
  if (!regDate) return "N/A";
  const d = typeof regDate === "string" ? new Date(regDate) : regDate;
  if (isNaN(d.getTime())) return "N/A";

  const now = new Date();
  let years = now.getFullYear() - d.getFullYear();
  let months = now.getMonth() - d.getMonth();

  if (months < 0) {
    years--;
    months += 12;
  }

  if (years === 0) {
    return months <= 1 ? "< 1 month" : `${months} months`;
  }
  if (months === 0) {
    return years === 1 ? "1 year" : `${years} years`;
  }
  return `${years} year${years > 1 ? "s" : ""}, ${months} month${months > 1 ? "s" : ""}`;
}

/**
 * Formats a number with Indian-style comma separation.
 * Example: 1234567 → "12,34,567"
 */
export function formatIndianNumber(num: number): string {
  const str = num.toString();
  const lastThree = str.slice(-3);
  const rest = str.slice(0, -3);
  if (!rest) return lastThree;
  return rest.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + lastThree;
}
