"use client";

import React, { useState } from "react";
import { Copy, Check } from "lucide-react";
import { StatusBadge } from "@/components/ui/Badge";

interface InfoFieldProps {
  label: string;
  value: string | number | null | undefined;
  isMasked?: boolean;
  isStatus?: boolean;
  isMono?: boolean;
  copyable?: boolean;
  className?: string;
}

export default function InfoField({
  label,
  value,
  isMasked = false,
  isStatus = false,
  isMono = false,
  copyable = false,
  className = "",
}: InfoFieldProps) {
  const [copied, setCopied] = useState(false);

  const displayValue = value?.toString() || "N/A";

  const handleCopy = async () => {
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value.toString());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API not available
    }
  };

  return (
    <div className={`group ${className}`}>
      <dt className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
        {label}
      </dt>
      <dd className="flex items-center gap-2">
        {isStatus ? (
          <StatusBadge status={displayValue} />
        ) : (
          <span
            className={`text-sm ${
              isMono ? "font-mono tracking-wider" : ""
            } ${
              isMasked ? "text-gray-400" : "text-white"
            } ${
              displayValue === "N/A" ? "text-gray-600 italic" : ""
            }`}
          >
            {displayValue}
          </span>
        )}
        {copyable && value && (
          <button
            onClick={handleCopy}
            className="opacity-0 group-hover:opacity-100 p-1 rounded-md
              hover:bg-white/[0.06] text-gray-500 hover:text-white
              transition-all duration-200 cursor-pointer"
            aria-label={`Copy ${label}`}
          >
            {copied ? (
              <Check className="w-3 h-3 text-emerald-400" />
            ) : (
              <Copy className="w-3 h-3" />
            )}
          </button>
        )}
      </dd>
    </div>
  );
}
