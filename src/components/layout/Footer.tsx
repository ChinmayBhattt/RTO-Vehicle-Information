"use client";

import React from "react";
import Link from "next/link";
import { Car, Globe, MessageSquare, Mail, Shield, ExternalLink } from "lucide-react";

const footerLinks = {
  product: [
    { label: "Features", href: "/#features" },
    { label: "Pricing", href: "/#pricing" },
    { label: "API Access", href: "/#api" },
    { label: "Documentation", href: "/docs" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Disclaimer", href: "/disclaimer" },
    { label: "Cookie Policy", href: "/privacy#cookies" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Careers", href: "/careers" },
    { label: "Blog", href: "/blog" },
  ],
};

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] bg-[#0a0a1a]/50 backdrop-blur-sm">
      <div className="container-app py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center group-hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-shadow duration-300">
                <Car className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg text-gradient">
                VahanCheck
              </span>
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed mb-5">
              India&apos;s most comprehensive vehicle information platform.
              Instant access to registration details, compliance status, and
              more.
            </p>
            <div className="flex items-center gap-3">
              <SocialLink href="#" icon={MessageSquare} label="Twitter" />
              <SocialLink href="#" icon={Globe} label="GitHub" />
              <SocialLink href="#" icon={Mail} label="Email" />
            </div>
          </div>

          {/* Links */}
          <FooterLinkGroup title="Product" links={footerLinks.product} />
          <FooterLinkGroup title="Legal" links={footerLinks.legal} />
          <FooterLinkGroup title="Company" links={footerLinks.company} />
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} VahanCheck. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5 text-xs text-gray-600">
            <Shield className="w-3 h-3" />
            <span>Secured with enterprise-grade encryption</span>
          </div>
        </div>

        {/* Legal Disclaimer */}
        <div className="mt-4 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
          <p className="text-[10px] text-gray-600 leading-relaxed text-center">
            <strong>Disclaimer:</strong> VahanCheck provides vehicle information
            sourced from publicly available government databases. The data is
            provided &quot;as-is&quot; and may not be 100% accurate or
            up-to-date. This service is intended for informational purposes only
            and should not be used as a legal document. Sensitive information is
            masked to comply with privacy regulations.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterLinkGroup({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h4 className="text-sm font-semibold text-white mb-4">{title}</h4>
      <ul className="space-y-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-gray-500 hover:text-gray-300 transition-colors duration-200
                flex items-center gap-1 group"
            >
              {link.label}
              <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-50 transition-opacity" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialLink({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: React.ElementType;
  label: string;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      className="w-9 h-9 flex items-center justify-center rounded-xl
        bg-white/[0.04] border border-white/[0.08] text-gray-500
        hover:text-white hover:bg-white/[0.08] hover:border-white/[0.15]
        transition-all duration-200"
    >
      <Icon className="w-4 h-4" />
    </a>
  );
}
