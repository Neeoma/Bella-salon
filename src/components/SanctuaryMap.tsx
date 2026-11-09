"use client";

import React, { useState } from "react";
import { Car, ExternalLink, MapPin, Navigation } from "lucide-react";
import { SALON_INFO } from "@/data/salon";

const LANDMARKS = [
  {
    id: "salon",
    label: "Bella Salon Atelier · VI",
    detail: "14 Adeola Odeku Crescent · Private Penthouse Lift",
    x: 52,
    y: 48,
    primary: true,
  },
  {
    id: "akin-adesola",
    label: "Akin Adesola Junction",
    detail: "2-minute drive west of Adeola Odeku",
    x: 24,
    y: 52,
  },
  {
    id: "ikoyi-bridge",
    label: "Ikoyi / Falomo Access",
    detail: "7 minutes via Ahmadu Bello & Ozumba Mbadiwe",
    x: 78,
    y: 24,
  },
  {
    id: "valet",
    label: "Bella Private Gate Valet",
    detail: "Complimentary shaded guest parking on arrival",
    x: 52,
    y: 76,
  },
];

export function SanctuaryMap() {
  const [selectedId, setSelectedId] = useState<string>("salon");
  const activeLandmark =
    LANDMARKS.find((l) => l.id === selectedId) ?? LANDMARKS[0];

  return (
    <div className="border border-champagne bg-midnight text-ivory overflow-hidden">
      {/* Map Canvas */}
      <div className="relative h-80 sm:h-96 w-full bg-[#1C1916] overflow-hidden select-none">
        {/* Architectural Victoria Island Lagos street grid SVG */}
        <svg
          viewBox="0 0 800 450"
          className="absolute inset-0 w-full h-full opacity-90"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <rect width="800" height="450" fill="#181512" />
          {/* Victoria Island Blocks */}
          <g fill="#221E1A" stroke="#362F28" strokeWidth="1">
            <rect x="40" y="30" width="160" height="100" rx="2" />
            <rect x="230" y="30" width="170" height="100" rx="2" />
            <rect x="430" y="30" width="160" height="100" rx="2" />
            <rect x="620" y="30" width="140" height="100" rx="2" />

            <rect x="40" y="160" width="160" height="120" rx="2" />
            <rect x="230" y="160" width="170" height="120" rx="2" />
            <rect x="430" y="160" width="160" height="120" rx="2" />
            <rect x="620" y="160" width="140" height="120" rx="2" />

            <rect x="40" y="310" width="160" height="110" rx="2" />
            <rect x="230" y="310" width="170" height="110" rx="2" />
            <rect x="430" y="310" width="160" height="110" rx="2" />
            <rect x="620" y="310" width="140" height="110" rx="2" />
          </g>

          {/* Highlighted Adeola Odeku Corridor */}
          <line
            x1="0"
            y1="215"
            x2="800"
            y2="215"
            stroke="#A88769"
            strokeOpacity="0.45"
            strokeWidth="12"
          />
          <line
            x1="215"
            y1="0"
            x2="215"
            y2="450"
            stroke="#E9DDCC"
            strokeOpacity="0.16"
            strokeWidth="8"
          />
          <line
            x1="605"
            y1="0"
            x2="605"
            y2="450"
            stroke="#E9DDCC"
            strokeOpacity="0.16"
            strokeWidth="8"
          />

          {/* Street Labels */}
          <g
            fill="#A88769"
            fontSize="10"
            letterSpacing="4"
            fontFamily="sans-serif"
            opacity="0.8"
          >
            <text x="52" y="219" fill="#E9DDCC">
              ADEOLA ODEKU STREET · VICTORIA ISLAND
            </text>
            <text x="225" y="385" transform="rotate(-90 225 385)">
              AKIN ADESOLA
            </text>
            <text x="615" y="385" transform="rotate(-90 615 385)">
              KOFO ABAYOMI
            </text>
          </g>
        </svg>

        {/* Interactive Pins */}
        {LANDMARKS.map((lm) => {
          const isSelected = lm.id === selectedId;
          return (
            <button
              key={lm.id}
              type="button"
              onClick={() => setSelectedId(lm.id)}
              style={{ left: `${lm.x}%`, top: `${lm.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 group focus:outline-none z-10"
              aria-label={lm.label}
            >
              {lm.primary ? (
                <span className="relative flex flex-col items-center">
                  <span className="absolute -inset-3 rounded-full bg-bronze/30 animate-ping" />
                  <span
                    className={`relative w-10 h-10 rounded-full flex items-center justify-center border-2 shadow-xl transition-transform ${
                      isSelected
                        ? "bg-bronze border-ivory text-ivory scale-110"
                        : "bg-midnight border-bronze text-bronze-light"
                    }`}
                  >
                    <MapPin className="w-4 h-4" />
                  </span>
                  <span className="mt-1.5 px-2.5 py-1 bg-midnight/95 border border-bronze/60 text-[10px] uppercase tracking-[0.2em] text-ivory whitespace-nowrap shadow-md">
                    Bella Salon VI
                  </span>
                </span>
              ) : (
                <span className="relative flex flex-col items-center">
                  <span
                    className={`w-7 h-7 rounded-full flex items-center justify-center border transition-all ${
                      isSelected
                        ? "bg-ivory text-midnight border-bronze scale-110"
                        : "bg-midnight/90 text-champagne border-champagne/40 hover:border-bronze"
                    }`}
                  >
                    <Car className="w-3.5 h-3.5" />
                  </span>
                </span>
              )}
            </button>
          );
        })}

        {/* Floating Info Card */}
        <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:w-80 bg-midnight/95 backdrop-blur-md border border-bronze/40 p-4 z-20">
          <p className="text-[9px] uppercase tracking-[0.26em] text-bronze-light">
            Victoria Island Sanctuary Map
          </p>
          <p className="font-serif text-lg text-ivory mt-0.5">
            {activeLandmark.label}
          </p>
          <p className="text-xs text-champagne/75 mt-1">
            {activeLandmark.detail}
          </p>
        </div>
      </div>

      {/* Map Action Bar */}
      <div className="p-4 sm:px-6 bg-espresso flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-champagne/85">
          <Navigation className="w-3.5 h-3.5 text-bronze shrink-0" />
          <span>{SALON_INFO.fullAddress}</span>
        </div>
        <a
          href={SALON_INFO.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 bg-bronze text-ivory text-[10px] uppercase tracking-[0.22em] font-medium hover:bg-ivory hover:text-midnight transition-colors self-start sm:self-auto"
        >
          Open in Google Maps
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}
