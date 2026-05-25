import Link from "next/link";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { ArrowLeft, Shield } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/">
          <Button variant="outline" className="w-10 h-10 p-0 flex items-center justify-center rounded-xl">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold text-white flex items-center gap-2">
          <Shield className="w-8 h-8 text-cyan-400" />
          Privacy Policy
        </h1>
      </div>

      <Card className="p-6 sm:p-8 bg-white/[0.02] border-white/[0.08] space-y-6 text-gray-300 leading-relaxed text-sm">
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-white">1. Introduction</h2>
          <p>
            Welcome to VahanCheck. We are committed to protecting your personal data and respecting your privacy. This Privacy Policy explains how we collect, use, store, and process your information when you use our website, mobile application, and related services.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-white">2. Data We Collect</h2>
          <p>
            When you use our lookup service, we collect the following types of information:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong>Account Information:</strong> Name, email address, password, and registration timestamp if you sign up.
            </li>
            <li>
              <strong>Search Logs:</strong> Vehicle registration numbers searched, timestamps, and search metadata.
            </li>
            <li>
              <strong>Technical Data:</strong> IP address, device type, browser information, and system telemetry for security, anti-scraping checks, and rate-limiting.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-white">3. Public Records & Government Data</h2>
          <p>
            VahanCheck retrieves vehicle details from publicly accessible government databases (including the Vahan/Parivahan portal of the Ministry of Road Transport and Highways, India). We do not own, store permanently, or alter the registration details of vehicles. Any information displayed is cached temporarily to improve performance and rate-limit external API calls.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-white">4. Compliance with Indian Regulations</h2>
          <p>
            We align our processes with the Information Technology Act, 2000, and the Digital Personal Data Protection (DPDP) Act, 2023. User search history and account details are treated confidentially and are not shared with third-party advertisers.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-white">5. Cookies and Tracking</h2>
          <p>
            We use technical cookies and session-state tokens to keep you logged in, save your user settings (such as dark mode preferences), and analyze aggregate platform traffic to keep our services running efficiently.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-white">6. Contact Us</h2>
          <p>
            If you have questions, concerns, or requests regarding this Privacy Policy or wishes to exercise your data rights, please email our Grievance Officer at <strong>support@vahancheck.com</strong>.
          </p>
        </section>
      </Card>
    </div>
  );
}
