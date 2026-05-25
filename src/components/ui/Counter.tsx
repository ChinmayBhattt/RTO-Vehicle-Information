"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";

interface CounterProps {
  /** The target number to count to */
  target: number;
  /** Suffix like '+', '%', etc. */
  suffix?: string;
  /** Prefix like '$', '₹', etc. */
  prefix?: string;
  /** Duration in seconds */
  duration?: number;
  /** Decimal places to show */
  decimals?: number;
  /** Additional className */
  className?: string;
}

export default function Counter({
  target,
  suffix = "",
  prefix = "",
  duration = 2,
  decimals = 0,
  className = "",
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const motionValue = useMotionValue(0);
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    if (isInView) {
      const controls = animate(motionValue, target, {
        duration,
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (latest) => {
          setDisplayValue(
            latest.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          );
        },
      });

      return () => controls.stop();
    }
  }, [isInView, target, duration, decimals, motionValue]);

  return (
    <motion.span
      ref={ref}
      className={`font-mono tabular-nums ${className}`}
      initial={{ opacity: 0, y: 10 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
    >
      {prefix}
      {displayValue}
      {suffix}
    </motion.span>
  );
}
