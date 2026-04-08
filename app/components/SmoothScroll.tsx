"use client";

import { useEffect, useRef, useCallback } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  // Stable callback reference so we can properly remove it on cleanup
  const rafCallback = useCallback((time: number) => {
    lenisRef.current?.raf(time * 1000);
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    // Connect Lenis scroll events to GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Drive Lenis from GSAP's ticker for frame-perfect sync
    gsap.ticker.add(rafCallback);
    gsap.ticker.lagSmoothing(0);

    // Pause/resume Lenis when menu opens/closes
    const handleMenuToggle = (e: Event) => {
      const { open } = (e as CustomEvent).detail;
      if (open) {
        lenis.stop();
      } else {
        lenis.start();
      }
    };
    window.addEventListener("menu-toggle", handleMenuToggle);

    return () => {
      window.removeEventListener("menu-toggle", handleMenuToggle);
      gsap.ticker.remove(rafCallback);
      lenis.destroy();
    };
  }, [rafCallback]);

  return <>{children}</>;
}
