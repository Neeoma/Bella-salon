import React from "react";
import type { Metadata } from "next";
import { TeamDirectory } from "@/components/TeamDirectory";

export const metadata: Metadata = {
  title: "Meet the Team | The Bella Artisans",
  description:
    "Meet Bella Salon's creative director, colorists, precision stylists, nail couture artists, clinical aestheticians, and spa therapists.",
};

export default function TeamPage() {
  return (
    <div className="pt-28 pb-24 bg-ivory">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 space-y-12">
        <header className="max-w-3xl space-y-4">
          <p className="text-[10px] uppercase tracking-[0.34em] text-bronze-dark font-semibold">
            The Bella Tribe
          </p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-midnight leading-tight">
            Meet Our Master Artisans
          </h1>
          <p className="text-sm sm:text-base text-taupe leading-relaxed">
            Curated from Lagos Fashion Week backstages, luxury bridal houses,
            and clinical skin studios—each artisan brings seven to twelve years
            of mastery and warm Nigerian hospitality.
          </p>
        </header>

        <TeamDirectory />
      </div>
    </div>
  );
}
