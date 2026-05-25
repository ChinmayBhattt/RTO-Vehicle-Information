/**
 * Input Validation Utilities
 *
 * Validation functions for registration numbers, email, passwords, and other inputs.
 * All validators return structured results with error messages.
 */

import { VALID_STATE_CODES } from "@/lib/constants/rtoData";
import { AUTH } from "@/lib/constants/config";

// ─── Registration Number Validation ──────────────────────────────────────────

/**
 * Indian vehicle registration number format:
 * - 2 letters (state code) + 2 digits (RTO code) + 1-2 letters (series) + 4 digits (number)
 * Examples: MH12AB1234, DL01C1234, KA09MA9999
 */
const REGISTRATION_REGEX = /^([A-Z]{2})\s*(\d{1,2})\s*([A-Z]{1,3})\s*(\d{1,4})$/;

export interface ValidationResult {
  valid: boolean;
  formatted: string;
  error?: string;
}

/**
 * Validates and formats an Indian vehicle registration number.
 * Accepts various input formats (with/without spaces, lowercase).
 */
export function validateRegistrationNumber(num: string): ValidationResult {
  if (!num || typeof num !== "string") {
    return { valid: false, formatted: "", error: "Registration number is required" };
  }

  // Normalize: uppercase, remove spaces/dashes
  const cleaned = num.toUpperCase().replace(/[\s\-\.]/g, "");

  if (cleaned.length < 5 || cleaned.length > 11) {
    return {
      valid: false,
      formatted: cleaned,
      error: "Registration number must be between 5 and 11 characters",
    };
  }

  const match = cleaned.match(REGISTRATION_REGEX);
  if (!match) {
    return {
      valid: false,
      formatted: cleaned,
      error: "Invalid registration number format. Expected format: XX00XX0000 (e.g., MH12AB1234)",
    };
  }

  const [, stateCode, rtoCode, series, number] = match;

  // Validate state code against known codes
  if (!VALID_STATE_CODES.includes(stateCode)) {
    return {
      valid: false,
      formatted: cleaned,
      error: `Invalid state code: ${stateCode}. Must be a valid Indian state/UT code.`,
    };
  }

  // Format with proper spacing: XX 00 XX 0000
  const padRto = rtoCode.padStart(2, "0");
  const padNum = number.padStart(4, "0");
  const formatted = `${stateCode}${padRto}${series}${padNum}`;

  return { valid: true, formatted };
}

// ─── Email Validation ────────────────────────────────────────────────────────

/**
 * RFC 5322-aligned email regex (simplified but practical).
 */
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

export function validateEmail(email: string): ValidationResult {
  if (!email || typeof email !== "string") {
    return { valid: false, formatted: "", error: "Email is required" };
  }

  const trimmed = email.trim().toLowerCase();

  if (trimmed.length > 254) {
    return { valid: false, formatted: trimmed, error: "Email is too long" };
  }

  if (!EMAIL_REGEX.test(trimmed)) {
    return { valid: false, formatted: trimmed, error: "Invalid email format" };
  }

  return { valid: true, formatted: trimmed };
}

// ─── Password Validation ─────────────────────────────────────────────────────

export interface PasswordStrength {
  valid: boolean;
  score: number; // 0-4
  feedback: string[];
}

/**
 * Checks password strength and returns actionable feedback.
 * Score: 0 = very weak, 1 = weak, 2 = fair, 3 = strong, 4 = very strong
 */
export function checkPasswordStrength(password: string): PasswordStrength {
  const feedback: string[] = [];
  let score = 0;

  if (!password || typeof password !== "string") {
    return { valid: false, score: 0, feedback: ["Password is required"] };
  }

  if (password.length < AUTH.MIN_PASSWORD_LENGTH) {
    feedback.push(`Password must be at least ${AUTH.MIN_PASSWORD_LENGTH} characters`);
  } else {
    score += 1;
  }

  if (password.length > AUTH.MAX_PASSWORD_LENGTH) {
    feedback.push(`Password must be at most ${AUTH.MAX_PASSWORD_LENGTH} characters`);
    return { valid: false, score: 0, feedback };
  }

  // Check for uppercase
  if (/[A-Z]/.test(password)) {
    score += 1;
  } else {
    feedback.push("Add at least one uppercase letter");
  }

  // Check for lowercase
  if (/[a-z]/.test(password)) {
    score += 1;
  } else {
    feedback.push("Add at least one lowercase letter");
  }

  // Check for numbers
  if (/\d/.test(password)) {
    score += 1;
  } else {
    feedback.push("Add at least one number");
  }

  // Check for special characters
  if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]/.test(password)) {
    score += 1;
  } else {
    feedback.push("Add at least one special character");
  }

  // Cap score at 4
  score = Math.min(score, 4);

  // Password is valid if it meets min length and has at least score 2
  const valid = password.length >= AUTH.MIN_PASSWORD_LENGTH && score >= 2;

  if (feedback.length === 0) {
    feedback.push("Password is strong");
  }

  return { valid, score, feedback };
}

// ─── Name Validation ─────────────────────────────────────────────────────────

export function validateName(name: string): ValidationResult {
  if (!name || typeof name !== "string") {
    return { valid: false, formatted: "", error: "Name is required" };
  }

  const trimmed = name.trim();

  if (trimmed.length < 2) {
    return { valid: false, formatted: trimmed, error: "Name must be at least 2 characters" };
  }

  if (trimmed.length > 100) {
    return { valid: false, formatted: trimmed, error: "Name must be at most 100 characters" };
  }

  // Only allow letters, spaces, hyphens, and apostrophes
  if (!/^[a-zA-Z\s\-'\.]+$/.test(trimmed)) {
    return { valid: false, formatted: trimmed, error: "Name contains invalid characters" };
  }

  return { valid: true, formatted: trimmed };
}

// ─── Pagination Validation ───────────────────────────────────────────────────

export function validatePagination(
  page: unknown,
  pageSize: unknown
): { page: number; pageSize: number } {
  const p = typeof page === "number" ? page : parseInt(String(page || "1"), 10);
  const ps = typeof pageSize === "number" ? pageSize : parseInt(String(pageSize || "10"), 10);

  return {
    page: isNaN(p) || p < 1 ? 1 : p,
    pageSize: isNaN(ps) || ps < 1 ? 10 : Math.min(ps, 50),
  };
}
