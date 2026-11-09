"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Calendar,
  Play,
  Sparkles,
  Star,
  X,
} from "lucide-react";
import { InstagramIcon } from "@/components/SocialIcons";
import {
  CATEGORY_SUMMARIES,
  formatNaira,
  GALLERY_ITEMS,
  SALON_INFO,
  ServiceCategory,
  SERVICES,
  TEAM_MEMBERS,
  TESTIMONIALS,
  TRANSFORMATIONS,
} from "@/data/salon";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { EditorialReveal, FadeUp } from "@/components/ScrollReveal";

const DISCIPLINES: ServiceCategory[] = [
  "Hair",
  "Nails",
  "Skin",
  "Makeup",
  "Spa",
];

const REEL_SCENES = [
  {
    image: "/images/lagos-hero-salon.png",
    chapter: "Chapter I · The Penthouse Atelier",
    caption: "Warm travertine, sculpted bronze mirrors, and quiet golden-hour light.",
  },
  {
    image: "/images/lagos-service-hair.png",
    chapter: "Chapter II · Dimensional Color & Silk",
    caption: "Effortless sunlit balayage paired with liquid-silk keratin restoration.",
  },
  {
    image: "/images/lagos-service-skin.png",
    chapter: "Chapter III · 24K Gold Cellular Renewal",
    caption: "Pure gold leaf compression infused with Swiss botanical peptides.",
  },
  {
    image: "/images/lagos-salon-interior-2.png",
    chapter: "Chapter IV · Candlelit Sanctuary Suites",
    caption: "Unhurried private body rituals crafted for total restoration.",
  },
];

export function HomeSections() {
  const [filmOpen, setFilmOpen] = useState(false);
  const [filmIdx, setFilmIdx] = useState(0);
  const [activeTransIdx, setActiveTransIdx] = useState(0);
  const [activeReviewIdx, setActiveReviewIdx] = useState(0);
  const [lightboxImage, setLightboxImage] = useState<{
    src: string;
    title: string;
    caption: string;
    stylist: string;
  } | null>(null);

  // Auto-advance ambient salon film modal when open
  useEffect(() => {
    if (!filmOpen) return;
    const timer = setInterval(() => {
      setFilmIdx((i) => (i + 1) % REEL_SCENES.length);
    }, 4200);
    return () => clearInterval(timer);
  }, [filmOpen]);

  const featuredServices = SERVICES.filter((s) => s.featured);
  const activeTransform = TRANSFORMATIONS[activeTransIdx];
  const instagramGrid = [
    GALLERY_ITEMS[0],
    GALLERY_ITEMS[1],
    GALLERY_ITEMS[2],
    GALLERY_ITEMS[3],
    GALLERY_ITEMS[10],
    GALLERY_ITEMS[11],
  ];

  return (
    <>
      {/* 1. FULL-SCREEN CINEMATIC HERO */}
      <section className="relative min-h-[100svh] flex items-end pb-16 sm:pb-24 pt-28 overflow-hidden bg-midnight text-ivory">
        {/* Background Motion Image */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="/images/lagos-hero-salon.png"
            alt="Bella Salon Victoria Island Lagos luxury travertine styling sanctuary"
            className="h-full w-full object-cover object-center animate-ken-burns opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/50 to-midnight/35" />
          <div className="absolute inset-0 bg-gradient-to-r from-midnight/75 via-midnight/25 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl w-full px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-8 space-y-6"
            >
              <div className="inline-flex items-center gap-3">
                <span className="h-[1px] w-10 bg-bronze" />
                <span className="text-[10px] sm:text-xs uppercase tracking-[0.34em] text-champagne">
                  Est. {SALON_INFO.established} · Victoria Island, Lagos Sanctuary
                </span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] leading-[1.06] tracking-tight text-ivory uppercase">
                {SALON_INFO.heroHeadline}
              </h1>

              <p className="text-sm sm:text-base md:text-lg text-champagne/90 max-w-2xl leading-relaxed font-light">
                {SALON_INFO.heroSubheading}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/booking"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-bronze text-ivory text-[11px] uppercase tracking-[0.26em] font-medium hover:bg-ivory hover:text-midnight transition-all duration-300 shadow-lg"
                >
                  <Calendar className="w-4 h-4" strokeWidth={1.5} />
                  Book Your Experience
                </Link>

                <Link
                  href="/services"
                  className="inline-flex items-center gap-2.5 px-7 py-4 border border-champagne/40 text-ivory text-[11px] uppercase tracking-[0.24em] font-medium hover:border-ivory hover:bg-ivory/10 transition-all duration-300"
                >
                  Explore Services
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>

            {/* Right Hero Atmosphere Reel Trigger */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.25 }}
              className="lg:col-span-4 flex lg:justify-end"
            >
              <button
                type="button"
                onClick={() => {
                  setFilmIdx(0);
                  setFilmOpen(true);
                }}
                className="group flex items-center gap-4 p-4 pr-6 bg-midnight/70 backdrop-blur-md border border-champagne/25 hover:border-bronze transition-all text-left"
              >
                <span className="w-12 h-12 rounded-full bg-bronze/90 text-ivory flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                </span>
                <div>
                  <span className="block text-[9px] uppercase tracking-[0.26em] text-bronze-light">
                    Atmosphere Reel
                  </span>
                  <span className="font-serif text-lg text-ivory">
                    Step Inside the Sanctuary
                  </span>
                </div>
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. EDITORIAL PHILOSOPHY & ASYMMETRICAL SANCTUARY INTRO */}
      <section className="py-20 sm:py-28 bg-ivory">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6 space-y-6">
              <FadeUp>
                <p className="text-[10px] uppercase tracking-[0.32em] text-bronze-dark font-semibold">
                  The Luxury Beauty Experience
                </p>
                <h2 className="font-serif text-4xl sm:text-5xl text-midnight leading-[1.12] mt-3">
                  A Quiet Architectural Sanctuary Crafted for Self-Care
                </h2>
              </FadeUp>

              <FadeUp delay={0.1}>
                <p className="text-sm sm:text-base text-taupe leading-relaxed">
                  High above the vibrancy of Adeola Odeku in Victoria Island,
                  Bella Salon replaces rushed appointments with unhurried
                  artistry. Every ritual begins with chilled spiced hibiscus
                  tea, bespoke diagnostic consultation, and clean clinical
                  formulations crafted for radiant skin and textured hair.
                </p>
              </FadeUp>

              <FadeUp delay={0.16}>
                <div className="grid grid-cols-3 gap-6 py-6 border-y border-champagne">
                  <div>
                    <p className="font-serif text-3xl sm:text-4xl text-midnight">
                      6
                    </p>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-taupe mt-1">
                      Master Artisans
                    </p>
                  </div>
                  <div>
                    <p className="font-serif text-3xl sm:text-4xl text-midnight">
                      5
                    </p>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-taupe mt-1">
                      Beauty Pillars
                    </p>
                  </div>
                  <div>
                    <p className="font-serif text-3xl sm:text-4xl text-midnight">
                      4.9★
                    </p>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-taupe mt-1">
                      Guest Acclaim
                    </p>
                  </div>
                </div>
              </FadeUp>

              <FadeUp delay={0.22}>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2.5 text-[11px] uppercase tracking-[0.26em] font-medium text-midnight border-b border-bronze pb-1.5 hover:text-bronze-dark transition-colors"
                >
                  Discover Our Story & Ethos
                  <ArrowRight className="w-3.5 h-3.5 text-bronze-dark" />
                </Link>
              </FadeUp>
            </div>

            {/* Asymmetrical Imagery */}
            <div className="lg:col-span-6 relative">
              <div className="grid grid-cols-12 gap-4 items-end">
                <EditorialReveal className="col-span-8">
                  <div className="overflow-hidden border border-champagne bg-champagne/20">
                    <img
                      src="/images/lagos-salon-interior-1.png"
                      alt="Bella Salon travertine reception lounge"
                      className="w-full aspect-[4/3] object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </EditorialReveal>
                <EditorialReveal delay={0.15} className="col-span-4 -ml-8 mb-[-28px] relative z-10">
                  <div className="overflow-hidden border-2 border-ivory shadow-xl">
                    <img
                      src="/images/lagos-salon-interior-2.png"
                      alt="Private candlelit facial and spa treatment suite"
                      className="w-full aspect-[3/4] object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </EditorialReveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED SERVICES — FIVE DISCIPLINES */}
      <section className="py-20 sm:py-28 bg-champagne/25 border-y border-champagne">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <FadeUp>
              <p className="text-[10px] uppercase tracking-[0.32em] text-bronze-dark font-semibold">
                Curated Menu
              </p>
              <h2 className="font-serif text-4xl sm:text-5xl text-midnight mt-2">
                Five Pillars of Atelier Craft
              </h2>
            </FadeUp>
            <FadeUp delay={0.1}>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-midnight text-ivory text-[10px] uppercase tracking-[0.24em] font-medium hover:bg-bronze transition-colors self-start"
              >
                View Full Menu & Pricing
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </FadeUp>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DISCIPLINES.map((category, idx) => {
              const info = CATEGORY_SUMMARIES[category];
              const categoryServices = SERVICES.filter(
                (s) => s.category === category
              );
              const startingPrice = Math.min(
                ...categoryServices.map((s) => s.price)
              );

              return (
                <FadeUp
                  key={category}
                  delay={idx * 0.06}
                  className={idx === 0 ? "md:col-span-2 lg:col-span-2" : ""}
                >
                  <Link
                    href={`/services?category=${category}`}
                    className="group block relative overflow-hidden bg-midnight text-ivory border border-champagne/60 h-80 sm:h-96"
                  >
                    <img
                      src={info.image}
                      alt={info.title}
                      className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/45 to-transparent" />

                    <div className="relative h-full p-6 sm:p-8 flex flex-col justify-between">
                      <div className="flex items-center justify-between">
                        <span className="px-3 py-1 bg-midnight/75 backdrop-blur-sm border border-champagne/25 text-[9px] uppercase tracking-[0.26em] text-champagne">
                          0{idx + 1} · {category}
                        </span>
                        <span className="text-[11px] tracking-[0.18em] uppercase text-bronze-light bg-midnight/70 px-3 py-1">
                          From {formatNaira(startingPrice)}
                        </span>
                      </div>

                      <div className="space-y-2 max-w-lg">
                        <h3 className="font-serif text-3xl sm:text-4xl text-ivory group-hover:text-champagne transition-colors">
                          {info.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-champagne/80 line-clamp-2">
                          {info.description}
                        </p>
                        <span className="inline-flex items-center gap-2 pt-2 text-[10px] uppercase tracking-[0.24em] text-bronze-light group-hover:translate-x-1 transition-transform">
                          Explore {category} Treatments
                          <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. SIGNATURE SERVICES HIGHLIGHTS */}
      <section className="py-20 sm:py-24 bg-ivory">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 space-y-12">
          <FadeUp className="text-center max-w-2xl mx-auto space-y-3">
            <p className="text-[10px] uppercase tracking-[0.32em] text-bronze-dark font-semibold">
              Most Requested
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl text-midnight">
              Signature Bella Rituals
            </h2>
            <p className="text-sm text-taupe">
              Reserve directly into any signature service below—your treatment
              will be pre-selected in our online scheduler.
            </p>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {featuredServices.map((svc, i) => (
              <FadeUp key={svc.id} delay={i * 0.05}>
                <article className="group bg-white/75 border border-champagne flex flex-col h-full hover:border-bronze transition-colors duration-300">
                  <div className="overflow-hidden aspect-[16/10] bg-champagne/30 relative">
                    <img
                      src={svc.image}
                      alt={svc.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <span className="absolute top-3 left-3 bg-midnight/85 text-ivory px-3 py-1 text-[9px] uppercase tracking-[0.24em]">
                      {svc.category}
                    </span>
                  </div>
                  <div className="p-6 flex flex-col flex-1 justify-between space-y-5">
                    <div className="space-y-2">
                      <div className="flex items-baseline justify-between gap-2">
                        <span className="text-[11px] text-taupe">
                          {svc.durationMinutes} Minutes
                        </span>
                        <span className="font-serif text-2xl text-midnight">
                          {formatNaira(svc.price)}
                        </span>
                      </div>
                      <h3 className="font-serif text-2xl text-midnight leading-snug">
                        {svc.name}
                      </h3>
                      <p className="text-xs text-taupe leading-relaxed">
                        {svc.description}
                      </p>
                    </div>

                    <Link
                      href={`/booking?service=${svc.slug}`}
                      className="inline-flex items-center justify-between w-full px-5 py-3 border border-midnight text-[10px] uppercase tracking-[0.24em] font-medium text-midnight hover:bg-midnight hover:text-ivory transition-colors"
                    >
                      <span>Book This Ritual</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </article>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE BEFORE & AFTER TRANSFORMATIONS */}
      <section className="py-20 sm:py-28 bg-midnight text-ivory">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-5 space-y-6">
              <FadeUp>
                <p className="text-[10px] uppercase tracking-[0.32em] text-bronze">
                  Visible Artistry
                </p>
                <h2 className="font-serif text-4xl sm:text-5xl text-ivory leading-tight mt-2">
                  Signature Salon Transformations
                </h2>
                <p className="text-sm text-champagne/80 leading-relaxed mt-3">
                  Slide across each transformation to compare the pre-ritual
                  canvas against the luminous Bella Salon finish.
                </p>
              </FadeUp>

              {/* Transformation Selector Tabs */}
              <div className="space-y-2.5 pt-2">
                {TRANSFORMATIONS.map((tr, idx) => {
                  const active = idx === activeTransIdx;
                  return (
                    <button
                      key={tr.id}
                      type="button"
                      onClick={() => setActiveTransIdx(idx)}
                      className={`w-full text-left p-4 border transition-all ${
                        active
                          ? "border-bronze bg-espresso text-ivory"
                          : "border-champagne/15 bg-transparent text-champagne/70 hover:border-champagne/35"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] uppercase tracking-[0.25em] text-bronze-light">
                          {tr.category} · {tr.durationLabel}
                        </span>
                        <span className="text-[10px] text-champagne/60">
                          {tr.stylistName}
                        </span>
                      </div>
                      <p className="font-serif text-xl text-ivory mt-1">
                        {tr.title}
                      </p>
                    </button>
                  );
                })}
              </div>

              <div className="pt-2 flex flex-wrap gap-4 items-center">
                <Link
                  href={`/booking?service=${activeTransform.serviceSlug}&stylist=${activeTransform.stylistId}`}
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-bronze text-ivory text-[10px] uppercase tracking-[0.24em] font-medium hover:bg-ivory hover:text-midnight transition-colors"
                >
                  Book This Transformation
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/gallery"
                  className="text-[10px] uppercase tracking-[0.24em] text-champagne underline underline-offset-4 hover:text-ivory"
                >
                  Full Lookbook →
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <BeforeAfterSlider
                key={activeTransform.id}
                beforeImage={activeTransform.beforeImage}
                afterImage={activeTransform.afterImage}
                beforeLabel={activeTransform.beforeLabel}
                afterLabel={activeTransform.afterLabel}
                beforeFilter={activeTransform.beforeFilter}
                alt={activeTransform.title}
                aspectClass="aspect-[16/10]"
              />
              <p className="text-xs text-champagne/70 italic">
                Technique Note: {activeTransform.notes}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. MEET THE ARTISANS PREVIEW */}
      <section className="py-20 sm:py-28 bg-ivory">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <FadeUp>
              <p className="text-[10px] uppercase tracking-[0.32em] text-bronze-dark font-semibold">
                The Tribe
              </p>
              <h2 className="font-serif text-4xl sm:text-5xl text-midnight mt-2">
                Master Colorists, Aestheticians & Stylists
              </h2>
            </FadeUp>
            <Link
              href="/team"
              className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.24em] font-medium text-midnight border-b border-bronze pb-1 hover:text-bronze-dark self-start"
            >
              Meet All 6 Artisans
              <ArrowRight className="w-3.5 h-3.5 text-bronze-dark" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM_MEMBERS.slice(0, 4).map((member, idx) => (
              <FadeUp key={member.id} delay={idx * 0.06}>
                <div className="group border border-champagne bg-white/70 overflow-hidden flex flex-col h-full">
                  <div className="aspect-[4/5] overflow-hidden bg-champagne/25 relative">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-midnight/85 via-midnight/40 to-transparent text-ivory">
                      <p className="text-[9px] uppercase tracking-[0.24em] text-bronze-light">
                        {member.yearsExperience} Years Exp.
                      </p>
                      <h3 className="font-serif text-2xl">{member.name}</h3>
                    </div>
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <p className="text-xs font-medium text-midnight">
                        {member.role}
                      </p>
                      <p className="text-[11px] text-taupe mt-1.5 line-clamp-2">
                        {member.specialties.join(" · ")}
                      </p>
                    </div>
                    <Link
                      href={`/booking?stylist=${member.id}`}
                      className="inline-flex items-center justify-between text-[10px] uppercase tracking-[0.22em] text-bronze-dark font-semibold hover:text-midnight pt-2 border-t border-champagne"
                    >
                      <span>Book With {member.name.split(" ")[0]}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CLIENT TESTIMONIALS */}
      <section className="py-20 sm:py-24 bg-champagne/35 border-y border-champagne">
        <div className="mx-auto max-w-5xl px-5 sm:px-8 text-center space-y-10">
          <FadeUp className="space-y-2">
            <p className="text-[10px] uppercase tracking-[0.32em] text-bronze-dark font-semibold">
              Guest Reflections
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl text-midnight">
              Words From Our Sanctuary
            </h2>
          </FadeUp>

          <div className="bg-ivory border border-champagne p-8 sm:p-12 shadow-sm space-y-6">
            <div className="flex justify-center gap-1 text-bronze">
              {Array.from({ length: TESTIMONIALS[activeReviewIdx].rating }).map(
                (_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                )
              )}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={TESTIMONIALS[activeReviewIdx].id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
                className="space-y-5"
              >
                <blockquote className="font-serif text-2xl sm:text-3xl text-midnight leading-relaxed italic">
                  &ldquo;{TESTIMONIALS[activeReviewIdx].quote}&rdquo;
                </blockquote>
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] font-semibold text-midnight">
                    {TESTIMONIALS[activeReviewIdx].clientName}
                  </p>
                  <p className="text-xs text-taupe mt-0.5">
                    {TESTIMONIALS[activeReviewIdx].clientTitle} ·{" "}
                    <span className="text-bronze-dark">
                      {TESTIMONIALS[activeReviewIdx].serviceName}
                    </span>
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-center gap-2 pt-2">
              {TESTIMONIALS.map((t, idx) => (
                <button
                  key={t.id}
                  type="button"
                  aria-label={`Read testimonial from ${t.clientName}`}
                  onClick={() => setActiveReviewIdx(idx)}
                  className={`h-2 transition-all ${
                    idx === activeReviewIdx
                      ? "w-8 bg-midnight"
                      : "w-2 bg-bronze/40 hover:bg-bronze"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8. INSTAGRAM LOOKBOOK STRIP */}
      <section className="py-20 sm:py-24 bg-ivory">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-[0.32em] text-bronze-dark font-semibold inline-flex items-center gap-2">
                <InstagramIcon className="w-3.5 h-3.5" />
                {SALON_INFO.instagramHandle}
              </p>
              <h2 className="font-serif text-4xl text-midnight mt-2">
                Latest Atelier Moments
              </h2>
            </div>

            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.24em] font-medium text-midnight border-b border-bronze pb-1 hover:text-bronze-dark self-start"
            >
              Open Full Lookbook
              <ArrowRight className="w-3.5 h-3.5 text-bronze-dark" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {instagramGrid.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() =>
                  setLightboxImage({
                    src: item.image,
                    title: item.title,
                    caption: item.caption,
                    stylist: item.stylist,
                  })
                }
                className="group relative aspect-square overflow-hidden bg-champagne/30 border border-champagne text-left focus:outline-none"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-midnight/65 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-3 flex flex-col justify-end text-ivory">
                  <span className="text-[9px] uppercase tracking-[0.22em] text-bronze-light">
                    {item.category}
                  </span>
                  <span className="font-serif text-base leading-snug">
                    {item.title}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 9. FINAL EDITORIAL BOOKING INVITATION */}
      <section className="py-20 sm:py-24 bg-midnight text-ivory relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="/images/lagos-salon-interior-2.png"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 mx-auto max-w-4xl px-5 sm:px-8 text-center space-y-6">
          <Sparkles
            className="w-6 h-6 text-bronze-light mx-auto"
            strokeWidth={1.4}
          />
          <p className="text-[10px] uppercase tracking-[0.34em] text-bronze-light">
            Reserve Your Sanctuary Time
          </p>
          <h2 className="font-display text-3xl sm:text-5xl leading-tight">
            Ready to Experience Quiet Luxury?
          </h2>
          <p className="text-sm sm:text-base text-champagne/80 max-w-xl mx-auto">
            Select your ritual, choose your dedicated artisan, and reserve your
            preferred window online in under sixty seconds.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-3">
            <Link
              href="/booking"
              className="px-9 py-4 bg-bronze text-ivory text-[11px] uppercase tracking-[0.26em] font-medium hover:bg-ivory hover:text-midnight transition-colors"
            >
              Book Appointment Now
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 border border-champagne/40 text-ivory text-[11px] uppercase tracking-[0.24em] hover:border-ivory transition-colors"
            >
              Contact Concierge
            </Link>
          </div>
        </div>
      </section>

      {/* SALON ATMOSPHERE REEL MODAL */}
      <AnimatePresence>
        {filmOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-obsidian/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          >
            <div className="relative w-full max-w-5xl bg-midnight border border-bronze/40 overflow-hidden shadow-2xl">
              <button
                type="button"
                aria-label="Close salon film"
                onClick={() => setFilmOpen(false)}
                className="absolute top-4 right-4 z-30 w-10 h-10 bg-midnight/80 border border-champagne/30 text-ivory flex items-center justify-center hover:border-bronze"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative aspect-[16/9] overflow-hidden bg-black">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={REEL_SCENES[filmIdx].image}
                    src={REEL_SCENES[filmIdx].image}
                    alt={REEL_SCENES[filmIdx].chapter}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1.12 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 4, ease: "linear" }}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-midnight via-transparent to-midnight/30" />

                <div className="absolute bottom-6 left-6 right-6 z-20 flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-ivory">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-bronze-light">
                      {REEL_SCENES[filmIdx].chapter}
                    </p>
                    <p className="font-serif text-2xl sm:text-3xl mt-1">
                      {REEL_SCENES[filmIdx].caption}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {REEL_SCENES.map((sc, i) => (
                      <button
                        key={sc.chapter}
                        type="button"
                        aria-label={`Scene ${i + 1}`}
                        onClick={() => setFilmIdx(i)}
                        className={`h-1.5 transition-all ${
                          i === filmIdx ? "w-10 bg-bronze" : "w-4 bg-ivory/35"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* INSTAGRAM LIGHTBOX MODAL */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImage(null)}
            className="fixed inset-0 z-50 bg-obsidian/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-3xl w-full bg-midnight text-ivory border border-bronze/40 grid grid-cols-1 md:grid-cols-2 overflow-hidden"
            >
              <button
                type="button"
                aria-label="Close image preview"
                onClick={() => setLightboxImage(null)}
                className="absolute top-3 right-3 z-20 p-2 bg-midnight/80 text-ivory hover:text-bronze-light"
              >
                <X className="w-5 h-5" />
              </button>
              <img
                src={lightboxImage.src}
                alt={lightboxImage.title}
                className="w-full aspect-square object-cover"
              />
              <div className="p-6 sm:p-8 flex flex-col justify-between space-y-5">
                <div className="space-y-3">
                  <p className="text-[10px] uppercase tracking-[0.26em] text-bronze-light">
                    {SALON_INFO.instagramHandle}
                  </p>
                  <h3 className="font-serif text-3xl text-ivory">
                    {lightboxImage.title}
                  </h3>
                  <p className="text-sm text-champagne/80 leading-relaxed">
                    {lightboxImage.caption}
                  </p>
                  <p className="text-xs text-champagne/60">
                    Artisan Credit: {lightboxImage.stylist}
                  </p>
                </div>
                <Link
                  href="/booking"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-bronze text-ivory text-[10px] uppercase tracking-[0.24em] font-medium hover:bg-ivory hover:text-midnight transition-colors"
                >
                  Reserve This Look
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
