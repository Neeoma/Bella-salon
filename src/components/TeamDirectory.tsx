"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Award } from "lucide-react";
import { InstagramIcon } from "@/components/SocialIcons";
import { ServiceCategory, TEAM_MEMBERS } from "@/data/salon";

const DISCIPLINES: Array<"All" | ServiceCategory> = [
  "All",
  "Hair",
  "Nails",
  "Skin",
  "Makeup",
  "Spa",
];

export function TeamDirectory() {
  const [filter, setFilter] = useState<"All" | ServiceCategory>("All");

  const members = useMemo(() => {
    if (filter === "All") return TEAM_MEMBERS;
    return TEAM_MEMBERS.filter((m) => m.categories.includes(filter));
  }, [filter]);

  return (
    <div className="space-y-10">
      <div className="flex flex-wrap items-center justify-between gap-4 border-y border-champagne py-5">
        <div className="flex flex-wrap gap-2">
          {DISCIPLINES.map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => setFilter(d)}
              className={`px-5 py-2.5 text-[10px] uppercase tracking-[0.22em] font-medium border transition-colors ${
                filter === d
                  ? "bg-midnight text-ivory border-midnight"
                  : "bg-white/80 text-midnight border-champagne hover:border-bronze"
              }`}
            >
              {d}
            </button>
          ))}
        </div>
        <p className="text-xs text-taupe">
          Showing {members.length} Master{" "}
          {members.length === 1 ? "Artisan" : "Artisans"}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {members.map((member) => (
          <article
            key={member.id}
            className="bg-white/85 border border-champagne flex flex-col justify-between overflow-hidden group"
          >
            <div>
              <div className="relative aspect-[4/5] overflow-hidden bg-champagne/25">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />
                <span className="absolute top-3 left-3 bg-midnight/85 text-ivory px-3 py-1 text-[9px] uppercase tracking-[0.24em]">
                  {member.discipline}
                </span>
                <span className="absolute bottom-3 right-3 bg-ivory/95 text-midnight px-3 py-1 text-[10px] tracking-[0.18em] uppercase inline-flex items-center gap-1.5 border border-champagne">
                  <Award className="w-3 h-3 text-bronze-dark" />
                  {member.yearsExperience} Years Exp.
                </span>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <h2 className="font-serif text-3xl text-midnight">
                    {member.name}
                  </h2>
                  <p className="text-xs uppercase tracking-[0.18em] text-bronze-dark font-medium mt-1">
                    {member.role}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-taupe leading-relaxed">
                  {member.bio}
                </p>

                <blockquote className="pl-3.5 border-l-2 border-bronze text-xs italic text-midnight/85">
                  &ldquo;{member.quote}&rdquo;
                </blockquote>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {member.specialties.map((sp) => (
                    <span
                      key={sp}
                      className="px-2.5 py-1 bg-champagne/40 text-[10px] text-midnight"
                    >
                      {sp}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="px-6 py-4 bg-ivory/70 border-t border-champagne flex items-center justify-between gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[11px] text-taupe hover:text-midnight"
              >
                <InstagramIcon className="w-3.5 h-3.5 text-bronze-dark" />
                {member.instagram}
              </a>

              <Link
                href={`/booking?stylist=${member.id}`}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-midnight text-ivory text-[10px] uppercase tracking-[0.2em] font-medium hover:bg-bronze transition-colors"
              >
                Book {member.name.split(" ")[0]}
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
