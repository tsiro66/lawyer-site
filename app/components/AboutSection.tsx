"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about-reveal",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          stagger: 0.15,
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
      id="section-about"
      ref={sectionRef}
      className="relative min-h-screen flex items-center py-32"
    >
      <div className="relative z-20 w-full md:w-1/2 pl-10 pr-10 sm:pl-14 sm:pr-14 lg:pl-20 md:pr-16 text-right">
        <span className="about-reveal text-[10px] tracking-[0.35em] uppercase text-plum/60 block mb-6">
          Σχετικά με εμάς
        </span>

        <h2 className="about-reveal text-4xl md:text-5xl lg:text-6xl font-extralight leading-[1.05] tracking-[-0.02em] text-navy">
          Αντωνία
          <br />
          <span className="text-plum">Κοντονή</span>
        </h2>

        <p className="about-reveal text-navy/70 text-base md:text-lg leading-relaxed max-w-lg font-light mt-8 ml-auto">
          Με πάνω από τρεις δεκαετίες ενεργούς παρουσίας στα δικαστήρια, η Αντωνία Κοντονή αποτελεί σημείο αναφοράς στον νομικό κόσμο. Η πορεία της χαρακτηρίζεται από μεθοδικότητα, ακεραιότητα και μια βαθιά κατανόηση του δικαίου.
        </p>

        <p className="about-reveal text-navy/50 text-sm md:text-base leading-relaxed max-w-lg font-light mt-6 ml-auto">
          Απόφοιτη της Νομικής Σχολής Αθηνών με μεταπτυχιακές σπουδές στο ευρωπαϊκό δίκαιο, ανέπτυξε την πρακτική της σε υποθέσεις υψηλού προφίλ — από εταιρικές διαφορές και ποινικά ζητήματα έως διεθνή διαιτησία.
        </p>
      </div>
    </section>
  );
}
