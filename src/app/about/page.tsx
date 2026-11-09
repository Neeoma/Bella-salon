import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, Sparkles } from "lucide-react";
import { EditorialReveal, FadeUp } from "@/components/ScrollReveal";
import { TEAM_MEMBERS } from "@/data/salon";

export const metadata: Metadata = {
  title: "About Us | Our Story & Sanctuary Philosophy",
  description:
    "Discover the story, mission, architectural sanctuary, and master artisans behind Bella Salon in Victoria Island, Lagos, Nigeria.",
};

const PILLARS = [
  {
    num: "01",
    title: "Master-Trained Artisans",
    description:
      "Every wig architect, aesthetician, and nail specialist holds seven to twelve years in Nigerian bridal, editorial, or clinical practice.",
  },
  {
    num: "02",
    title: "Melanin-Safe & Heritage Botanicals",
    description:
      "We formulate strictly without harsh bleaching agents—pairing Swiss peptides, pure 24K gold leaf, West African shea, hibiscus, and black-soap elixirs.",
  },
  {
    num: "03",
    title: "Unhurried Acoustic Stillness",
    description:
      "Double-glazed Adeola Odeku windows, spacious styling stations, and candlelit private suites offer an instant escape from Lagos hustle.",
  },
  {
    num: "04",
    title: "Bespoke Diagnostic Consultations",
    description:
      "Every ritual begins with undertone, scalp, or dermal mapping so your treatment celebrates your natural texture and complexion.",
  },
];

export default function AboutPage() {
  return (
    <div className="pt-20 bg-ivory">
      {/* Editorial Hero */}
      <section className="py-16 sm:py-24 border-b border-champagne">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <FadeUp>
                <p className="text-[10px] uppercase tracking-[0.34em] text-bronze-dark font-semibold">
                  Our Story · Est. 2019
                </p>
                <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-midnight leading-[1.08] mt-3">
                  Quiet Luxury Meets Artisanal Mastery
                </h1>
              </FadeUp>
              <FadeUp delay={0.1}>
                <p className="text-sm sm:text-base text-taupe leading-relaxed">
                  Founded by Creative Director Toluwani Adeyemi, Bella Salon
                  was conceived as an antidote to crowded, rushed beauty parlors.
                  We envisioned a sun-drenched travertine penthouse in Victoria
                  Island, Lagos where seamless hair artistry, melanin-safe skin
                  longevity, BIAB nail couture, Nigerian bridal glam, and
                  restorative hammam touch coexist under one serene roof.
                </p>
              </FadeUp>
              <FadeUp delay={0.16}>
                <p className="text-sm sm:text-base text-taupe leading-relaxed">
                  Whether preparing for your Traditional Engagement morning or
                  reclaiming ninety quiet minutes from Ikoyi and Lekki traffic,
                  every appointment is paced so you leave feeling renewed.
                </p>
              </FadeUp>
            </div>

            <div className="lg:col-span-6">
              <EditorialReveal>
                <div className="overflow-hidden border border-champagne shadow-lg">
                  <img
                    src="/images/lagos-salon-interior-1.png"
                    alt="Bella Salon reception and botanical consultation lounge"
                    className="w-full aspect-[16/10] object-cover"
                  />
                </div>
              </EditorialReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Split */}
      <section className="py-20 bg-midnight text-ivory">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
          <FadeUp className="p-8 sm:p-10 border border-champagne/20 bg-espresso/50 space-y-4">
            <p className="text-[10px] uppercase tracking-[0.3em] text-bronze">
              Our Mission
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl text-ivory">
              Elevate Everyday Self-Care Into An Unforgettable Ritual
            </h2>
            <p className="text-sm text-champagne/80 leading-relaxed">
              To deliver luminous, effortless beauty results rooted in healthy
              hair integrity, barrier-respecting skincare, and unhurried human
              hospitality—tailored exclusively to each guest.
            </p>
          </FadeUp>

          <FadeUp
            delay={0.1}
            className="p-8 sm:p-10 border border-champagne/20 bg-espresso/50 space-y-4"
          >
            <p className="text-[10px] uppercase tracking-[0.3em] text-bronze">
              Our Vision
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl text-ivory">
              A Sanctuary Where Timeless Elegance Feels Personal
            </h2>
            <p className="text-sm text-champagne/80 leading-relaxed">
              We reject fleeting beauty extremes in favor of enduring radiance:
              sunlit hair dimension that grows out gracefully, luminous skin that
              glows without heavy camouflage, and rituals that nourish inner
              stillness.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Why Guests Choose Bella Salon */}
      <section className="py-20 sm:py-28 bg-ivory">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 space-y-12">
          <FadeUp className="max-w-2xl space-y-3">
            <p className="text-[10px] uppercase tracking-[0.32em] text-bronze-dark font-semibold">
              The Bella Standard
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl text-midnight">
              Why Discerning Guests Choose Our Atelier
            </h2>
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PILLARS.map((pillar, i) => (
              <FadeUp key={pillar.num} delay={i * 0.06}>
                <div className="p-7 bg-white/80 border border-champagne h-full space-y-4">
                  <span className="font-serif text-3xl text-bronze">
                    {pillar.num}
                  </span>
                  <h3 className="font-serif text-2xl text-midnight leading-snug">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-taupe leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Interior & Behind-the-Scenes Essay */}
      <section className="py-20 bg-champagne/30 border-y border-champagne">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-[0.32em] text-bronze-dark font-semibold">
                Inside The Sanctuary
              </p>
              <h2 className="font-serif text-4xl sm:text-5xl text-midnight mt-2">
                Designed With Travertine, Bronze & Natural Light
              </h2>
            </div>
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.24em] text-midnight border-b border-bronze pb-1 self-start hover:text-bronze-dark"
            >
              Explore Lookbook
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-7 overflow-hidden border border-champagne bg-white">
              <img
                src="/images/lagos-hero-salon.png"
                alt="Bella Salon main styling floor with arched mirrors"
                className="w-full h-80 sm:h-[420px] object-cover"
              />
              <div className="p-5">
                <p className="text-[10px] uppercase tracking-[0.24em] text-bronze-dark">
                  Main Atelier Floor
                </p>
                <p className="font-serif text-xl text-midnight mt-1">
                  Six sunlit styling stations spaced for privacy and acoustic calm.
                </p>
              </div>
            </div>

            <div className="md:col-span-5 overflow-hidden border border-champagne bg-white">
              <img
                src="/images/lagos-salon-interior-2.png"
                alt="Bella Salon private spa treatment suite"
                className="w-full h-80 sm:h-[420px] object-cover"
              />
              <div className="p-5">
                <p className="text-[10px] uppercase tracking-[0.24em] text-bronze-dark">
                  Private Suite
                </p>
                <p className="font-serif text-xl text-midnight mt-1">
                  Warm candlelight, heated basalt, and pure cashmere comfort.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Introduction & Final CTA */}
      <section className="py-20 bg-ivory">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-5">
            <p className="text-[10px] uppercase tracking-[0.32em] text-bronze-dark font-semibold">
              Our Leadership
            </p>
            <h2 className="font-serif text-4xl text-midnight leading-tight">
              Led by Six Dedicated Specialists
            </h2>
            <p className="text-sm text-taupe leading-relaxed">
              Instead of rushing high-volume chairs, our team collaborates across
              hair, skin, nails, makeup, and bodywork—ensuring seamless bridal
              prep and comprehensive beauty care.
            </p>
            <ul className="space-y-2.5 text-xs text-midnight pt-1">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-bronze-dark" />
                Complimentary spiced hibiscus (zobo) & herbal infusions
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-bronze-dark" />
                Private VIP bridal & celebrity entrance in Victoria Island
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-bronze-dark" />
                7-day complimentary frontal, silk press & nail refinement
              </li>
            </ul>
            <div className="flex flex-wrap gap-4 pt-3">
              <Link
                href="/team"
                className="px-7 py-3.5 bg-midnight text-ivory text-[10px] uppercase tracking-[0.24em] font-medium hover:bg-bronze transition-colors"
              >
                Meet Full Team
              </Link>
              <Link
                href="/booking"
                className="inline-flex items-center gap-2 px-7 py-3.5 border border-midnight text-midnight text-[10px] uppercase tracking-[0.24em] font-medium hover:bg-champagne/40 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-bronze-dark" />
                Book Your Experience
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-4">
            {TEAM_MEMBERS.map((member) => (
              <Link
                key={member.id}
                href={`/booking?stylist=${member.id}`}
                className="group border border-champagne bg-white overflow-hidden"
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-3">
                  <p className="font-serif text-lg text-midnight leading-tight">
                    {member.name}
                  </p>
                  <p className="text-[10px] text-taupe truncate mt-0.5">
                    {member.discipline} · {member.yearsExperience}y exp
                  </p>
                  <span className="inline-flex items-center gap-1 text-[9px] uppercase tracking-[0.2em] text-bronze-dark mt-2">
                    Reserve <ArrowUpRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
