"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.8 });

      tl.fromTo(
        ".hero-left",
        { x: -60, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: "power3.out" },
      )
        .fromTo(
          ".hero-right",
          { x: 60, opacity: 0 },
          { x: 0, opacity: 1, duration: 1, ease: "power3.out" },
          "-=0.8",
        )
        .fromTo(
          ".hero-cta",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" },
          "-=0.3",
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="section-hero"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center"
    >
      {/* Text wrapping around the statue — left and right columns that "hug" the center */}
      <div className="relative z-20 w-full flex items-center justify-between px-10 sm:px-14 lg:px-20">
        {/* Left column — pushed toward center */}
        <div className="hero-left w-[38%] text-right pr-6 md:pr-12" style={{ opacity: 0 }}>
          <span className="text-[10px] tracking-[0.35em] uppercase text-plum/60 block mb-4">
            Δικηγορικό Γραφείο
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extralight leading-[0.95] tracking-[-0.03em] text-navy">
            Δικαιοσύνη
          </h1>
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extralight leading-[0.95] tracking-[-0.03em] text-plum mt-2">
            χωρίς
          </h1>
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extralight leading-[0.95] tracking-[-0.03em] text-navy/40 mt-2">
            συμβιβασμούς.
          </h1>
        </div>

        {/* Center gap — statue lives here (fixed, behind) */}
        <div className="w-[24%]" />

        {/* Right column — pushed toward center */}
        <div className="hero-right w-[38%] pl-6 md:pl-12" style={{ opacity: 0 }}>
          <p className="text-navy/70 text-sm md:text-base leading-relaxed max-w-xs font-light tracking-wide">
            Αταλάντευτη δέσμευση στο δίκαιο. Αδιαπραγμάτευτη αφοσίωση στον εντολέα. Νομική εκπροσώπηση που αλλάζει τα δεδομένα.
          </p>

          <div className="h-px w-12 bg-plum/30 mt-8 mb-8" />

          <p className="text-plum text-xs tracking-[0.2em] uppercase font-light">
            Αντωνία Κοντονή
          </p>
          <p className="text-navy/40 text-[10px] tracking-[0.25em] uppercase mt-1">
            30+ χρόνια εμπειρίας
          </p>
        </div>
      </div>

      {/* Bottom CTA — centered */}
      <div className="hero-cta absolute bottom-20 left-1/2 -translate-x-1/2 z-20 text-center" style={{ opacity: 0 }}>
        <a
          href="#section-about"
          className="inline-flex flex-col items-center gap-3 group"
        >
          <span className="text-[10px] tracking-[0.3em] uppercase text-navy/50 group-hover:text-plum transition-colors duration-500">
            Ανακαλύψτε περισσότερα
          </span>
          <span className="block w-px h-8 bg-plum/30 group-hover:h-12 group-hover:bg-plum transition-all duration-500" />
        </a>
      </div>
    </section>
  );
}
