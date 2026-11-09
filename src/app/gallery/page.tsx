import React from "react";
import type { Metadata } from "next";
import { GalleryExperience } from "@/components/GalleryExperience";

export const metadata: Metadata = {
  title: "Gallery & Transformation Lookbook",
  description:
    "Explore interactive before-and-after hair, bridal makeup, and melanin-safe skin transformations alongside our Victoria Island salon interior.",
};

export default function GalleryPage() {
  return (
    <div className="pt-28 pb-24 bg-ivory">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 space-y-14">
        <header className="max-w-3xl space-y-4">
          <p className="text-[10px] uppercase tracking-[0.34em] text-bronze-dark font-semibold">
            Visual Portfolio
          </p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-midnight leading-tight">
            The Transformation Lookbook
          </h1>
          <p className="text-sm sm:text-base text-taupe leading-relaxed">
            From undetectable HD frontal melts to 24K gold dermal infusions
            and Nigerian bridal glam—explore the artistry created daily inside
            our Adeola Odeku sanctuary in Lagos.
          </p>
        </header>

        <GalleryExperience />
      </div>
    </div>
  );
}
