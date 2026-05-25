"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface AccordionItem {
  id: string;
  title: string;
  content: string | React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  className?: string;
}

export default function Accordion({
  items,
  allowMultiple = false,
  className = "",
}: AccordionProps) {
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(allowMultiple ? prev : []);
      if (prev.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {items.map((item) => {
        const isOpen = openIds.has(item.id);
        return (
          <div
            key={item.id}
            className={`
              rounded-2xl border transition-all duration-300
              ${
                isOpen
                  ? "bg-white/[0.04] border-white/[0.1] shadow-[0_0_20px_rgba(6,182,212,0.05)]"
                  : "bg-white/[0.02] border-white/[0.06] hover:border-white/[0.1]"
              }
            `}
          >
            <button
              onClick={() => toggle(item.id)}
              className="w-full flex items-center justify-between px-5 py-4 text-left cursor-pointer"
              aria-expanded={isOpen}
            >
              <span
                className={`text-sm font-medium transition-colors duration-200 ${
                  isOpen ? "text-white" : "text-gray-300"
                }`}
              >
                {item.title}
              </span>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown
                  className={`w-4 h-4 transition-colors duration-200 ${
                    isOpen ? "text-cyan-400" : "text-gray-500"
                  }`}
                />
              </motion.div>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-4 text-sm text-gray-400 leading-relaxed">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
