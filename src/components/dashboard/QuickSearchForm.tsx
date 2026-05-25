"use client";

import React from "react";
import Button from "@/components/ui/Button";

export default function QuickSearchForm() {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const input = form.elements.namedItem("reg") as HTMLInputElement;
        const val = input.value.trim().toUpperCase().replace(/\s+/g, "");
        if (val) {
          window.location.href = `/vehicle/${encodeURIComponent(val)}`;
        }
      }}
      className="flex flex-col sm:flex-row gap-3"
    >
      <input
        name="reg"
        type="text"
        placeholder="Enter registration number, e.g. MH12DE1433"
        className="flex-1 bg-white/[0.03] border border-white/[0.08] hover:border-white/[0.15] focus:border-cyan-400/40 rounded-xl px-4 py-3 text-white placeholder-gray-500 outline-none font-mono tracking-wider transition-all"
        required
      />
      <Button
        type="submit"
        className="bg-gradient-to-r from-cyan-400 to-violet-500 text-white font-semibold px-6 py-3 rounded-xl hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all cursor-pointer"
      >
        Search Vehicle
      </Button>
    </form>
  );
}
