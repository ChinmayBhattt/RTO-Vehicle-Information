"use client";

import React from "react";

type BadgeVariant = "active" | "expired" | "warning" | "info" | "neutral";
type BadgeSize = "sm" | "md";

interface BadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  active: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30",
  expired: "bg-red-500/15 text-red-400 border border-red-500/30",
  warning: "bg-amber-500/15 text-amber-400 border border-amber-500/30",
  info: "bg-blue-500/15 text-blue-400 border border-blue-500/30",
  neutral: "bg-white/[0.05] text-gray-400 border border-white/[0.1]",
};

const dotColors: Record<BadgeVariant, string> = {
  active: "bg-emerald-400",
  expired: "bg-red-400",
  warning: "bg-amber-400",
  info: "bg-blue-400",
  neutral: "bg-gray-400",
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: "px-2 py-0.5 text-[10px]",
  md: "px-2.5 py-1 text-xs",
};

export default function Badge({
  variant = "neutral",
  size = "md",
  dot = false,
  children,
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center gap-1.5 font-medium rounded-full
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
    >
      {dot && (
        <span
          className={`w-1.5 h-1.5 rounded-full ${dotColors[variant]} animate-pulse`}
        />
      )}
      {children}
    </span>
  );
}

/** Convenience component for vehicle status fields */
export function StatusBadge({
  status,
  className,
}: {
  status: string;
  className?: string;
}) {
  const normalizedStatus = status.toLowerCase();

  let variant: BadgeVariant = "neutral";
  if (
    normalizedStatus.includes("active") ||
    normalizedStatus.includes("valid") ||
    normalizedStatus.includes("clear") ||
    normalizedStatus.includes("compliant") ||
    normalizedStatus.includes("none") ||
    normalizedStatus.includes("no ")
  ) {
    variant = "active";
  } else if (
    normalizedStatus.includes("expired") ||
    normalizedStatus.includes("invalid") ||
    normalizedStatus.includes("blacklisted") ||
    normalizedStatus.includes("stolen") ||
    normalizedStatus.includes("pending challans")
  ) {
    variant = "expired";
  } else if (
    normalizedStatus.includes("pending") ||
    normalizedStatus.includes("due") ||
    normalizedStatus.includes("warning") ||
    normalizedStatus.includes("expiring")
  ) {
    variant = "warning";
  } else if (
    normalizedStatus.includes("info") ||
    normalizedStatus.includes("financed")
  ) {
    variant = "info";
  }

  return (
    <Badge variant={variant} dot className={className}>
      {status}
    </Badge>
  );
}
