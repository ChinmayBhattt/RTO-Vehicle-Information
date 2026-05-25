"use client";

import React from "react";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen">
      <Sidebar />
      <div className="lg:pl-[260px] transition-all duration-300">
        <Header />
        <main className="p-4 lg:p-6 pb-24 lg:pb-6">{children}</main>
      </div>
    </div>
  );
}
