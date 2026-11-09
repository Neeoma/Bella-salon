import React, { Suspense } from "react";
import type { Metadata } from "next";
import { BookingWizard } from "@/components/BookingWizard";

export const metadata: Metadata = {
  title: "Online Booking & Reservation Concierge",
  description:
    "Reserve your luxury hair, nail couture, 24K gold facial, bridal makeup, or private spa appointment online at Bella Salon.",
};

export default function BookingPage() {
  return (
    <div className="pt-28 pb-24 bg-ivory">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 space-y-10">
        <header className="max-w-3xl space-y-3">
          <p className="text-[10px] uppercase tracking-[0.34em] text-bronze-dark font-semibold">
            Online Reservations
          </p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-midnight leading-tight">
            Reserve Your Experience
          </h1>
          <p className="text-sm sm:text-base text-taupe leading-relaxed">
            Select your ritual, pair with your preferred artisan, and choose an
            available sanctuary window. Instant confirmation with calendar
            export.
          </p>
        </header>

        <Suspense
          fallback={
            <div className="p-12 border border-champagne bg-white/60 text-center text-sm text-taupe">
              Preparing live availability...
            </div>
          }
        >
          <BookingWizard />
        </Suspense>
      </div>
    </div>
  );
}
