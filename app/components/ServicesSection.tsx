"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    title: "Ποινικό Δίκαιο",
    description:
      "Υπεράσπιση σε κακουργήματα και πλημμελήματα, οικονομικά εγκλήματα, ποινική διαμεσολάβηση και εκπροσώπηση σε όλα τα στάδια της ποινικής διαδικασίας.",
  },
  {
    title: "Εταιρικό Δίκαιο",
    description:
      "Σύσταση και αναδιάρθρωση εταιρειών, συγχωνεύσεις και εξαγορές, εταιρική διακυβέρνηση και συμβουλευτική σε θέματα κανονιστικής συμμόρφωσης.",
  },
  {
    title: "Αστικό Δίκαιο",
    description:
      "Διαφορές ακίνητης περιουσίας, κληρονομικά, οικογενειακό δίκαιο, αποζημιώσεις και αγωγές αστικής ευθύνης.",
  },
  {
    title: "Διεθνής Διαιτησία",
    description:
      "Εκπροσώπηση σε διεθνείς εμπορικές διαφορές, ICC και LCIA διαιτησίες, αναγνώριση και εκτέλεση αλλοδαπών αποφάσεων.",
  },
  {
    title: "Διοικητικό Δίκαιο",
    description:
      "Προσφυγές κατά διοικητικών πράξεων, φορολογικές διαφορές, δημόσιες συμβάσεις και αδειοδοτήσεις.",
  },
  {
    title: "Εργατικό Δίκαιο",
    description:
      "Συμβάσεις εργασίας, ομαδικές απολύσεις, εργατικά ατυχήματα και εκπροσώπηση ενώπιον εργατικών δικαστηρίων.",
  },
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".services-reveal",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          stagger: 0.1,
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
      id="section-services"
      ref={sectionRef}
      className="relative min-h-screen flex items-center py-32"
    >
      <div className="relative z-20 w-full max-w-6xl mx-auto px-10 sm:px-14 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_20vw_1fr] gap-y-12">
          {/* Title in left column, right-aligned */}
          <div className="md:col-start-1 md:text-right mb-4">
            <span className="services-reveal text-[10px] tracking-[0.35em] uppercase text-plum/60 block mb-6">
              Υπηρεσίες
            </span>

            <h2 className="services-reveal text-4xl md:text-5xl lg:text-6xl font-extralight leading-[1.05] tracking-[-0.02em] text-navy">
              Τομείς
              <br />
              <span className="text-plum">εξειδίκευσης</span>
            </h2>
          </div>
          {SERVICES.map((service, i) => {
            const isLeft = i % 2 === 0;
            return (
              <div
                key={service.title}
                className={`services-reveal ${isLeft ? "md:col-start-1 md:text-right" : "md:col-start-3 md:text-left"}`}
              >
                <h3 className="text-navy text-sm tracking-[0.15em] uppercase font-medium mb-3">
                  {service.title}
                </h3>
                <p className="text-navy/50 text-sm font-light leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
