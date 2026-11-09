"use client";

import React, { useState } from "react";
import { CheckCircle2, ChevronDown, Send } from "lucide-react";
import { SALON_POLICIES } from "@/data/salon";

const INQUIRY_TYPES = [
  "General Concierge",
  "Bridal Party & Private Suite",
  "Editorial & Runway Booking",
  "Gift Cards & Bespoke Packages",
];

export function ContactFormSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [inquiryType, setInquiryType] = useState(INQUIRY_TYPES[0]);
  const [message, setMessage] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [ticketCode, setTicketCode] = useState("");

  const [openPolicyIdx, setOpenPolicyIdx] = useState<number | null>(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, inquiryType, message }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Unable to send inquiry.");
        return;
      }
      setTicketCode(data.inquiry?.ticketCode || "INQ-CONFIRMED");
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch {
      setError("Network issue. Please try again or reach us on WhatsApp.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-12">
      {/* Contact Form */}
      <div className="bg-white/85 border border-champagne p-6 sm:p-10 space-y-6">
        <div className="space-y-1.5">
          <p className="text-[10px] uppercase tracking-[0.3em] text-bronze-dark font-semibold">
            Direct Message
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl text-midnight">
            Private Concierge Inquiry
          </h2>
          <p className="text-xs sm:text-sm text-taupe">
            Planning bridal preparations, private suite buy-outs, or tailored
            rituals? Share your note below.
          </p>
        </div>

        {ticketCode ? (
          <div className="p-8 bg-midnight text-ivory border border-bronze/50 space-y-4">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-7 h-7 text-bronze-light" />
              <div>
                <p className="text-[10px] uppercase tracking-[0.26em] text-bronze-light">
                  Inquiry Received · {ticketCode}
                </p>
                <h3 className="font-serif text-2xl">
                  Our Concierge Team Will Respond Shortly
                </h3>
              </div>
            </div>
            <p className="text-xs text-champagne/80 leading-relaxed">
              Thank you for contacting Bella Salon. Expect a thoughtful reply
              within two business hours.
            </p>
            <button
              type="button"
              onClick={() => setTicketCode("")}
              className="text-[10px] uppercase tracking-[0.22em] text-bronze-light underline underline-offset-4"
            >
              Send Another Inquiry
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-[10px] uppercase tracking-[0.22em] text-midnight font-semibold mb-1.5"
                >
                  Full Name *
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full px-4 py-3 bg-ivory border border-champagne text-sm text-midnight focus:outline-none focus:border-bronze"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-[10px] uppercase tracking-[0.22em] text-midnight font-semibold mb-1.5"
                >
                  Email Address *
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@domain.com"
                  className="w-full px-4 py-3 bg-ivory border border-champagne text-sm text-midnight focus:outline-none focus:border-bronze"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-phone"
                  className="block text-[10px] uppercase tracking-[0.22em] text-midnight font-semibold mb-1.5"
                >
                  Phone / WhatsApp
                </label>
                <input
                  id="contact-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+234 809 555 0140"
                  className="w-full px-4 py-3 bg-ivory border border-champagne text-sm text-midnight focus:outline-none focus:border-bronze"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-type"
                  className="block text-[10px] uppercase tracking-[0.22em] text-midnight font-semibold mb-1.5"
                >
                  Inquiry Category
                </label>
                <select
                  id="contact-type"
                  value={inquiryType}
                  onChange={(e) => setInquiryType(e.target.value)}
                  className="w-full px-4 py-3 bg-ivory border border-champagne text-sm text-midnight focus:outline-none focus:border-bronze"
                >
                  {INQUIRY_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="contact-message"
                className="block text-[10px] uppercase tracking-[0.22em] text-midnight font-semibold mb-1.5"
              >
                Your Message *
              </label>
              <textarea
                id="contact-message"
                rows={4}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell us about your desired dates, services, or celebration..."
                className="w-full px-4 py-3 bg-ivory border border-champagne text-sm text-midnight focus:outline-none focus:border-bronze resize-none"
              />
            </div>

            {error && (
              <p className="text-xs text-red-700 bg-red-50 border border-red-200 p-3">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-2.5 px-8 py-4 bg-midnight text-ivory text-[11px] uppercase tracking-[0.24em] font-medium hover:bg-bronze transition-colors disabled:opacity-60"
            >
              <Send className="w-3.5 h-3.5" />
              {submitting ? "Sending Inquiry..." : "Send Concierge Inquiry"}
            </button>
          </form>
        )}
      </div>

      {/* Policies Accordion */}
      <div className="space-y-4">
        <p className="text-[10px] uppercase tracking-[0.3em] text-bronze-dark font-semibold">
          Sanctuary Etiquette & Policies
        </p>
        <div className="border-t border-champagne">
          {SALON_POLICIES.map((pol, idx) => {
            const isOpen = openPolicyIdx === idx;
            return (
              <div key={pol.title} className="border-b border-champagne">
                <button
                  type="button"
                  onClick={() => setOpenPolicyIdx(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  className="w-full py-4 flex items-center justify-between text-left gap-4"
                >
                  <span className="font-serif text-xl text-midnight">
                    {pol.title}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-bronze-dark transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <p className="pb-4 text-xs sm:text-sm text-taupe leading-relaxed">
                    {pol.content}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
