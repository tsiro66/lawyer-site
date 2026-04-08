"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
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
      className="relative min-h-screen flex flex-col md:flex-row items-center py-32"
    >
      {/* Left: Text */}
      <div className="relative z-20 w-full md:w-[35%] px-6 md:px-0 md:pl-40 text-center md:text-right">
        <span className="about-reveal text-[10px] tracking-[0.35em] uppercase text-plum/60 block mb-6">
          Σχετικα με εμας
        </span>

        <h2 className="about-reveal text-4xl md:text-5xl lg:text-6xl font-extralight leading-[1.05] tracking-[-0.02em] text-navy">
          Αντωνία
          <br />
          <span className="text-plum">Κοντονή</span>
        </h2>

        <p className="about-reveal text-navy/70 text-base md:text-lg leading-relaxed font-light mt-8">
          Η Αντωνία Κοντονή ασχολείται με το δίκαιο εδώ και πάνω από τριάντα χρόνια. Έχει χειριστεί υποθέσεις κάθε είδους — μικρές και μεγάλες, απλές και περίπλοκες.
        </p>

        <p className="about-reveal text-navy/50 text-sm md:text-base leading-relaxed font-light mt-6">
          Σπούδασε στη Νομική Αθηνών και έκανε μεταπτυχιακό στο ευρωπαϊκό δίκαιο. Ασχολείται με εταιρικές διαφορές, ποινικές υποθέσεις και διεθνή διαιτησία.
        </p>
      </div>

      {/* Center gap for statue */}
      <div className="hidden md:block md:w-[25%]" />

      {/* Right: Photo */}
      <div className="about-reveal relative z-20 w-full md:w-[35%] px-6 md:px-0 md:pr-10 lg:pr-20 md:pl-16 flex items-center justify-center md:justify-end mt-10 md:mt-0">
        <div className="relative w-full max-w-sm aspect-[3/4] overflow-hidden">
          <Image
            src="/lawyer.jpg"
            alt="Αντωνία Κοντονή"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 35vw"
          />
        </div>
      </div>
    </section>
  );
}
