'use client';

import { motion } from 'framer-motion';
import { Search, Database, Shield, History, FileText, Lock } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient: string;
  glow: string;
}

const features: Feature[] = [
  {
    icon: Search,
    title: 'Instant Lookup',
    description:
      'Get complete vehicle details in under 2 seconds. Just enter the registration number and we handle the rest.',
    gradient: 'from-cyan-400 to-blue-500',
    glow: 'group-hover:shadow-[0_0_30px_rgba(6,182,212,0.2)]',
  },
  {
    icon: Database,
    title: 'Comprehensive Data',
    description:
      'Access owner details, insurance status, fitness, PUC, challans, loan info, and more — all in one place.',
    gradient: 'from-violet-400 to-purple-500',
    glow: 'group-hover:shadow-[0_0_30px_rgba(139,92,246,0.2)]',
  },
  {
    icon: Shield,
    title: 'Privacy First',
    description:
      'Your searches are encrypted and never shared. Sensitive information is masked for privacy protection.',
    gradient: 'from-emerald-400 to-teal-500',
    glow: 'group-hover:shadow-[0_0_30px_rgba(52,211,153,0.2)]',
  },
  {
    icon: History,
    title: 'Search History',
    description:
      'Access your past searches anytime. Track and revisit previous lookups with a single click.',
    gradient: 'from-amber-400 to-orange-500',
    glow: 'group-hover:shadow-[0_0_30px_rgba(251,191,36,0.2)]',
  },
  {
    icon: FileText,
    title: 'PDF Reports',
    description:
      'Generate professional PDF reports of vehicle details. Perfect for documentation and record keeping.',
    gradient: 'from-blue-400 to-indigo-500',
    glow: 'group-hover:shadow-[0_0_30px_rgba(96,165,250,0.2)]',
  },
  {
    icon: Lock,
    title: 'Secure & Encrypted',
    description:
      'Bank-grade encryption protects all data in transit and at rest. Your information stays safe with us.',
    gradient: 'from-rose-400 to-pink-500',
    glow: 'group-hover:shadow-[0_0_30px_rgba(251,113,133,0.2)]',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function FeaturesSection() {
  return (
    <section className="relative py-24 sm:py-32 bg-[#0a0a1a]">
      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-violet-500/5 blur-[150px] rounded-full" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section heading */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-violet-500">
              Powerful Features
            </span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Everything you need to look up and manage vehicle information across India
          </p>
        </motion.div>

        {/* Feature cards grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={cardVariants}
              className={`group relative p-6 sm:p-8 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] hover:border-white/[0.15] transition-all duration-500 ${feature.glow}`}
              whileHover={{ y: -4, transition: { duration: 0.3 } }}
            >
              {/* Icon */}
              <div
                className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} mb-5`}
              >
                <feature.icon className="w-6 h-6 text-white" />
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-white mb-3">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-gray-500 leading-relaxed text-sm">
                {feature.description}
              </p>

              {/* Hover gradient line */}
              <div
                className={`absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-40 transition-opacity duration-500`}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
