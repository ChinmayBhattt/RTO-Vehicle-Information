'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Search, MapPin, Target, Clock } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface StatItem {
  icon: LucideIcon;
  value: number;
  suffix: string;
  label: string;
  gradient: string;
}

const stats: StatItem[] = [
  { icon: Search, value: 10, suffix: 'M+', label: 'Searches', gradient: 'from-cyan-400 to-blue-500' },
  { icon: MapPin, value: 36, suffix: '', label: 'States Covered', gradient: 'from-violet-400 to-purple-500' },
  { icon: Target, value: 99.9, suffix: '%', label: 'Accuracy', gradient: 'from-emerald-400 to-teal-500' },
  { icon: Clock, value: 24, suffix: '/7', label: 'Available', gradient: 'from-amber-400 to-orange-500' },
];

function AnimatedCounter({
  value,
  suffix,
  isInView,
}: {
  value: number;
  suffix: string;
  isInView: boolean;
}) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000;
    const steps = 60;
    const stepTime = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Number((value * eased).toFixed(value % 1 !== 0 ? 1 : 0)));
      if (step >= steps) {
        setDisplay(value);
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span className="font-mono text-4xl sm:text-5xl font-bold text-white tabular-nums">
      {display}
      {suffix}
    </span>
  );
}

export default function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="relative py-20 sm:py-28 bg-[#0a0a1a]">
      {/* Background accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] bg-cyan-500/5 blur-[120px] rounded-full" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6" ref={ref}>
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="relative p-6 sm:p-8 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] text-center group overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
              whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
            >
              {/* Gradient border glow on hover */}
              <div
                className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
              />
              {/* Top gradient line */}
              <div
                className={`absolute top-0 left-4 right-4 h-px bg-gradient-to-r ${stat.gradient} opacity-30`}
              />

              <div className="relative">
                <stat.icon
                  className={`w-6 h-6 mx-auto mb-4 bg-clip-text text-transparent`}
                  style={{ color: 'rgba(6,182,212,0.6)' }}
                />
                <div className="mb-2">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} isInView={isInView} />
                </div>
                <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
