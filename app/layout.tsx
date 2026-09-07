import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "SevaSaathi — Trusted Services. Skilled People. Fair Work.",
  description:
    "A cooperative gig-services marketplace connecting customers with verified workers who belong to registered cooperative societies.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-warmwhite text-charcoal flex flex-col min-h-screen selection:bg-forest-light selection:text-forest">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
