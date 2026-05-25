import HeroSection from '@/components/home/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import StatsSection from '@/components/home/StatsSection';
import HowItWorks from '@/components/home/HowItWorks';
import Testimonials from '@/components/home/Testimonials';
import FAQ from '@/components/home/FAQ';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0a0a1a]">
      <HeroSection />
      <FeaturesSection />
      <StatsSection />
      <HowItWorks />
      <Testimonials />
      <FAQ />
    </main>
  );
}
