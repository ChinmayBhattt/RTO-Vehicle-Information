"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Search,
  History,
  Bookmark,
  Settings,
  Shield,
  Users,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  Car,
  Sparkles,
} from "lucide-react";

interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
  adminOnly?: boolean;
}

const navItems: NavItem[] = [
  { href: "/", label: "Home", icon: Home },
  { href: "/dashboard", label: "Dashboard", icon: BarChart3 },
  { href: "/dashboard/history", label: "History", icon: History },
  { href: "/dashboard/saved", label: "Saved", icon: Bookmark },
];

const adminItems: NavItem[] = [
  { href: "/admin", label: "Admin", icon: Shield, adminOnly: true },
  { href: "/admin/users", label: "Users", icon: Users, adminOnly: true },
  {
    href: "/admin/analytics",
    label: "Analytics",
    icon: BarChart3,
    adminOnly: true,
  },
  {
    href: "/admin/settings",
    label: "API Settings",
    icon: Settings,
    adminOnly: true,
  },
];

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: isCollapsed ? 72 : 260 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className="hidden lg:flex flex-col fixed left-0 top-0 bottom-0 z-40
          bg-white/[0.02] backdrop-blur-2xl border-r border-white/[0.06]"
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 h-16 border-b border-white/[0.06]">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center flex-shrink-0">
            <Car className="w-5 h-5 text-white" />
          </div>
          <AnimatePresence>
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="font-bold text-lg text-gradient whitespace-nowrap"
              >
                VahanCheck
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto scrollbar-hide">
          <div className="space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.href}
                item={item}
                isActive={pathname === item.href}
                isCollapsed={isCollapsed}
              />
            ))}
          </div>

          {/* Admin Section */}
          <div className="pt-4 mt-4 border-t border-white/[0.06]">
            {!isCollapsed && (
              <p className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-wider text-gray-600">
                Admin
              </p>
            )}
            {adminItems.map((item) => (
              <NavLink
                key={item.href}
                item={item}
                isActive={pathname === item.href}
                isCollapsed={isCollapsed}
              />
            ))}
          </div>
        </nav>

        {/* Collapse Toggle */}
        <div className="p-3 border-t border-white/[0.06]">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-full flex items-center justify-center h-9 rounded-xl
              bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06]
              text-gray-400 hover:text-white transition-all duration-200 cursor-pointer"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </button>
        </div>
      </motion.aside>

      {/* Mobile Bottom Navigation */}
      <nav
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40
        bg-[#0a0a1a]/90 backdrop-blur-2xl border-t border-white/[0.08]
        flex items-center justify-around px-2 py-2 safe-area-inset-bottom"
      >
        {navItems.slice(0, 4).map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl
                transition-all duration-200 min-w-[60px]
                ${
                  isActive
                    ? "text-cyan-400"
                    : "text-gray-500 hover:text-gray-300"
                }
              `}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
              {isActive && (
                <motion.div
                  layoutId="mobile-nav-indicator"
                  className="absolute -top-px left-1/2 -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-cyan-400 to-violet-500 rounded-full"
                />
              )}
            </Link>
          );
        })}
      </nav>
    </>
  );
}

function NavLink({
  item,
  isActive,
  isCollapsed,
}: {
  item: NavItem;
  isActive: boolean;
  isCollapsed: boolean;
}) {
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      className={`
        relative flex items-center gap-3 px-3 h-10 rounded-xl
        transition-all duration-200 group
        ${
          isActive
            ? "bg-gradient-to-r from-cyan-400/10 to-violet-500/10 text-white"
            : "text-gray-400 hover:text-white hover:bg-white/[0.04]"
        }
        ${isCollapsed ? "justify-center" : ""}
      `}
      title={isCollapsed ? item.label : undefined}
    >
      {isActive && (
        <motion.div
          layoutId="sidebar-indicator"
          className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-gradient-to-b from-cyan-400 to-violet-500 rounded-full"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
      <Icon
        className={`w-[18px] h-[18px] flex-shrink-0 ${
          isActive ? "text-cyan-400" : ""
        }`}
      />
      <AnimatePresence>
        {!isCollapsed && (
          <motion.span
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -5 }}
            className="text-sm font-medium whitespace-nowrap"
          >
            {item.label}
          </motion.span>
        )}
      </AnimatePresence>
    </Link>
  );
}
