import React from "react";

interface BrandLogoProps {
  variant?: "light" | "dark";
  compact?: boolean;
}

export function BrandLogo({ variant = "dark", compact = false }: BrandLogoProps) {
  const strokeColor = variant === "light" ? "#F9F6F0" : "#171513";
  const accentColor = "#A88769";
  const textColor = variant === "light" ? "text-ivory" : "text-midnight";
  const subColor =
    variant === "light" ? "text-champagne/80" : "text-bronze-dark";

  return (
    <span className="inline-flex items-center gap-3 select-none group">
      <svg
        width="38"
        height="38"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="shrink-0 transition-transform duration-500 group-hover:scale-105"
      >
        <circle
          cx="20"
          cy="20"
          r="18.5"
          stroke={accentColor}
          strokeWidth="1"
          strokeOpacity="0.85"
        />
        <path
          d="M14 28V12H20.8C23.5 12 25.2 13.4 25.2 15.6C25.2 17.5 23.9 18.8 21.9 19.3C24.5 19.7 26.2 21.3 26.2 23.7C26.2 26.4 24.1 28 20.9 28H14Z"
          stroke={strokeColor}
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14 19.6H20.8"
          stroke={accentColor}
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <circle cx="29.5" cy="11.5" r="1.3" fill={accentColor} />
      </svg>

      {!compact && (
        <span className="flex flex-col leading-none">
          <span
            className={`font-display text-lg sm:text-xl tracking-[0.26em] uppercase font-medium ${textColor}`}
          >
            Bella
          </span>
          <span
            className={`font-sans text-[9px] tracking-[0.38em] uppercase mt-1 ${subColor}`}
          >
            Salon · Atelier
          </span>
        </span>
      )}
    </span>
  );
}
