"use client";

import React, { useCallback, useRef, useState } from "react";
import { MoveHorizontal } from "lucide-react";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  beforeFilter?: string;
  alt: string;
  aspectClass?: string;
}

export function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = "Before",
  afterLabel = "After",
  beforeFilter,
  alt,
  aspectClass = "aspect-[16/10]",
}: BeforeAfterSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(52);
  const [dragging, setDragging] = useState(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    const clamped = Math.max(4, Math.min(96, pct));
    setPosition(clamped);
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    setDragging(true);
    updateFromClientX(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    updateFromClientX(e.clientX);
  };

  const handlePointerUp = () => {
    setDragging(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setPosition((p) => Math.max(4, p - 4));
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setPosition((p) => Math.min(96, p + 4));
    }
  };

  return (
    <div
      ref={containerRef}
      role="slider"
      tabIndex={0}
      aria-label={`Before and after comparison for ${alt}`}
      aria-valuemin={4}
      aria-valuemax={96}
      aria-valuenow={Math.round(position)}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onKeyDown={handleKeyDown}
      className={`relative w-full ${aspectClass} overflow-hidden select-none cursor-ew-resize bg-midnight border border-champagne/40 focus:outline-none focus:ring-2 focus:ring-bronze touch-none group`}
    >
      {/* After Image (Full layer underneath) */}
      <img
        src={afterImage}
        alt={`${alt} — ${afterLabel}`}
        draggable={false}
        className="absolute inset-0 h-full w-full object-cover object-center pointer-events-none"
      />

      {/* Before Image (Clipped on left side) */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <img
          src={beforeImage}
          alt={`${alt} — ${beforeLabel}`}
          draggable={false}
          style={beforeFilter ? { filter: beforeFilter } : undefined}
          className="h-full w-full object-cover object-center"
        />
      </div>

      {/* Labels */}
      <span className="pointer-events-none absolute top-4 left-4 z-10 bg-midnight/80 backdrop-blur-sm text-ivory px-3 py-1.5 text-[10px] sm:text-xs tracking-[0.22em] uppercase border border-champagne/25">
        {beforeLabel}
      </span>
      <span className="pointer-events-none absolute top-4 right-4 z-10 bg-bronze/90 backdrop-blur-sm text-ivory px-3 py-1.5 text-[10px] sm:text-xs tracking-[0.22em] uppercase">
        {afterLabel}
      </span>

      {/* Divider Line + Handle */}
      <div
        className="pointer-events-none absolute inset-y-0 z-20 w-[1.5px] bg-ivory/90 shadow-[0_0_16px_rgba(23,21,19,0.45)]"
        style={{ left: `${position}%` }}
      >
        <div
          className={`absolute top-1/2 -translate-x-1/2 -translate-y-1/2 h-11 w-11 rounded-full bg-ivory text-midnight border border-bronze shadow-lg flex items-center justify-center transition-transform duration-150 ${
            dragging ? "scale-110 bg-champagne" : "group-hover:scale-105"
          }`}
        >
          <MoveHorizontal className="w-4 h-4 text-midnight" strokeWidth={1.6} />
        </div>
      </div>

      {/* Subtle bottom drag hint */}
      <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 z-10 bg-midnight/70 backdrop-blur-sm text-champagne px-3 py-1 text-[10px] tracking-[0.24em] uppercase opacity-80 group-hover:opacity-100 transition-opacity">
        Drag to Compare
      </div>
    </div>
  );
}
