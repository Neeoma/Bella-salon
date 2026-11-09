import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingConcierge } from "@/components/FloatingConcierge";

export const metadata: Metadata = {
  title: {
    default: "Bella Salon | Luxury Beauty Sanctuary & Atelier in Lagos, Nigeria",
    template: "%s | Bella Salon",
  },
  description:
    "Discover a world of beauty, elegance and self-care at Bella Salon in Victoria Island, Lagos. Luxury wig installs, silk presses, Russian BIAB nails, 24K gold facials, Nigerian bridal makeup, and hammam spa rituals.",
  keywords: [
    "luxury beauty salon Lagos",
    "Bella Salon Nigeria",
    "Victoria Island hair salon",
    "frontal wig install Lagos",
    "24K gold leaf facial Nigeria",
    "Russian BIAB manicure Lagos",
    "Nigerian bridal makeup artist",
    "luxury spa Victoria Island",
  ],
  openGraph: {
    title: "Bella Salon | Beauty Is An Experience. Not Just A Service.",
    description:
      "Full-service luxury hair, nail couture, clinical 24K gold skin rituals, bridal artistry, and serene private spa sanctuary.",
    type: "website",
    locale: "en_US",
    siteName: "Bella Salon",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-ivory text-midnight antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingConcierge />
      </body>
    </html>
  );
}
