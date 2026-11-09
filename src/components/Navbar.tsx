"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Calendar } from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";
import { SALON_INFO } from "@/data/salon";

const NAV_LINKS = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Lookbook" },
  { href: "/team", label: "Team" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 48);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const useTransparentHeroStyle = isHome && !scrolled && !mobileOpen;

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          useTransparentHeroStyle
            ? "bg-gradient-to-b from-midnight/70 via-midnight/35 to-transparent border-b border-ivory/15 text-ivory"
            : "bg-ivory/95 backdrop-blur-md border-b border-champagne text-midnight shadow-[0_8px_32px_rgba(23,21,19,0.05)]"
        }`}
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="flex h-20 items-center justify-between">
            <Link
              href="/"
              aria-label="Bella Salon Home"
              className="relative z-10 focus:outline-none"
            >
              <BrandLogo variant={useTransparentHeroStyle ? "light" : "dark"} />
            </Link>

            {/* Desktop Nav */}
            <nav
              aria-label="Primary Navigation"
              className="hidden lg:flex items-center gap-9"
            >
              {NAV_LINKS.map((link) => {
                const active =
                  pathname === link.href ||
                  (link.href !== "/" && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative text-[11px] uppercase tracking-[0.24em] font-medium transition-colors duration-300 py-1 ${
                      useTransparentHeroStyle
                        ? active
                          ? "text-champagne"
                          : "text-ivory/85 hover:text-ivory"
                        : active
                          ? "text-bronze-dark"
                          : "text-midnight/80 hover:text-midnight"
                    }`}
                  >
                    {link.label}
                    {active && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute left-0 right-0 -bottom-0.5 h-[1.5px] bg-bronze"
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-4">
              <Link
                href="/booking"
                className={`inline-flex items-center gap-2.5 px-6 py-3 text-[11px] uppercase tracking-[0.22em] font-medium transition-all duration-300 ${
                  useTransparentHeroStyle
                    ? "bg-ivory text-midnight hover:bg-champagne"
                    : "bg-midnight text-ivory hover:bg-bronze"
                }`}
              >
                <Calendar className="w-3.5 h-3.5" strokeWidth={1.5} />
                Book Experience
              </Link>
            </div>

            {/* Mobile Toggle */}
            <div className="flex lg:hidden items-center gap-3">
              <Link
                href="/booking"
                className={`px-3.5 py-2 text-[10px] uppercase tracking-[0.2em] font-medium transition-colors ${
                  useTransparentHeroStyle
                    ? "bg-ivory text-midnight"
                    : "bg-midnight text-ivory"
                }`}
              >
                Book
              </Link>
              <button
                type="button"
                aria-label={mobileOpen ? "Close menu" : "Open navigation menu"}
                aria-expanded={mobileOpen}
                onClick={() => setMobileOpen((o) => !o)}
                className={`p-2 transition-colors ${
                  useTransparentHeroStyle ? "text-ivory" : "text-midnight"
                }`}
              >
                {mobileOpen ? (
                  <X className="w-6 h-6" strokeWidth={1.5} />
                ) : (
                  <Menu className="w-6 h-6" strokeWidth={1.5} />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Editorial Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-midnight text-ivory pt-24 pb-10 px-6 flex flex-col justify-between overflow-y-auto lg:hidden"
          >
            <div className="space-y-2 mt-4">
              <p className="text-[10px] uppercase tracking-[0.3em] text-bronze mb-6">
                Navigation · Bella Atelier
              </p>
              {[{ href: "/", label: "Home" }, ...NAV_LINKS].map((item, idx) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * idx }}
                >
                  <Link
                    href={item.href}
                    className={`block py-3.5 border-b border-champagne/10 font-serif text-3xl tracking-wide transition-colors ${
                      pathname === item.href
                        ? "text-bronze-light italic"
                        : "text-ivory hover:text-champagne"
                    }`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="pt-8 space-y-5">
              <Link
                href="/booking"
                className="flex items-center justify-center gap-2.5 w-full py-4 bg-bronze text-ivory text-xs uppercase tracking-[0.24em] font-medium"
              >
                <Calendar className="w-4 h-4" strokeWidth={1.5} />
                Book Your Experience
              </Link>
              <div className="flex flex-col gap-1 text-xs text-champagne/70">
                <span>{SALON_INFO.fullAddress}</span>
                <span>{SALON_INFO.phoneDisplay}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
