'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  quote: string;
  rating: number;
  initials: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    role: 'Car Dealer, Mumbai',
    quote:
      'This tool has completely transformed how I verify vehicles before purchase. The comprehensive data saves me hours of manual checking at RTO offices.',
    rating: 5,
    initials: 'RK',
  },
  {
    id: 2,
    name: 'Priya Sharma',
    role: 'Insurance Agent, Delhi',
    quote:
      'I use this daily for policy renewals. Instantly checking insurance status and vehicle details has made my workflow 10x more efficient.',
    rating: 5,
    initials: 'PS',
  },
  {
    id: 3,
    name: 'Amit Patel',
    role: 'Fleet Manager, Bangalore',
    quote:
      'Managing 200+ vehicles is no joke. This platform helps me track compliance, insurance, and PUC status for my entire fleet from one dashboard.',
    rating: 5,
    initials: 'AP',
  },
  {
    id: 4,
    name: 'Deepika Nair',
    role: 'Legal Advisor, Chennai',
    quote:
      'For due diligence in vehicle-related cases, this is indispensable. Accurate blacklist checks and ownership history right at my fingertips.',
    rating: 5,
    initials: 'DN',
  },
  {
    id: 5,
    name: 'Vikram Singh',
    role: 'Used Car Buyer, Jaipur',
    quote:
      'Before buying my first used car, I ran the registration here. It revealed pending challans the seller hadn\'t disclosed. Saved me from a bad deal!',
    rating: 5,
    initials: 'VS',
  },
  {
    id: 6,
    name: 'Sunita Reddy',
    role: 'Transport Company Owner, Hyderabad',
    quote:
      'The PDF report feature is a lifesaver for documentation. Clean, professional reports that I can share with clients and authorities immediately.',
    rating: 5,
    initials: 'SR',
  },
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Show 3 testimonials at a time on desktop, auto-cycle through groups
  const groupSize = 3;
  const totalGroups = Math.ceil(testimonials.length / groupSize);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % totalGroups);
    }, 6000);
    return () => clearInterval(interval);
  }, [totalGroups]);

  const currentTestimonials = testimonials.slice(
    activeIndex * groupSize,
    activeIndex * groupSize + groupSize
  );

  return (
    <section className="relative py-24 sm:py-32 bg-[#0a0a1a] overflow-hidden">
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-cyan-500/5 blur-[150px] rounded-full" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
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
              Trusted by Thousands
            </span>
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            See what our users have to say about their experience
          </p>
        </motion.div>

        {/* Testimonial cards */}
        <div className="relative min-h-[280px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              {currentTestimonials.map((t) => (
                <div
                  key={t.id}
                  className="relative p-6 sm:p-8 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] flex flex-col"
                >
                  {/* Quote icon */}
                  <Quote className="w-8 h-8 text-cyan-400/20 mb-4" />

                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < t.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-700'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-gray-400 text-sm leading-relaxed flex-1 mb-6">
                    &ldquo;{t.quote}&rdquo;
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center text-xs font-bold text-white">
                      {t.initials}
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">{t.name}</p>
                      <p className="text-gray-600 text-xs">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Pagination dots */}
        <div className="flex justify-center gap-2 mt-8">
          {[...Array(totalGroups)].map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                i === activeIndex
                  ? 'w-8 bg-gradient-to-r from-cyan-400 to-violet-500'
                  : 'w-1.5 bg-white/20 hover:bg-white/40'
              }`}
              aria-label={`Go to testimonial group ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
