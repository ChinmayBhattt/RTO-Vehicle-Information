import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "VahanCheck - RTO Vehicle Information Finder | India",
  description:
    "Instantly find comprehensive vehicle registration details across India. Check RC status, insurance, owner details, challans, and more with VahanCheck.",
  keywords: [
    "RTO",
    "vehicle information",
    "registration check",
    "RC status",
    "vehicle details",
    "India",
    "Vahan",
    "number plate lookup",
  ],
  authors: [{ name: "VahanCheck" }],
  openGraph: {
    title: "VahanCheck - RTO Vehicle Information Finder",
    description:
      "Instantly find comprehensive vehicle registration details across India.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#0a0a1a] text-white antialiased">
        {/* Background ambient effects */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="bg-orb bg-orb-cyan w-[500px] h-[500px] -top-48 -left-48" />
          <div
            className="bg-orb bg-orb-violet w-[600px] h-[600px] top-1/3 -right-64"
            style={{ animationDelay: "-7s" }}
          />
          <div
            className="bg-orb bg-orb-blue w-[400px] h-[400px] bottom-0 left-1/3"
            style={{ animationDelay: "-13s" }}
          />
          <div className="absolute inset-0 bg-grid" />
        </div>

        {/* App content */}
        <div className="relative z-10">{children}</div>

        {/* Toast notifications */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "rgba(17, 24, 39, 0.9)",
              backdropFilter: "blur(20px)",
              color: "#fff",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "12px",
              fontSize: "14px",
            },
            success: {
              iconTheme: {
                primary: "#22d3ee",
                secondary: "#0a0a1a",
              },
            },
            error: {
              iconTheme: {
                primary: "#ef4444",
                secondary: "#0a0a1a",
              },
            },
          }}
        />
      </body>
    </html>
  );
}
