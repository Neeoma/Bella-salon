"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  Calendar,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Download,
  MessageCircle,
  Search,
  Sparkles,
  User,
  XCircle,
} from "lucide-react";
import {
  formatNaira,
  SALON_INFO,
  SALON_POLICIES,
  SalonService,
  ServiceCategory,
  SERVICES,
  TEAM_MEMBERS,
} from "@/data/salon";
import type { BookingRecord } from "@/lib/storage";

const ALL_TIME_SLOTS = [
  "09:30 AM",
  "10:30 AM",
  "11:00 AM",
  "12:00 PM",
  "01:30 PM",
  "02:00 PM",
  "03:30 PM",
  "04:30 PM",
  "05:30 PM",
  "06:30 PM",
];

const CATEGORIES: Array<"All" | ServiceCategory> = [
  "All",
  "Hair",
  "Nails",
  "Skin",
  "Makeup",
  "Spa",
];

function getAvailableDates(days = 24) {
  const result: Array<{
    iso: string;
    dayName: string;
    dayNum: string;
    monthShort: string;
    isClosed: boolean;
  }> = [];
  const start = new Date();
  start.setDate(start.getDate() + 1);

  for (let i = 0; i < days; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    const iso = d.toISOString().slice(0, 10);
    const dayName = d.toLocaleDateString("en-US", { weekday: "short" });
    const dayNum = d.toLocaleDateString("en-US", { day: "2-digit" });
    const monthShort = d.toLocaleDateString("en-US", { month: "short" });
    result.push({
      iso,
      dayName,
      dayNum,
      monthShort,
      isClosed: d.getDay() === 1, // Closed Mondays
    });
  }
  return result;
}

function downloadICS(booking: BookingRecord) {
  // Parse date + time into local start/end
  const [timePart, meridiem] = booking.time.split(" ");
  const [rawHour, rawMinute] = timePart.split(":").map(Number);
  let hour24 = rawHour;
  if (meridiem === "PM" && rawHour !== 12) hour24 += 12;
  if (meridiem === "AM" && rawHour === 12) hour24 = 0;

  const start = new Date(`${booking.date}T00:00:00`);
  start.setHours(hour24, rawMinute, 0, 0);
  const end = new Date(start.getTime() + booking.durationMinutes * 60 * 1000);

  const fmt = (d: Date) =>
    d
      .toISOString()
      .replace(/[-:]/g, "")
      .replace(/\.\d{3}Z$/, "Z");

  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Bella Salon//Atelier Booking//EN",
    "BEGIN:VEVENT",
    `UID:${booking.reference}@bellasalon.studio`,
    `DTSTAMP:${fmt(new Date())}`,
    `DTSTART:${fmt(start)}`,
    `DTEND:${fmt(end)}`,
    `SUMMARY:Bella Salon — ${booking.serviceName}`,
    `DESCRIPTION:Artisan: ${booking.stylistName}\\nReference: ${booking.reference}\\nAddress: ${SALON_INFO.fullAddress}`,
    `LOCATION:${SALON_INFO.fullAddress}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `Bella-Salon-${booking.reference}.ics`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function BookingWizard() {
  const searchParams = useSearchParams();
  const [mode, setMode] = useState<"book" | "manage">("book");

  // Booking wizard state
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [categoryFilter, setCategoryFilter] = useState<"All" | ServiceCategory>("All");
  const [selectedService, setSelectedService] = useState<SalonService | null>(
    SERVICES[0]
  );
  const [selectedStylistId, setSelectedStylistId] = useState<string>("any");

  const dateOptions = useMemo(() => getAvailableDates(24), []);
  const firstOpenDate = useMemo(
    () => dateOptions.find((d) => !d.isClosed)?.iso ?? dateOptions[0].iso,
    [dateOptions]
  );

  const [selectedDate, setSelectedDate] = useState<string>(firstOpenDate);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [bookingsBySlot, setBookingsBySlot] = useState<
    Array<{ time: string; stylistId: string }>
  >([]);
  const [loadingSlots, setLoadingSlots] = useState(false);

  // Guest info
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [acceptedPolicy, setAcceptedPolicy] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [confirmedBooking, setConfirmedBooking] = useState<BookingRecord | null>(
    null
  );

  // Manage existing reservation state
  const [lookupQuery, setLookupQuery] = useState("");
  const [lookupResults, setLookupResults] = useState<BookingRecord[] | null>(
    null
  );
  const [lookupLoading, setLookupLoading] = useState(false);
  const [lookupError, setLookupError] = useState("");

  // Pre-fill from URL query parameters (?service=...&stylist=...)
  useEffect(() => {
    const svcParam = searchParams.get("service");
    const styParam = searchParams.get("stylist");

    if (svcParam) {
      const found = SERVICES.find(
        (s) => s.slug === svcParam || s.id === svcParam
      );
      if (found) {
        setSelectedService(found);
        setCategoryFilter(found.category);
      }
    }

    if (styParam) {
      const foundSty = TEAM_MEMBERS.find((t) => t.id === styParam);
      if (foundSty) {
        setSelectedStylistId(foundSty.id);
        if (!svcParam) {
          const matchingService = SERVICES.find((s) =>
            foundSty.categories.includes(s.category)
          );
          if (matchingService) {
            setSelectedService(matchingService);
            setCategoryFilter(matchingService.category);
          }
        }
      }
    }
  }, [searchParams]);

  // Eligible stylists for selected service
  const eligibleStylists = useMemo(() => {
    if (!selectedService) return TEAM_MEMBERS;
    return TEAM_MEMBERS.filter((m) =>
      m.categories.includes(selectedService.category)
    );
  }, [selectedService]);

  // Reset stylist if switching to a service outside their discipline
  useEffect(() => {
    if (
      selectedStylistId !== "any" &&
      selectedService &&
      !eligibleStylists.some((s) => s.id === selectedStylistId)
    ) {
      setSelectedStylistId("any");
    }
  }, [selectedService, eligibleStylists, selectedStylistId]);

  // Fetch real-time slot availability whenever date or stylist changes
  useEffect(() => {
    let ignore = false;
    async function loadSlots() {
      setLoadingSlots(true);
      try {
        const res = await fetch(
          `/api/bookings?date=${encodeURIComponent(
            selectedDate
          )}&stylistId=${encodeURIComponent(selectedStylistId)}`
        );
        const data = await res.json();
        if (!ignore && res.ok) {
          setBookedSlots(data.bookedSlots ?? []);
          setBookingsBySlot(data.bookingsBySlot ?? []);
        }
      } catch {
        // Fallback smoothly
      } finally {
        if (!ignore) setLoadingSlots(false);
      }
    }
    loadSlots();
    return () => {
      ignore = true;
    };
  }, [selectedDate, selectedStylistId]);

  const isSlotDisabled = (slot: string) => {
    if (selectedStylistId !== "any") {
      return bookedSlots.includes(slot);
    }
    // For "any", slot is disabled only if ALL eligible stylists are booked at this time
    const bookedEligibleCount = eligibleStylists.filter((st) =>
      bookingsBySlot.some((b) => b.time === slot && b.stylistId === st.id)
    ).length;
    return bookedEligibleCount >= eligibleStylists.length;
  };

  const filteredServices = useMemo(() => {
    if (categoryFilter === "All") return SERVICES;
    return SERVICES.filter((s) => s.category === categoryFilter);
  }, [categoryFilter]);

  const chosenStylistObj = TEAM_MEMBERS.find((t) => t.id === selectedStylistId);

  const handleConfirmBooking = async () => {
    if (!selectedService || !selectedDate || !selectedTime) return;
    setSubmitting(true);
    setSubmitError("");

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceId: selectedService.id,
          stylistId: selectedStylistId,
          date: selectedDate,
          time: selectedTime,
          customerName,
          customerEmail,
          customerPhone,
          notes,
          acceptedPolicy,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setSubmitError(data.error || "Unable to complete booking.");
        setSubmitting(false);
        return;
      }

      setConfirmedBooking(data.booking);
      setStep(5);
    } catch {
      setSubmitError("Connection issue. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    const q = lookupQuery.trim();
    if (!q) return;
    setLookupLoading(true);
    setLookupError("");
    try {
      const isEmail = q.includes("@");
      const param = isEmail
        ? `email=${encodeURIComponent(q)}`
        : `reference=${encodeURIComponent(q)}`;
      const res = await fetch(`/api/bookings?${param}`);
      const data = await res.json();
      if (!res.ok) {
        setLookupError(data.error || "Search failed.");
        return;
      }
      setLookupResults(data.bookings ?? []);
    } catch {
      setLookupError("Unable to reach concierge system.");
    } finally {
      setLookupLoading(false);
    }
  };

  const handleCancelBooking = async (reference: string) => {
    try {
      const res = await fetch("/api/bookings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reference, action: "cancel" }),
      });
      const data = await res.json();
      if (res.ok && lookupResults) {
        setLookupResults(
          lookupResults.map((b) =>
            b.reference === reference ? data.booking : b
          )
        );
      }
    } catch {
      // Ignore error
    }
  };

  const resetWizard = () => {
    setConfirmedBooking(null);
    setSelectedTime("");
    setNotes("");
    setAcceptedPolicy(false);
    setSubmitError("");
    setStep(1);
  };

  const stepLabels = [
    { num: 1, title: "Service" },
    { num: 2, title: "Artisan" },
    { num: 3, title: "Date & Time" },
    { num: 4, title: "Details" },
  ];

  return (
    <div className="space-y-8">
      {/* Mode Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-champagne pb-5">
        <div className="inline-flex bg-champagne/40 p-1 border border-champagne">
          <button
            type="button"
            onClick={() => setMode("book")}
            className={`px-5 py-2.5 text-[11px] uppercase tracking-[0.22em] font-medium transition-colors ${
              mode === "book"
                ? "bg-midnight text-ivory"
                : "text-midnight/75 hover:text-midnight"
            }`}
          >
            New Reservation
          </button>
          <button
            type="button"
            onClick={() => setMode("manage")}
            className={`px-5 py-2.5 text-[11px] uppercase tracking-[0.22em] font-medium transition-colors ${
              mode === "manage"
                ? "bg-midnight text-ivory"
                : "text-midnight/75 hover:text-midnight"
            }`}
          >
            Manage Reservation
          </button>
        </div>

        <p className="text-xs text-taupe">
          Prefer voice or text assistance?{" "}
          <a
            href={`https://wa.me/${SALON_INFO.whatsappNumber}?text=${encodeURIComponent(
              "Hello Bella Salon Concierge, I would like help scheduling an appointment."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-bronze-dark underline underline-offset-4 hover:text-midnight"
          >
            Message WhatsApp Concierge
          </a>
        </p>
      </div>

      {mode === "manage" ? (
        <div className="max-w-2xl mx-auto bg-white/80 border border-champagne p-6 sm:p-10 space-y-6">
          <div className="space-y-2">
            <p className="text-[10px] uppercase tracking-[0.28em] text-bronze-dark">
              Reservation Lookup
            </p>
            <h2 className="font-serif text-3xl text-midnight">
              View or Modify Your Appointment
            </h2>
            <p className="text-sm text-taupe">
              Enter your booking reference code (e.g.,{" "}
              <span className="font-medium text-midnight">BL-2481</span>) or
              the email address used during reservation.
            </p>
          </div>

          <form onSubmit={handleLookup} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-taupe absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={lookupQuery}
                onChange={(e) => setLookupQuery(e.target.value)}
                placeholder="Reference code (BL-2481) or email..."
                className="w-full pl-10 pr-4 py-3.5 bg-ivory border border-champagne text-sm text-midnight focus:outline-none focus:border-bronze"
              />
            </div>
            <button
              type="submit"
              disabled={lookupLoading}
              className="px-7 py-3.5 bg-midnight text-ivory text-[11px] uppercase tracking-[0.22em] font-medium hover:bg-bronze transition-colors disabled:opacity-60"
            >
              {lookupLoading ? "Searching..." : "Locate"}
            </button>
          </form>

          {lookupError && (
            <p className="text-xs text-red-700 bg-red-50 border border-red-200 p-3">
              {lookupError}
            </p>
          )}

          {lookupResults !== null && (
            <div className="space-y-4 pt-2">
              {lookupResults.length === 0 ? (
                <div className="p-6 bg-ivory border border-champagne text-center space-y-2">
                  <p className="font-serif text-xl text-midnight">
                    No matching appointments found
                  </p>
                  <p className="text-xs text-taupe">
                    Verify your reference code or call our concierge at{" "}
                    {SALON_INFO.phoneDisplay}.
                  </p>
                </div>
              ) : (
                lookupResults.map((bk) => (
                  <div
                    key={bk.id}
                    className="p-5 bg-ivory border border-champagne flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2.5">
                        <span className="text-xs font-semibold tracking-[0.2em] uppercase text-bronze-dark">
                          {bk.reference}
                        </span>
                        <span
                          className={`px-2 py-0.5 text-[10px] uppercase tracking-[0.18em] ${
                            bk.status === "confirmed"
                              ? "bg-emerald-900/10 text-emerald-900 border border-emerald-800/20"
                              : "bg-red-900/10 text-red-800 border border-red-800/20"
                          }`}
                        >
                          {bk.status}
                        </span>
                      </div>
                      <h3 className="font-serif text-xl text-midnight">
                        {bk.serviceName}
                      </h3>
                      <p className="text-xs text-taupe">
                        With {bk.stylistName} · {bk.date} at {bk.time} (
                        {bk.durationMinutes} min · {formatNaira(bk.price)})
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      {bk.status === "confirmed" && (
                        <>
                          <button
                            type="button"
                            onClick={() => downloadICS(bk)}
                            className="px-3.5 py-2 border border-champagne text-[10px] uppercase tracking-[0.18em] text-midnight hover:border-bronze transition-colors"
                          >
                            .ICS Calendar
                          </button>
                          <button
                            type="button"
                            onClick={() => handleCancelBooking(bk.reference)}
                            className="inline-flex items-center gap-1 px-3.5 py-2 border border-red-300 text-[10px] uppercase tracking-[0.18em] text-red-800 hover:bg-red-50 transition-colors"
                          >
                            <XCircle className="w-3.5 h-3.5" />
                            Cancel
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left: Stepper + Interactive Stage */}
          <div className="lg:col-span-8 space-y-6">
            {/* Step Progress Header */}
            {step < 5 && (
              <div className="grid grid-cols-4 gap-2 sm:gap-4">
                {stepLabels.map((s) => {
                  const isActive = step === s.num;
                  const isDone = step > s.num;
                  return (
                    <button
                      key={s.num}
                      type="button"
                      disabled={s.num > step}
                      onClick={() => {
                        if (s.num < step) setStep(s.num as 1 | 2 | 3 | 4);
                      }}
                      className={`text-left p-3 sm:p-4 border transition-all ${
                        isActive
                          ? "border-midnight bg-midnight text-ivory"
                          : isDone
                            ? "border-bronze/60 bg-champagne/35 text-midnight cursor-pointer hover:bg-champagne/55"
                            : "border-champagne bg-white/50 text-taupe cursor-not-allowed"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span
                          className={`text-[10px] tracking-[0.24em] uppercase ${
                            isActive ? "text-bronze-light" : "text-bronze-dark"
                          }`}
                        >
                          0{s.num}
                        </span>
                        {isDone && <Check className="w-3.5 h-3.5 text-bronze-dark" />}
                      </div>
                      <p className="font-serif text-base sm:text-lg leading-tight">
                        {s.title}
                      </p>
                    </button>
                  );
                })}
              </div>
            )}

            <AnimatePresence mode="wait">
              {/* STEP 1: SERVICE */}
              {step === 1 && (
                <motion.div
                  key="step-1"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white/80 border border-champagne p-5 sm:p-8 space-y-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.28em] text-bronze-dark">
                        Step 01 · Ritual Selection
                      </p>
                      <h2 className="font-serif text-3xl text-midnight mt-1">
                        Select Your Experience
                      </h2>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {CATEGORIES.map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => setCategoryFilter(cat)}
                          className={`px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] transition-colors border ${
                            categoryFilter === cat
                              ? "bg-midnight text-ivory border-midnight"
                              : "bg-ivory text-midnight/80 border-champagne hover:border-bronze"
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[540px] overflow-y-auto pr-1">
                    {filteredServices.map((svc) => {
                      const active = selectedService?.id === svc.id;
                      return (
                        <button
                          key={svc.id}
                          type="button"
                          onClick={() => setSelectedService(svc)}
                          className={`text-left p-4 border transition-all flex gap-4 items-start ${
                            active
                              ? "border-midnight bg-champagne/40 ring-1 ring-midnight"
                              : "border-champagne bg-ivory/60 hover:border-bronze"
                          }`}
                        >
                          <img
                            src={svc.image}
                            alt={svc.name}
                            className="w-20 h-20 object-cover shrink-0 bg-champagne/30"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-[9px] uppercase tracking-[0.22em] text-bronze-dark">
                                {svc.category}
                              </span>
                              <span className="text-xs font-semibold text-midnight">
                                {formatNaira(svc.price)}
                              </span>
                            </div>
                            <h3 className="font-serif text-lg text-midnight leading-snug mt-0.5">
                              {svc.name}
                            </h3>
                            <p className="text-[11px] text-taupe line-clamp-2 mt-1">
                              {svc.tagline}
                            </p>
                            <p className="text-[10px] text-midnight/70 mt-2 inline-flex items-center gap-1">
                              <Clock className="w-3 h-3 text-bronze-dark" />
                              {svc.durationMinutes} min
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex justify-end pt-2 border-t border-champagne">
                    <button
                      type="button"
                      disabled={!selectedService}
                      onClick={() => setStep(2)}
                      className="inline-flex items-center gap-2 px-8 py-3.5 bg-midnight text-ivory text-[11px] uppercase tracking-[0.22em] font-medium hover:bg-bronze transition-colors disabled:opacity-40"
                    >
                      Continue to Artisan
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 2: STYLIST */}
              {step === 2 && (
                <motion.div
                  key="step-2"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white/80 border border-champagne p-5 sm:p-8 space-y-6"
                >
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.28em] text-bronze-dark">
                      Step 02 · Preferred Specialist
                    </p>
                    <h2 className="font-serif text-3xl text-midnight mt-1">
                      Choose Your {selectedService?.category} Artisan
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* First Available Option */}
                    <button
                      type="button"
                      onClick={() => setSelectedStylistId("any")}
                      className={`text-left p-5 border transition-all flex items-start gap-4 ${
                        selectedStylistId === "any"
                          ? "border-midnight bg-champagne/40 ring-1 ring-midnight"
                          : "border-champagne bg-ivory/60 hover:border-bronze"
                      }`}
                    >
                      <div className="w-16 h-16 shrink-0 bg-midnight text-champagne flex items-center justify-center">
                        <Sparkles className="w-6 h-6 text-bronze" strokeWidth={1.4} />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.22em] text-bronze-dark">
                          Fastest Availability
                        </p>
                        <h3 className="font-serif text-xl text-midnight mt-0.5">
                          First Available Master Artisan
                        </h3>
                        <p className="text-xs text-taupe mt-1">
                          Paired automatically with our highest-rated{" "}
                          {selectedService?.category.toLowerCase()} specialist open
                          at your time.
                        </p>
                      </div>
                    </button>

                    {eligibleStylists.map((member) => {
                      const active = selectedStylistId === member.id;
                      return (
                        <button
                          key={member.id}
                          type="button"
                          onClick={() => setSelectedStylistId(member.id)}
                          className={`text-left p-5 border transition-all flex items-start gap-4 ${
                            active
                              ? "border-midnight bg-champagne/40 ring-1 ring-midnight"
                              : "border-champagne bg-ivory/60 hover:border-bronze"
                          }`}
                        >
                          <img
                            src={member.image}
                            alt={member.name}
                            className="w-16 h-16 object-cover object-top shrink-0"
                          />
                          <div>
                            <p className="text-[10px] uppercase tracking-[0.2em] text-bronze-dark">
                              {member.yearsExperience} Years Experience
                            </p>
                            <h3 className="font-serif text-xl text-midnight mt-0.5">
                              {member.name}
                            </h3>
                            <p className="text-[11px] text-taupe">{member.role}</p>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {member.specialties.slice(0, 2).map((sp) => (
                                <span
                                  key={sp}
                                  className="text-[9px] px-2 py-0.5 bg-champagne/50 text-midnight/80"
                                >
                                  {sp}
                                </span>
                              ))}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-champagne">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-taupe hover:text-midnight"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="inline-flex items-center gap-2 px-8 py-3.5 bg-midnight text-ivory text-[11px] uppercase tracking-[0.22em] font-medium hover:bg-bronze transition-colors"
                    >
                      Select Date & Time
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: DATE & TIME */}
              {step === 3 && (
                <motion.div
                  key="step-3"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white/80 border border-champagne p-5 sm:p-8 space-y-7"
                >
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.28em] text-bronze-dark">
                      Step 03 · Sanctuary Schedule
                    </p>
                    <h2 className="font-serif text-3xl text-midnight mt-1">
                      Select Your Preferred Date & Time
                    </h2>
                  </div>

                  {/* Date Strip */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-[10px] uppercase tracking-[0.24em] text-midnight font-semibold">
                        Available Dates (Closed Mondays)
                      </label>
                      <span className="text-xs text-bronze-dark font-medium">
                        {new Date(`${selectedDate}T12:00:00`).toLocaleDateString(
                          "en-US",
                          {
                            weekday: "long",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </span>
                    </div>
                    <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
                      {dateOptions.slice(0, 16).map((d) => {
                        const active = selectedDate === d.iso;
                        return (
                          <button
                            key={d.iso}
                            type="button"
                            disabled={d.isClosed}
                            onClick={() => {
                              setSelectedDate(d.iso);
                              setSelectedTime("");
                            }}
                            className={`py-2.5 px-2 border text-center transition-all ${
                              d.isClosed
                                ? "bg-champagne/15 border-champagne/40 text-taupe/45 cursor-not-allowed line-through"
                                : active
                                  ? "bg-midnight text-ivory border-midnight"
                                  : "bg-ivory border-champagne text-midnight hover:border-bronze"
                            }`}
                          >
                            <span className="block text-[9px] uppercase tracking-[0.18em] opacity-75">
                              {d.dayName}
                            </span>
                            <span className="block font-serif text-lg leading-tight mt-0.5">
                              {d.dayNum}
                            </span>
                            <span className="block text-[9px] uppercase tracking-[0.15em] opacity-75">
                              {d.monthShort}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Time Slots */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-[10px] uppercase tracking-[0.24em] text-midnight font-semibold">
                        Live Time Slots
                      </label>
                      {loadingSlots && (
                        <span className="text-[11px] text-taupe">
                          Checking availability...
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                      {ALL_TIME_SLOTS.map((slot) => {
                        const disabled = isSlotDisabled(slot);
                        const active = selectedTime === slot;
                        return (
                          <button
                            key={slot}
                            type="button"
                            disabled={disabled}
                            onClick={() => setSelectedTime(slot)}
                            className={`py-3 px-3 border text-xs tracking-[0.12em] font-medium transition-all ${
                              disabled
                                ? "bg-champagne/20 border-champagne/40 text-taupe/50 cursor-not-allowed line-through"
                                : active
                                  ? "bg-bronze text-ivory border-bronze shadow-sm"
                                  : "bg-ivory border-champagne text-midnight hover:border-midnight"
                            }`}
                          >
                            {slot}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-champagne">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-taupe hover:text-midnight"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Back
                    </button>
                    <button
                      type="button"
                      disabled={!selectedTime}
                      onClick={() => setStep(4)}
                      className="inline-flex items-center gap-2 px-8 py-3.5 bg-midnight text-ivory text-[11px] uppercase tracking-[0.22em] font-medium hover:bg-bronze transition-colors disabled:opacity-40"
                    >
                      Guest Details
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 4: GUEST DETAILS & CONFIRM */}
              {step === 4 && (
                <motion.div
                  key="step-4"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white/80 border border-champagne p-5 sm:p-8 space-y-6"
                >
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.28em] text-bronze-dark">
                      Step 04 · Guest Information
                    </p>
                    <h2 className="font-serif text-3xl text-midnight mt-1">
                      Complete Your Reservation
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="booking-name"
                        className="block text-[10px] uppercase tracking-[0.22em] text-midnight font-semibold mb-1.5"
                      >
                        Full Name *
                      </label>
                      <input
                        id="booking-name"
                        type="text"
                        required
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="e.g., Adaeze Okafor"
                        className="w-full px-4 py-3 bg-ivory border border-champagne text-sm text-midnight focus:outline-none focus:border-bronze"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="booking-email"
                        className="block text-[10px] uppercase tracking-[0.22em] text-midnight font-semibold mb-1.5"
                      >
                        Email Address *
                      </label>
                      <input
                        id="booking-email"
                        type="email"
                        required
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        placeholder="you@domain.com"
                        className="w-full px-4 py-3 bg-ivory border border-champagne text-sm text-midnight focus:outline-none focus:border-bronze"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="booking-phone"
                        className="block text-[10px] uppercase tracking-[0.22em] text-midnight font-semibold mb-1.5"
                      >
                        Mobile / WhatsApp Number *
                      </label>
                      <input
                        id="booking-phone"
                        type="tel"
                        required
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder="+234 809 555 0192"
                        className="w-full px-4 py-3 bg-ivory border border-champagne text-sm text-midnight focus:outline-none focus:border-bronze"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="booking-notes"
                        className="block text-[10px] uppercase tracking-[0.22em] text-midnight font-semibold mb-1.5"
                      >
                        Styling Preferences, Sensitivities or Beverage Note
                      </label>
                      <textarea
                        id="booking-notes"
                        rows={3}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Share hair history, allergies, quiet-chair preference, or celebration notes..."
                        className="w-full px-4 py-3 bg-ivory border border-champagne text-sm text-midnight focus:outline-none focus:border-bronze resize-none"
                      />
                    </div>
                  </div>

                  <label className="flex items-start gap-3 p-4 bg-ivory border border-champagne cursor-pointer">
                    <input
                      type="checkbox"
                      checked={acceptedPolicy}
                      onChange={(e) => setAcceptedPolicy(e.target.checked)}
                      className="mt-1 accent-bronze w-4 h-4 shrink-0"
                    />
                    <span className="text-xs text-taupe leading-relaxed">
                      I acknowledge Bella Salon&apos;s{" "}
                      <strong className="text-midnight font-medium">
                        24-hour rescheduling & cancellation policy
                      </strong>
                      . No prepayment is charged online today—payment is settled
                      at the sanctuary following your ritual.
                    </span>
                  </label>

                  {submitError && (
                    <p className="text-xs text-red-700 bg-red-50 border border-red-200 p-3.5">
                      {submitError}
                    </p>
                  )}

                  <div className="flex items-center justify-between pt-2 border-t border-champagne">
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-taupe hover:text-midnight"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Back
                    </button>
                    <button
                      type="button"
                      disabled={
                        submitting ||
                        !customerName.trim() ||
                        !customerEmail.trim() ||
                        !customerPhone.trim() ||
                        !acceptedPolicy
                      }
                      onClick={handleConfirmBooking}
                      className="inline-flex items-center gap-2.5 px-8 py-4 bg-bronze text-ivory text-[11px] uppercase tracking-[0.24em] font-medium hover:bg-midnight transition-colors disabled:opacity-45"
                    >
                      {submitting ? "Confirming..." : "Confirm Appointment"}
                      <Check className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 5: CONFIRMATION PASS */}
              {step === 5 && confirmedBooking && (
                <motion.div
                  key="step-5"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-midnight text-ivory border border-bronze/50 p-6 sm:p-10 space-y-8"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-champagne/15 pb-6">
                    <div className="flex items-center gap-3.5">
                      <CheckCircle2
                        className="w-9 h-9 text-bronze-light shrink-0"
                        strokeWidth={1.4}
                      />
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.28em] text-bronze-light">
                          Reservation Confirmed
                        </p>
                        <h2 className="font-serif text-3xl text-ivory mt-0.5">
                          We Await Your Arrival, {confirmedBooking.customerName.split(" ")[0]}
                        </h2>
                      </div>
                    </div>

                    <div className="bg-espresso px-4 py-2.5 border border-bronze/35 text-center">
                      <span className="block text-[9px] uppercase tracking-[0.26em] text-champagne/65">
                        Reference
                      </span>
                      <span className="font-serif text-2xl tracking-wider text-bronze-light">
                        {confirmedBooking.reference}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase tracking-[0.22em] text-champagne/60">
                        Selected Treatment
                      </span>
                      <p className="font-serif text-xl text-ivory">
                        {confirmedBooking.serviceName}
                      </p>
                      <p className="text-xs text-champagne/75">
                        {confirmedBooking.durationMinutes} Minutes ·{" "}
                        {formatNaira(confirmedBooking.price)}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] uppercase tracking-[0.22em] text-champagne/60">
                        Assigned Artisan
                      </span>
                      <p className="font-serif text-xl text-ivory">
                        {confirmedBooking.stylistName}
                      </p>
                      <p className="text-xs text-champagne/75">
                        {confirmedBooking.category} Atelier Specialist
                      </p>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] uppercase tracking-[0.22em] text-champagne/60">
                        Date & Time
                      </span>
                      <p className="font-serif text-xl text-ivory">
                        {new Date(
                          `${confirmedBooking.date}T12:00:00`
                        ).toLocaleDateString("en-US", {
                          weekday: "long",
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                      <p className="text-xs text-bronze-light">
                        {confirmedBooking.time}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] uppercase tracking-[0.22em] text-champagne/60">
                        Sanctuary Location
                      </span>
                      <p className="text-sm text-ivory">
                        {SALON_INFO.addressLine1}
                      </p>
                      <p className="text-xs text-champagne/75">
                        {SALON_INFO.addressLine2}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => downloadICS(confirmedBooking)}
                      className="inline-flex items-center gap-2 px-5 py-3 bg-ivory text-midnight text-[10px] uppercase tracking-[0.22em] font-medium hover:bg-champagne transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Add to Calendar (.ics)
                    </button>

                    <a
                      href={`https://wa.me/${
                        SALON_INFO.whatsappNumber
                      }?text=${encodeURIComponent(
                        `Hello Bella Salon! My reservation ${confirmedBooking.reference} for ${confirmedBooking.serviceName} on ${confirmedBooking.date} at ${confirmedBooking.time} is confirmed.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-3 border border-bronze text-ivory text-[10px] uppercase tracking-[0.22em] hover:bg-bronze transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      Share via WhatsApp
                    </a>

                    <button
                      type="button"
                      onClick={resetWizard}
                      className="ml-auto text-[10px] uppercase tracking-[0.22em] text-champagne/70 hover:text-ivory underline underline-offset-4"
                    >
                      Book Another Treatment
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right: Live Reservation Summary Sidebar */}
          <aside className="lg:col-span-4 space-y-5 lg:sticky lg:top-28">
            <div className="bg-midnight text-ivory p-6 sm:p-7 border border-bronze/30 space-y-5">
              <div className="border-b border-champagne/15 pb-4">
                <p className="text-[9px] uppercase tracking-[0.28em] text-bronze">
                  Your Itinerary
                </p>
                <h3 className="font-serif text-2xl text-ivory mt-1">
                  Booking Summary
                </h3>
              </div>

              {selectedService ? (
                <div className="space-y-4">
                  <div className="flex gap-3.5 items-center">
                    <img
                      src={selectedService.image}
                      alt={selectedService.name}
                      className="w-16 h-16 object-cover shrink-0 border border-champagne/20"
                    />
                    <div>
                      <span className="text-[9px] uppercase tracking-[0.22em] text-bronze-light">
                        {selectedService.category}
                      </span>
                      <p className="font-serif text-lg leading-snug text-ivory">
                        {selectedService.name}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2.5 pt-2 border-t border-champagne/15 text-xs">
                    <div className="flex items-center justify-between text-champagne/80">
                      <span className="inline-flex items-center gap-2">
                        <User className="w-3.5 h-3.5 text-bronze" />
                        Artisan
                      </span>
                      <span className="text-ivory font-medium">
                        {chosenStylistObj
                          ? chosenStylistObj.name
                          : "First Available Master"}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-champagne/80">
                      <span className="inline-flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-bronze" />
                        Date
                      </span>
                      <span className="text-ivory font-medium">
                        {selectedDate}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-champagne/80">
                      <span className="inline-flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-bronze" />
                        Time · Duration
                      </span>
                      <span className="text-ivory font-medium">
                        {selectedTime || "Pending"} ·{" "}
                        {selectedService.durationMinutes} min
                      </span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-champagne/15 flex items-baseline justify-between">
                    <span className="text-[10px] uppercase tracking-[0.24em] text-champagne/65">
                      Estimated Total
                    </span>
                    <span className="font-serif text-3xl text-bronze-light">
                      {formatNaira(selectedService.price)}
                    </span>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-champagne/70">
                  Select a treatment to begin crafting your sanctuary visit.
                </p>
              )}
            </div>

            <div className="bg-champagne/35 border border-champagne p-5 space-y-2.5">
              <p className="text-[10px] uppercase tracking-[0.24em] text-bronze-dark font-semibold">
                {SALON_POLICIES[0].title}
              </p>
              <p className="text-xs text-taupe leading-relaxed">
                {SALON_POLICIES[0].content}
              </p>
              <Link
                href="/contact"
                className="inline-block text-[10px] uppercase tracking-[0.2em] text-midnight underline underline-offset-4 pt-1 hover:text-bronze-dark"
              >
                Full Salon Etiquette →
              </Link>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
