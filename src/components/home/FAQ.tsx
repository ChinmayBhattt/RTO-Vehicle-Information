'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: 'Where does the vehicle data come from?',
    answer:
      'Our data is sourced directly from official government databases including the Ministry of Road Transport and Highways (MoRTH) VAHAN portal. We aggregate information from all 36 states and union territories to provide comprehensive and accurate vehicle details.',
  },
  {
    question: 'How accurate is the information provided?',
    answer:
      'We maintain 99.9% accuracy by syncing with government databases multiple times daily. All information including registration status, insurance details, and compliance data is verified against official RTO records. However, there may be a minor delay for very recent updates.',
  },
  {
    question: 'Is my search data private and secure?',
    answer:
      'Absolutely. We use 256-bit AES encryption for all data in transit and at rest. Your search history is encrypted and never shared with third parties. We comply with the Digital Personal Data Protection Act, 2023 (DPDP Act) and follow strict data minimization principles.',
  },
  {
    question: 'Is this service free to use?',
    answer:
      'Basic vehicle lookups are free with a daily limit. For unlimited searches, detailed PDF reports, search history, and API access, we offer affordable premium plans starting at ₹99/month. Visit our pricing page for detailed plan comparisons.',
  },
  {
    question: 'Which states and vehicle types are covered?',
    answer:
      'We cover all 28 states and 8 union territories across India — that\'s every RTO office in the country. We support all vehicle types including two-wheelers, cars, trucks, buses, commercial vehicles, tractors, and special-purpose vehicles.',
  },
  {
    question: 'Is it legal to look up vehicle information?',
    answer:
      'Yes. Vehicle registration information is public data maintained by government RTOs. Looking up registration details is completely legal. However, using the information for harassment, stalking, or any illegal purpose is strictly prohibited and may result in legal action.',
  },
];

function FAQAccordionItem({ item, isOpen, onToggle }: { item: FAQItem; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-white/[0.06] last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 sm:py-6 text-left group cursor-pointer"
      >
        <span className="text-white text-base sm:text-lg font-medium pr-8 group-hover:text-cyan-400 transition-colors duration-300">
          {item.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="flex-shrink-0"
        >
          <ChevronDown className={`w-5 h-5 transition-colors duration-300 ${isOpen ? 'text-cyan-400' : 'text-gray-600'}`} />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-gray-500 text-sm sm:text-base leading-relaxed pr-12">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="relative py-24 sm:py-32 bg-[#0a0a1a]">
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-violet-500/5 blur-[150px] rounded-full" />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-violet-500">
              Frequently Asked Questions
            </span>
          </h2>
          <p className="text-gray-500 text-lg">
            Everything you need to know about our service
          </p>
        </motion.div>

        {/* FAQ List */}
        <motion.div
          className="rounded-2xl bg-white/[0.02] backdrop-blur-xl border border-white/[0.08] px-6 sm:px-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {faqItems.map((item, i) => (
            <FAQAccordionItem
              key={i}
              item={item}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
