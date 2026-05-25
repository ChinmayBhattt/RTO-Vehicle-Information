'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Shield, Globe, Zap, Database, Camera } from 'lucide-react';
import NumberPlateScanner from '@/components/ocr/NumberPlateScanner';

const placeholders = [
  'Enter vehicle number, e.g. RJ27AB1234',
  'Try MH12DE1433',
  'Search DL01CA0001',
  'Enter KA09MA1234',
  'Try GJ05BX7890',
];

const trustBadges = [
  { icon: Zap, label: '10M+ Searches', color: 'text-cyan-400' },
  { icon: Globe, label: '36 States', color: 'text-violet-400' },
  { icon: Shield, label: '99.9% Uptime', color: 'text-emerald-400' },
  { icon: Database, label: 'Govt. Data', color: 'text-amber-400' },
];

export default function HeroSection() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [placeholderIdx, setPlaceholderIdx] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const [isScannerOpen, setIsScannerOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIdx((prev) => (prev + 1) % placeholders.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = query.trim().toUpperCase().replace(/\s+/g, '');
    if (cleaned) {
      router.push(`/vehicle/${encodeURIComponent(cleaned)}`);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a1a]">
      {/* Animated gradient mesh background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a1a] via-[#111827] to-[#0d1117]" />
        <motion.div
          className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-cyan-500/10 blur-[120px]"
          animate={{ x: [0, 60, 0], y: [0, -40, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-violet-500/10 blur-[120px]"
          animate={{ x: [0, -60, 0], y: [0, 40, 0], scale: [1, 1.3, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-blue-500/5 blur-[150px]"
          animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Floating decorative orbs */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-cyan-400/30"
          style={{
            top: `${20 + i * 15}%`,
            left: `${10 + i * 18}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            delay: i * 0.8,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full bg-white/[0.04] border border-white/[0.08] text-sm text-gray-400"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
            </span>
            Trusted by over 10 million users across India
          </motion.div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            <span className="text-white">Vehicle Information</span>
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500">
              at Your Fingertips
            </span>
          </h1>

          {/* Subheading */}
          <motion.p
            className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Instant access to comprehensive vehicle registration details across India.
            <br className="hidden sm:block" /> Fast, secure, and always up-to-date.
          </motion.p>
        </motion.div>

        {/* Search Bar */}
        <motion.form
          onSubmit={handleSubmit}
          className="relative max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className={`relative flex items-center h-[60px] sm:h-[68px] rounded-2xl transition-all duration-500 ${
              isFocused
                ? 'bg-white/[0.06] border-cyan-400/40 shadow-[0_0_30px_rgba(6,182,212,0.15)]'
                : 'bg-white/[0.03] border-white/[0.08]'
            } border backdrop-blur-xl`}
          >
            <Search className="absolute left-5 w-5 h-5 text-gray-500" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value.toUpperCase())}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="w-full h-full bg-transparent pl-14 pr-44 sm:pr-52 text-white text-lg font-mono placeholder-gray-600 outline-none tracking-wider"
              aria-label="Vehicle registration number"
            />
            {/* Animated placeholder */}
            {!query && !isFocused && (
              <div className="absolute left-14 top-1/2 -translate-y-1/2 pointer-events-none">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={placeholderIdx}
                    className="text-gray-600 text-lg font-mono"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {placeholders[placeholderIdx]}
                  </motion.span>
                </AnimatePresence>
              </div>
            )}
            <button
              type="button"
              onClick={() => setIsScannerOpen(true)}
              className="absolute right-28 sm:right-36 w-9 h-9 rounded-xl bg-white/[0.05] border border-white/[0.08] hover:bg-white/[0.1] hover:text-white text-gray-400 flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95"
              title="OCR plate scan"
            >
              <Camera className="w-4 h-4" />
            </button>
            <button
              type="submit"
              className="absolute right-2 h-[calc(100%-12px)] px-6 sm:px-8 rounded-xl bg-gradient-to-r from-cyan-400 to-violet-500 text-white font-semibold text-sm sm:text-base hover:shadow-[0_0_25px_rgba(6,182,212,0.4)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              Search
            </button>
          </div>
        </motion.form>

        {/* Scanner Modal */}
        <AnimatePresence>
          {isScannerOpen && (
            <NumberPlateScanner
              onScanSuccess={(detectedNum) => {
                setQuery(detectedNum);
                setIsScannerOpen(false);
                router.push(`/vehicle/${encodeURIComponent(detectedNum)}`);
              }}
              onClose={() => setIsScannerOpen(false)}
            />
          )}
        </AnimatePresence>
 
        {/* Trust Badges */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-6 sm:gap-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          {trustBadges.map((badge, i) => (
            <motion.div
              key={badge.label}
              className="flex items-center gap-2 text-sm text-gray-500"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 + i * 0.1, duration: 0.5 }}
            >
              <badge.icon className={`w-4 h-4 ${badge.color}`} />
              <span>{badge.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
 
      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a1a] to-transparent" />
    </section>
  );
}
