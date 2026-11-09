"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Maximize2, X } from "lucide-react";
import {
  GALLERY_ITEMS,
  GalleryItem,
  ServiceCategory,
  TRANSFORMATIONS,
} from "@/data/salon";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";

const FILTERS: Array<"All" | ServiceCategory | "Interior"> = [
  "All",
  "Hair",
  "Nails",
  "Skin",
  "Makeup",
  "Spa",
  "Interior",
];

export function GalleryExperience() {
  const [activeFilter, setActiveFilter] = useState<
    "All" | ServiceCategory | "Interior"
  >("All");
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const filteredGallery = useMemo(() => {
    if (activeFilter === "All") return GALLERY_ITEMS;
    return GALLERY_ITEMS.filter((item) => item.category === activeFilter);
  }, [activeFilter]);

  return (
    <div className="space-y-20">
      {/* Section 1: Before & After Comparisons */}
      <section className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-champagne pb-5">
          <div>
            <p className="text-[10px] uppercase tracking-[0.32em] text-bronze-dark font-semibold">
              Drag to Compare
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl text-midnight mt-1">
              Before & After Transformations
            </h2>
          </div>
          <p className="text-xs text-taupe max-w-md">
            Interact with the slider handles below to inspect our salon&apos;s
            color calibration, skin radiance, and bridal artistry results.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">
          {TRANSFORMATIONS.map((tr) => (
            <div
              key={tr.id}
              className="bg-white/80 border border-champagne p-4 sm:p-5 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-4">
                <BeforeAfterSlider
                  beforeImage={tr.beforeImage}
                  afterImage={tr.afterImage}
                  beforeLabel={tr.beforeLabel}
                  afterLabel={tr.afterLabel}
                  beforeFilter={tr.beforeFilter}
                  alt={tr.title}
                  aspectClass="aspect-[4/3]"
                />
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-bronze-dark">
                    <span>{tr.category}</span>
                    <span>{tr.durationLabel}</span>
                  </div>
                  <h3 className="font-serif text-2xl text-midnight leading-snug">
                    {tr.title}
                  </h3>
                  <p className="text-xs text-taupe leading-relaxed">
                    {tr.notes}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-champagne flex items-center justify-between">
                <span className="text-[11px] text-taupe">
                  By {tr.stylistName}
                </span>
                <Link
                  href={`/booking?service=${tr.serviceSlug}&stylist=${tr.stylistId}`}
                  className="inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.2em] font-semibold text-midnight hover:text-bronze-dark"
                >
                  Book Look <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 2: Filterable Lookbook */}
      <section className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-y border-champagne py-5">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-bronze-dark font-semibold">
              Editorial Portfolio
            </p>
            <h2 className="font-serif text-3xl text-midnight mt-1">
              Curated Lookbook & Sanctuary
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {FILTERS.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-2 text-[10px] uppercase tracking-[0.22em] font-medium transition-colors border ${
                  activeFilter === cat
                    ? "bg-midnight text-ivory border-midnight"
                    : "bg-white/75 text-midnight border-champagne hover:border-bronze"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredGallery.map((item) => (
              <motion.article
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35 }}
                className="group relative bg-white border border-champagne overflow-hidden flex flex-col"
              >
                <button
                  type="button"
                  onClick={() => setSelectedItem(item)}
                  className="relative aspect-[4/3] overflow-hidden bg-champagne/20 text-left focus:outline-none"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className={`w-full h-full object-cover ${
                      item.aspect === "portrait" ? "object-top" : "object-center"
                    } group-hover:scale-105 transition-transform duration-700`}
                  />
                  <div className="absolute inset-0 bg-midnight/35 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-4 py-2 bg-ivory/95 text-midnight text-[10px] uppercase tracking-[0.24em] inline-flex items-center gap-1.5">
                      <Maximize2 className="w-3.5 h-3.5" />
                      Inspect Look
                    </span>
                  </div>
                  <span className="absolute top-3 left-3 bg-midnight/85 text-ivory px-2.5 py-1 text-[9px] uppercase tracking-[0.22em]">
                    {item.category}
                  </span>
                </button>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="font-serif text-2xl text-midnight leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs text-taupe mt-1">{item.caption}</p>
                  </div>
                  <div className="pt-3 border-t border-champagne flex items-center justify-between text-[11px]">
                    <span className="text-taupe">{item.stylist}</span>
                    {item.serviceSlug ? (
                      <Link
                        href={`/booking?service=${item.serviceSlug}`}
                        className="text-[10px] uppercase tracking-[0.2em] font-semibold text-bronze-dark hover:text-midnight inline-flex items-center gap-1"
                      >
                        Book This <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    ) : (
                      <Link
                        href="/booking"
                        className="text-[10px] uppercase tracking-[0.2em] font-semibold text-bronze-dark hover:text-midnight inline-flex items-center gap-1"
                      >
                        Visit Us <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
            className="fixed inset-0 z-50 bg-obsidian/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-midnight text-ivory border border-bronze/40 grid grid-cols-1 md:grid-cols-12 overflow-hidden"
            >
              <button
                type="button"
                aria-label="Close lookbook detail"
                onClick={() => setSelectedItem(null)}
                className="absolute top-3 right-3 z-20 p-2 bg-midnight/85 text-ivory hover:text-bronze-light"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="md:col-span-7 bg-black">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  className="w-full h-full max-h-[70vh] object-cover object-top"
                />
              </div>

              <div className="md:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <span className="text-[10px] uppercase tracking-[0.28em] text-bronze-light">
                    {selectedItem.category} · Lookbook
                  </span>
                  <h3 className="font-serif text-3xl text-ivory leading-snug">
                    {selectedItem.title}
                  </h3>
                  <p className="text-sm text-champagne/85 leading-relaxed">
                    {selectedItem.caption}
                  </p>
                  <div className="pt-3 border-t border-champagne/15 space-y-1 text-xs">
                    <p className="text-champagne/65">
                      Treatment:{" "}
                      <span className="text-ivory">{selectedItem.treatment}</span>
                    </p>
                    <p className="text-champagne/65">
                      Artist:{" "}
                      <span className="text-ivory">{selectedItem.stylist}</span>
                    </p>
                  </div>
                </div>

                <Link
                  href={
                    selectedItem.serviceSlug
                      ? `/booking?service=${selectedItem.serviceSlug}`
                      : "/booking"
                  }
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-bronze text-ivory text-[10px] uppercase tracking-[0.24em] font-medium hover:bg-ivory hover:text-midnight transition-colors"
                >
                  Reserve This Treatment
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
