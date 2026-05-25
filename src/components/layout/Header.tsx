"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Bell,
  User,
  LogOut,
  Settings,
  Command,
  X,
} from "lucide-react";
import Link from "next/link";

export default function Header() {
  const [searchValue, setSearchValue] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Keyboard shortcut: Ctrl+K / ⌘K to focus search
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        searchRef.current?.focus();
      }
      if (e.key === "Escape") {
        searchRef.current?.blur();
        setIsSearchFocused(false);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const formatted = searchValue.toUpperCase().replace(/\s/g, "");
    if (formatted.length >= 6) {
      router.push(`/vehicle/${formatted}`);
      setSearchValue("");
      setIsSearchFocused(false);
    }
  };

  return (
    <header
      className="sticky top-0 z-30 w-full
      bg-[#0a0a1a]/70 backdrop-blur-2xl border-b border-white/[0.06]"
    >
      <div className="flex items-center gap-4 h-16 px-4 lg:px-6">
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex-1 max-w-xl relative">
          <div
            className={`
              flex items-center gap-2 h-10 px-3 rounded-xl
              bg-white/[0.04] border transition-all duration-200
              ${
                isSearchFocused
                  ? "border-cyan-400/50 shadow-[0_0_15px_rgba(6,182,212,0.1)]"
                  : "border-white/[0.08]"
              }
            `}
          >
            <Search className="w-4 h-4 text-gray-500 flex-shrink-0" />
            <input
              ref={searchRef}
              type="text"
              value={searchValue}
              onChange={(e) =>
                setSearchValue(e.target.value.toUpperCase())
              }
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() =>
                setTimeout(() => setIsSearchFocused(false), 150)
              }
              placeholder="Search vehicle number..."
              className="flex-1 bg-transparent text-sm text-white placeholder:text-gray-500
                focus:outline-none font-mono tracking-wider"
              aria-label="Search vehicle registration number"
            />
            <kbd
              className="hidden sm:flex items-center gap-0.5 px-1.5 py-0.5
              bg-white/[0.06] border border-white/[0.1] rounded text-[10px]
              text-gray-500 font-mono"
            >
              <Command className="w-2.5 h-2.5" />K
            </kbd>
          </div>
        </form>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* Notifications */}
          <button
            className="relative w-9 h-9 flex items-center justify-center rounded-xl
              bg-white/[0.04] border border-white/[0.08] text-gray-400
              hover:text-white hover:bg-white/[0.08] transition-all duration-200 cursor-pointer"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span
              className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full
              bg-cyan-400 ring-2 ring-[#0a0a1a]"
            />
          </button>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 h-9 pl-1 pr-3 rounded-xl
                bg-white/[0.04] border border-white/[0.08]
                hover:bg-white/[0.08] transition-all duration-200 cursor-pointer"
              aria-label="User menu"
            >
              <div
                className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-400 to-violet-500
                flex items-center justify-center"
              >
                <User className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="hidden sm:block text-sm text-gray-300">
                Guest
              </span>
            </button>

            {/* Dropdown */}
            <AnimatePresence>
              {showUserMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 5, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 5, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-12 w-48
                    bg-[#111827]/95 backdrop-blur-2xl border border-white/[0.1]
                    rounded-xl shadow-2xl overflow-hidden"
                >
                  <Link
                    href="/login"
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-300
                      hover:bg-white/[0.05] hover:text-white transition-colors"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <User className="w-4 h-4" />
                    Sign In
                  </Link>
                  <Link
                    href="/signup"
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-300
                      hover:bg-white/[0.05] hover:text-white transition-colors"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <Settings className="w-4 h-4" />
                    Create Account
                  </Link>
                  <div className="border-t border-white/[0.06]" />
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-300
                      hover:bg-white/[0.05] hover:text-white transition-colors"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <Settings className="w-4 h-4" />
                    Dashboard
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
}
