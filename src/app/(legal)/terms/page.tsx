import Link from "next/link";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { ArrowLeft, Scale } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/">
          <Button variant="outline" className="w-10 h-10 p-0 flex items-center justify-center rounded-xl">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold text-white flex items-center gap-2">
          <Scale className="w-8 h-8 text-cyan-400" />
          Terms of Service
        </h1>
      </div>

      <Card className="p-6 sm:p-8 bg-white/[0.02] border-white/[0.08] space-y-6 text-gray-300 leading-relaxed text-sm">
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-white">1. Acceptance of Terms</h2>
          <p>
            By accessing or using VahanCheck, you agree to comply with and be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-white">2. Permissible Use</h2>
          <p>
            This portal is intended for individual lookup of vehicle registration details for verification purposes (such as buying a pre-owned car, checking insurance validity, or validating registration dates).
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-white">3. Prohibited Activities</h2>
          <p>
            You agree not to engage in any of the following prohibited behaviors:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Automated data querying or bulk scraping of vehicle details using scripts, bots, or extension crawlers.</li>
            <li>Exceeding rate limit thresholds or attempting to circumvent security checks and CAPTCHAs.</li>
            <li>Using the retrieved information for illegal tracking, harassment, or commercial spam.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-white">4. Modifications to Service</h2>
          <p>
            VahanCheck reserves the right to modify, suspend, or discontinue any aspect of the lookup portal, limit the number of searches, or change membership plans at any time without prior notice.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-white">5. Limit of Liability</h2>
          <p>
            To the maximum extent permitted by law, VahanCheck and its operators shall not be liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use this site, or from the contents of the public vehicle records retrieved.
          </p>
        </section>
      </Card>
    </div>
  );
}
