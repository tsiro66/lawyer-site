"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-reveal",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="section-contact"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center py-32"
    >
      <div className="relative z-20 w-full max-w-7xl px-6 md:px-0 flex flex-col md:flex-row gap-16 md:gap-48">
        {/* Left: Contact form — right-aligned (toward center) */}
        <div className="w-full md:w-[35%] md:ml-auto ">
          <span className="contact-reveal text-[10px] tracking-[0.35em] uppercase text-plum/60 block mb-6 text-center md:text-right">
            Επικοινωνια
          </span>

          <h2 className="contact-reveal text-4xl md:text-5xl lg:text-6xl font-extralight leading-[1.05] tracking-[-0.02em] text-navy mb-10 text-center md:text-right">
            Ας μιλήσουμε.
          </h2>

          <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
            <div className="contact-reveal">
              <label className="text-[10px] tracking-[0.2em] uppercase text-navy/50 block mb-2">
                Ονοματεπωνυμο
              </label>
              <input
                type="text"
                className="w-full bg-transparent border-b border-navy/15 py-3 text-navy text-sm font-light outline-none focus:border-plum transition-colors duration-300 placeholder:text-navy/25"
                placeholder="Το όνομά σας"
              />
            </div>

            <div className="contact-reveal">
              <label className="text-[10px] tracking-[0.2em] uppercase text-navy/50 block mb-2">
                Email
              </label>
              <input
                type="email"
                className="w-full bg-transparent border-b border-navy/15 py-3 text-navy text-sm font-light outline-none focus:border-plum transition-colors duration-300 placeholder:text-navy/25"
                placeholder="email@example.com"
              />
            </div>

            <div className="contact-reveal">
              <label className="text-[10px] tracking-[0.2em] uppercase text-navy/50 block mb-2">
                Τηλεφωνο
              </label>
              <input
                type="tel"
                className="w-full bg-transparent border-b border-navy/15 py-3 text-navy text-sm font-light outline-none focus:border-plum transition-colors duration-300 placeholder:text-navy/25"
                placeholder="+30 210 000 0000"
              />
            </div>

            <div className="contact-reveal">
              <label className="text-[10px] tracking-[0.2em] uppercase text-navy/50 block mb-2">
                Μηνυμα
              </label>
              <textarea
                rows={4}
                className="w-full bg-transparent border-b border-navy/15 py-3 text-navy text-sm font-light outline-none focus:border-plum transition-colors duration-300 resize-none placeholder:text-navy/25"
                placeholder="Περιγράψτε σύντομα την υπόθεσή σας..."
              />
            </div>

            <button
              type="submit"
              className="contact-reveal mt-4 self-center md:self-end bg-plum text-cream text-[11px] tracking-[0.25em] uppercase px-8 py-4 hover:bg-navy transition-colors duration-500"
            >
              Αποστολη
            </button>
          </form>
        </div>

        {/* Right: Additional info — left-aligned (toward center) */}
        <div className="w-full md:w-[40%] md:pt-20 md:mr-auto px-6 md:px-0 md:pl-16 text-left">
          <div className="contact-reveal mb-10">
            <p className="text-[10px] tracking-[0.2em] uppercase text-navy/40 mb-2">Διευθυνση</p>
            <p className="text-navy text-sm font-light leading-relaxed">
              Λεωφόρος Βασιλίσσης Σοφίας 42
              <br />
              106 74, Αθήνα
            </p>
          </div>

          <div className="contact-reveal mb-10">
            <p className="text-[10px] tracking-[0.2em] uppercase text-navy/40 mb-2">Τηλεφωνο</p>
            <p className="text-navy text-sm font-light">+30 210 000 0000</p>
          </div>

          <div className="contact-reveal mb-10">
            <p className="text-[10px] tracking-[0.2em] uppercase text-navy/40 mb-2">Email</p>
            <p className="text-navy text-sm font-light">info@kontoni-law.gr</p>
          </div>

          <div className="contact-reveal mb-10">
            <p className="text-[10px] tracking-[0.2em] uppercase text-navy/40 mb-2">Ωρες λειτουργιας</p>
            <p className="text-navy text-sm font-light leading-relaxed">
              Δευτέρα — Παρασκευή
              <br />
              09:00 — 18:00
            </p>
          </div>

          <div className="contact-reveal">
            <p className="text-navy/50 text-xs font-light leading-relaxed max-w-sm">
              Ό,τι μας εμπιστευτείτε μένει μεταξύ μας. Η πρώτη συνάντηση είναι χωρίς δέσμευση.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
