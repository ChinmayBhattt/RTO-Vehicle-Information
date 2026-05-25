'use client';

import { motion } from 'framer-motion';
import { Keyboard, CheckCircle, Eye, ArrowRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface Step {
  number: string;
  icon: LucideIcon;
  title: string;
  description: string;
  gradient: string;
}

const steps: Step[] = [
  {
    number: '01',
    icon: Keyboard,
    title: 'Enter Number',
    description:
      'Type the vehicle registration number in the search bar. We support all Indian RTO formats.',
    gradient: 'from-cyan-400 to-blue-500',
  },
  {
    number: '02',
    icon: CheckCircle,
    title: 'Verify Details',
    description:
      'We fetch and verify the information from official government databases in real-time.',
    gradient: 'from-violet-400 to-purple-500',
  },
  {
    number: '03',
    icon: Eye,
    title: 'View Report',
    description:
      'Get a comprehensive report with registration, insurance, owner, and compliance details.',
    gradient: 'from-emerald-400 to-teal-500',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2, delayChildren: 0.1 },
  },
};

const stepVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function HowItWorks() {
  return (
    <section className="relative py-24 sm:py-32 bg-[#0a0a1a]">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-violet-500/5 blur-[150px] rounded-full" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <motion.div
          className="text-center mb-16 sm:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-violet-500">
              How It Works
            </span>
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Three simple steps to get complete vehicle information
          </p>
        </motion.div>

        {/* Steps */}
        <motion.div
          className="relative flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-0"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {steps.map((step, i) => (
            <div key={step.number} className="flex flex-col lg:flex-row items-center flex-1">
              <motion.div
                variants={stepVariants}
                className="relative flex flex-col items-center text-center max-w-xs"
              >
                {/* Number badge */}
                <span
                  className={`text-xs font-mono font-bold tracking-widest mb-4 bg-clip-text text-transparent bg-gradient-to-r ${step.gradient}`}
                >
                  STEP {step.number}
                </span>

                {/* Icon circle */}
                <motion.div
                  className={`relative w-20 h-20 rounded-2xl bg-gradient-to-br ${step.gradient} p-[1px] mb-6`}
                  whileHover={{ scale: 1.05, rotate: 3 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-full h-full rounded-2xl bg-[#0a0a1a] flex items-center justify-center">
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                </motion.div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>

                {/* Description */}
                <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>
              </motion.div>

              {/* Connecting arrow (hidden on mobile) */}
              {i < steps.length - 1 && (
                <motion.div
                  className="hidden lg:flex items-center justify-center flex-shrink-0 mx-6 mt-16"
                  variants={stepVariants}
                >
                  <div className="w-16 h-px bg-gradient-to-r from-white/20 to-white/5" />
                  <ArrowRight className="w-4 h-4 text-white/20 -ml-1" />
                </motion.div>
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
