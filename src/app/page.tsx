import React from "react";
import { HomeSections } from "@/components/HomeSections";
import { SALON_INFO } from "@/data/salon";

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    name: SALON_INFO.name,
    description: SALON_INFO.heroSubheading,
    telephone: SALON_INFO.phoneDisplay,
    email: SALON_INFO.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: SALON_INFO.addressLine1,
      addressLocality: "Victoria Island, Lagos",
      addressRegion: "Lagos",
      postalCode: "106104",
      addressCountry: "NG",
    },
    priceRange: "₦₦₦",
    openingHours: ["Tu-Fr 09:00-20:00", "Sa 08:30-20:00", "Su 11:00-18:00"],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeSections />
    </>
  );
}
