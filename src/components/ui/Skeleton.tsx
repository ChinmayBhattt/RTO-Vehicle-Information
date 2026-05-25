"use client";

import React from "react";

interface SkeletonProps {
  className?: string;
  variant?: "text" | "circular" | "rectangular" | "card";
  width?: string;
  height?: string;
  lines?: number;
}

export default function Skeleton({
  className = "",
  variant = "text",
  width,
  height,
  lines = 1,
}: SkeletonProps) {
  const baseClasses = "skeleton";

  if (variant === "card") {
    return (
      <div
        className={`bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-6 ${className}`}
      >
        <div className={`${baseClasses} h-5 w-2/5 mb-4`} />
        <div className={`${baseClasses} h-4 w-full mb-3`} />
        <div className={`${baseClasses} h-4 w-4/5 mb-3`} />
        <div className={`${baseClasses} h-4 w-3/5`} />
      </div>
    );
  }

  if (variant === "circular") {
    return (
      <div
        className={`${baseClasses} rounded-full ${className}`}
        style={{
          width: width || "40px",
          height: height || "40px",
        }}
      />
    );
  }

  if (variant === "rectangular") {
    return (
      <div
        className={`${baseClasses} rounded-xl ${className}`}
        style={{
          width: width || "100%",
          height: height || "120px",
        }}
      />
    );
  }

  // Text variant - can render multiple lines
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={`${baseClasses} h-4`}
          style={{
            width:
              width || (i === lines - 1 && lines > 1 ? "60%" : "100%"),
            height: height,
          }}
        />
      ))}
    </div>
  );
}

/** Skeleton specifically for vehicle detail cards */
export function VehicleDetailSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header skeleton */}
      <div className="flex items-center gap-4">
        <div className="skeleton h-8 w-8 rounded-lg" />
        <div className="skeleton h-8 w-48" />
      </div>

      {/* Card groups skeleton */}
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-6"
        >
          <div className="skeleton h-5 w-40 mb-5" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, j) => (
              <div key={j} className="space-y-1.5">
                <div className="skeleton h-3 w-24" />
                <div className="skeleton h-5 w-36" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/** Skeleton for search results loading */
export function SearchSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-5 flex items-center gap-4"
        >
          <div className="skeleton h-12 w-12 rounded-xl" />
          <div className="flex-1 space-y-2">
            <div className="skeleton h-5 w-40" />
            <div className="skeleton h-4 w-64" />
          </div>
          <div className="skeleton h-8 w-20 rounded-lg" />
        </div>
      ))}
    </div>
  );
}
