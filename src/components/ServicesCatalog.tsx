"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowUpRight, Check, Clock, Search } from "lucide-react";
import {
  CATEGORY_SUMMARIES,
  formatNaira,
  ServiceCategory,
  SERVICES,
} from "@/data/salon";

const TABS: Array<"All" | ServiceCategory> = [
  "All",
  "Hair",
  "Nails",
  "Skin",
  "Makeup",
  "Spa",
];

export function ServicesCatalog() {
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<"All" | ServiceCategory>(
    "All"
  );
  const [query, setQuery] = useState("");

  useEffect(() => {
    const cat = searchParams.get("category");
    if (
      cat === "Hair" ||
      cat === "Nails" ||
      cat === "Skin" ||
      cat === "Makeup" ||
      cat === "Spa"
    ) {
      setSelectedCategory(cat);
    }
  }, [searchParams]);

  const filteredServices = useMemo(() => {
    const q = query.trim().toLowerCase();
    return SERVICES.filter((svc) => {
      const catMatch =
        selectedCategory === "All" || svc.category === selectedCategory;
      const qMatch =
        !q ||
        svc.name.toLowerCase().includes(q) ||
        svc.description.toLowerCase().includes(q) ||
        svc.tagline.toLowerCase().includes(q);
      return catMatch && qMatch;
    });
  }, [selectedCategory, query]);

  return (
    <div className="space-y-10">
      {/* Filter Toolbar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-y border-champagne py-5">
        <div className="flex flex-wrap gap-2">
          {TABS.map((tab) => {
            const active = selectedCategory === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setSelectedCategory(tab)}
                className={`relative px-5 py-2.5 text-[11px] uppercase tracking-[0.22em] font-medium transition-colors ${
                  active
                    ? "bg-midnight text-ivory"
                    : "bg-white/70 border border-champagne text-midnight hover:border-bronze"
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        <div className="relative w-full lg:w-72">
          <Search className="w-4 h-4 text-taupe absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search treatments..."
            aria-label="Search treatments"
            className="w-full pl-10 pr-4 py-2.5 bg-white/80 border border-champagne text-xs text-midnight placeholder:text-taupe focus:outline-none focus:border-bronze"
          />
        </div>
      </div>

      {/* Category Editorial Banner when filtered */}
      {selectedCategory !== "All" && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-midnight text-ivory p-6 sm:p-9 border border-bronze/35 grid grid-cols-1 md:grid-cols-12 gap-6 items-center"
        >
          <div className="md:col-span-8 space-y-2">
            <span className="text-[10px] uppercase tracking-[0.3em] text-bronze-light">
              {selectedCategory} Atelier
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl">
              {CATEGORY_SUMMARIES[selectedCategory].title}
            </h2>
            <p className="text-sm text-champagne/80 max-w-2xl">
              {CATEGORY_SUMMARIES[selectedCategory].description}
            </p>
          </div>
          <div className="md:col-span-4 flex md:justify-end">
            <Link
              href="/booking"
              className="px-6 py-3.5 bg-bronze text-ivory text-[10px] uppercase tracking-[0.24em] font-medium hover:bg-ivory hover:text-midnight transition-colors"
            >
              Book {selectedCategory} Consultation
            </Link>
          </div>
        </motion.div>
      )}

      {/* Services Grid */}
      {filteredServices.length === 0 ? (
        <div className="p-12 border border-champagne bg-white/60 text-center space-y-3">
          <p className="font-serif text-2xl text-midnight">
            No treatments match &ldquo;{query}&rdquo;
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory("All");
              setQuery("");
            }}
            className="text-xs uppercase tracking-[0.22em] text-bronze-dark underline underline-offset-4"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          {filteredServices.map((svc) => (
            <article
              key={svc.id}
              className="group bg-white/85 border border-champagne hover:border-bronze transition-colors duration-300 flex flex-col sm:flex-row overflow-hidden"
            >
              <div className="sm:w-48 md:w-52 shrink-0 overflow-hidden bg-champagne/25 relative">
                <img
                  src={svc.image}
                  alt={svc.name}
                  className="w-full h-56 sm:h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <span className="absolute top-3 left-3 bg-midnight/85 text-ivory px-2.5 py-1 text-[9px] uppercase tracking-[0.22em]">
                  {svc.category}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                <div className="space-y-2.5">
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="inline-flex items-center gap-1.5 text-[11px] text-taupe">
                      <Clock className="w-3.5 h-3.5 text-bronze-dark" />
                      {svc.durationMinutes} min
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

                  <ul className="space-y-1 pt-1">
                    {svc.includes.map((inc) => (
                      <li
                        key={inc}
                        className="flex items-center gap-2 text-[11px] text-midnight/80"
                      >
                        <Check className="w-3 h-3 text-bronze-dark shrink-0" />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href={`/booking?service=${svc.slug}`}
                  className="inline-flex items-center justify-between w-full px-5 py-3 bg-midnight text-ivory text-[10px] uppercase tracking-[0.22em] font-medium hover:bg-bronze transition-colors"
                >
                  <span>Book This Service</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
