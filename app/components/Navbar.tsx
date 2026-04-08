"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export interface NavLink {
  label: string;
  href: string;
}

export const NAV_LINKS: NavLink[] = [
  { label: "Αρχικη", href: "#section-hero" },
  { label: "Σχετικα", href: "#section-about" },
  { label: "Υπηρεσιες", href: "#section-services" },
  { label: "Επικοινωνια", href: "#section-contact" },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", delay: 0.5 },
    );
  }, []);

  useEffect(() => {
    if (!overlayRef.current || !linksRef.current) return;

    if (open) {
      // Lock scroll & notify statue
      document.body.style.overflow = "hidden";
      window.dispatchEvent(new CustomEvent("menu-toggle", { detail: { open: true } }));

      gsap.to(overlayRef.current, {
        opacity: 1,
        duration: 0.5,
        ease: "power3.out",
        onStart: () => {
          overlayRef.current!.style.pointerEvents = "auto";
        },
      });
      gsap.fromTo(
        linksRef.current.children,
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.08,
          delay: 0.2,
        },
      );
    } else {
      // Unlock scroll & notify statue
      document.body.style.overflow = "";
      window.dispatchEvent(new CustomEvent("menu-toggle", { detail: { open: false } }));

      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.4,
        ease: "power2.in",
        onComplete: () => {
          if (overlayRef.current) overlayRef.current.style.pointerEvents = "none";
        },
      });
    }
  }, [open]);

  const handleLinkClick = () => {
    setOpen(false);
  };

  return (
    <>
      {/* Top bar */}
      <nav
        ref={navRef}
        className="fixed top-0 left-0 w-full z-50 bg-navy"
      >
        <div className="w-full px-6 sm:px-14 lg:px-20 py-4 md:py-6 flex items-center justify-between">
          <a href="#section-hero" className="group">
            <p className="text-cream text-sm font-semibold tracking-[0.25em] uppercase">
              Αντωνια Κοντονη
            </p>
            <p className="text-cream/60 text-[10px] tracking-[0.3em] uppercase">
              Δικηγορος
            </p>
          </a>

          {/* Menu button — 2 lines */}
          <button
            onClick={() => setOpen((prev) => !prev)}
            className="relative z-50 flex flex-col justify-center items-center gap-[7px] w-10 h-10 cursor-pointer"
            aria-label="Toggle menu"
          >
            <span
              className={`block w-7 h-[2px] bg-cream transition-all duration-300 ${
                open ? "rotate-45 translate-y-[4.5px]" : ""
              }`}
            />
            <span
              className={`block w-7 h-[2px] bg-cream transition-all duration-300 ${
                open ? "-rotate-45 -translate-y-[4.5px]" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Fullscreen overlay — below the statue */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[9] bg-navy opacity-0 pointer-events-none"
      >
        {/* Links on the left side */}
        <div
          ref={linksRef}
          className="absolute left-0 top-0 h-full flex flex-col justify-center items-start pl-14 sm:pl-20 lg:pl-28 gap-8"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={handleLinkClick}
              className="text-cream text-3xl sm:text-4xl lg:text-5xl font-light tracking-[0.15em] uppercase hover:text-cream/60 transition-colors duration-300"
              style={{ opacity: 0 }}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Map on the right side */}
        <div className="hidden md:flex absolute right-0 top-0 h-full w-[40%] items-center justify-center pr-14 lg:pr-28">
          <div className="w-full max-w-md aspect-square overflow-hidden opacity-60 rounded-2xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3144.527!2d23.7412!3d37.9762!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14a1bd3880aa1d3f%3A0x1d8e0e0e0e0e0e0e!2zzpvOtc-Jz4YuIM6Szrz-Cy4gz6POv8-Gzq_Osc-CIDQyLCDOkc64zq7Ovc6x!5e0!3m2!1sel!2sgr!4v1"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "invert(1) hue-rotate(180deg) grayscale(0.3)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Χάρτης γραφείου"
            />
          </div>
        </div>
      </div>
    </>
  );
}
