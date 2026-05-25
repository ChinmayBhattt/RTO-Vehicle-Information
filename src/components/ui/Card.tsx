"use client";

import React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";

interface CardProps extends HTMLMotionProps<"div"> {
  variant?: "glass" | "glass-strong" | "gradient-border" | "solid";
  hoverEffect?: boolean;
  glowColor?: "cyan" | "violet" | "blue" | "emerald" | "amber" | "red";
  padding?: "none" | "sm" | "md" | "lg" | "xl";
}

const variantStyles = {
  glass: "bg-white/[0.03] backdrop-blur-xl border border-white/[0.08]",
  "glass-strong": "bg-white/[0.06] backdrop-blur-2xl border border-white/[0.12]",
  "gradient-border": "bg-white/[0.03] backdrop-blur-xl gradient-border",
  solid: "bg-[#111827] border border-white/[0.08]",
};

const paddingStyles = {
  none: "",
  sm: "p-3",
  md: "p-5",
  lg: "p-6",
  xl: "p-8",
};

const glowStyles = {
  cyan: "hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]",
  violet: "hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]",
  blue: "hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]",
  emerald: "hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]",
  amber: "hover:shadow-[0_0_30px_rgba(245,158,11,0.15)]",
  red: "hover:shadow-[0_0_30px_rgba(239,68,68,0.15)]",
};

export default function Card({
  variant = "glass",
  hoverEffect = true,
  glowColor = "cyan",
  padding = "md",
  children,
  className = "",
  ...props
}: CardProps) {
  return (
    <motion.div
      className={`
        rounded-2xl transition-all duration-250
        ${variantStyles[variant]}
        ${paddingStyles[padding]}
        ${hoverEffect ? `hover:bg-white/[0.06] hover:border-white/[0.15] ${glowStyles[glowColor]}` : ""}
        ${className}
      `}
      {...props}
    >
      {children}
    </motion.div>
  );
}
