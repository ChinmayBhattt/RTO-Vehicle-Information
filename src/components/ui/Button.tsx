"use client";

import React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";

type ButtonVariant = "gradient" | "glass" | "outline" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg" | "xl";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "size" | "children"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  children?: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  gradient:
    "bg-gradient-to-r from-cyan-400 to-violet-500 text-white hover:shadow-[0_0_30px_rgba(6,182,212,0.3)] hover:scale-[1.02] active:scale-[0.98]",
  glass:
    "bg-white/[0.05] backdrop-blur-xl border border-white/[0.1] text-white hover:bg-white/[0.1] hover:border-white/[0.2]",
  outline:
    "bg-transparent border border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10 hover:border-cyan-400",
  ghost:
    "bg-transparent text-gray-300 hover:bg-white/[0.05] hover:text-white",
  danger:
    "bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 hover:border-red-500/50",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-xs rounded-lg gap-1.5",
  md: "px-4 py-2 text-sm rounded-xl gap-2",
  lg: "px-6 py-3 text-base rounded-xl gap-2.5",
  xl: "px-8 py-4 text-lg rounded-2xl gap-3",
};

export default function Button({
  variant = "gradient",
  size = "md",
  isLoading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  children,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      className={`
        inline-flex items-center justify-center font-semibold
        transition-all duration-250 cursor-pointer
        disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <svg
          className="animate-spin h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      ) : (
        leftIcon
      )}
      {children}
      {rightIcon && !isLoading && rightIcon}
    </motion.button>
  );
}
