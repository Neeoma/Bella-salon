import React, { Suspense } from "react";
import type { Metadata } from "next";
import { ServicesCatalog } from "@/components/ServicesCatalog";

export const metadata: Metadata = {
  title: "Services & Ritual Menu",
  description:
    "Explore luxury Hair, Nails, 24K Gold Leaf Skin, Bridal Makeup, and Sanctuary Spa rituals with transparent pricing and instant booking.",
};

export default function ServicesPage() {
  return (
    <div className="pt-28 pb-24 bg-ivory">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 space-y-12">
        <header className="max-w-3xl space-y-4">
          <p className="text-[10px] uppercase tracking-[0.34em] text-bronze-dark font-semibold">
            Curated Treatment Menu
          </p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-midnight leading-tight">
            Services & Sanctuary Rituals
          </h1>
          <p className="text-sm sm:text-base text-taupe leading-relaxed">
            Every appointment includes bespoke consultation, clean botanical
            refreshments, and unhurried artisanal care across our five beauty
            pillars.
          </p>
        </header>

        <Suspense
          fallback={
            <div className="py-12 text-center text-sm text-taupe">
              Loading treatment menu...
            </div>
          }
        >
          <ServicesCatalog />
        </Suspense>
      </div>
    </div>
  );
}
