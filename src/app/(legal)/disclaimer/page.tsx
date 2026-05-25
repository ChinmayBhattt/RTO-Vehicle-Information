import Link from "next/link";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { ArrowLeft, AlertTriangle } from "lucide-react";

export default function DisclaimerPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/">
          <Button variant="outline" className="w-10 h-10 p-0 flex items-center justify-center rounded-xl">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold text-white flex items-center gap-2">
          <AlertTriangle className="w-8 h-8 text-amber-400" />
          Disclaimer
        </h1>
      </div>

      <Card className="p-6 sm:p-8 bg-white/[0.02] border-white/[0.08] space-y-6 text-gray-300 leading-relaxed text-sm">
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-white">1. Government Data Sources</h2>
          <p>
            VahanCheck is an independent portal. All vehicle registration details, insurance info, challans, and RC status details displayed on this platform are retrieved from publicly available official Indian government RTO databases (including Vahan/Parivahan portals).
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-white">2. No Official Affiliation</h2>
          <p>
            VahanCheck has <strong>no affiliation, association, or approval</strong> from the Ministry of Road Transport and Highways (MoRTH), any State Transport Department, or any Regional Transport Office (RTO) of India. We are not a government agency and do not facilitate government transport services.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-white">3. Information Accuracy & Validity</h2>
          <p>
            While we strive to query and represent the data as accurately and promptly as possible, the database records might be subject to delays, discrepancies, or update lags on the part of the official state registries.
          </p>
          <p className="bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-xl p-4 text-xs font-semibold">
            WARNING: The information displayed on this website is for informational purposes only. It does NOT constitute a legal certificate and should not be used as evidence in legal trials, dispute resolutions, or insurance claims.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-white">4. Verification Advised</h2>
          <p>
            Users are advised to cross-verify the vehicle history, loan hypothecation details, and active challan statuses with the respective Regional Transport Office (RTO) or the vehicle owner's physical documents before engaging in financial transactions (e.g., purchasing a second-hand vehicle).
          </p>
        </section>
      </Card>
    </div>
  );
}
