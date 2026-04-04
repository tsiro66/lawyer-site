"use client";

import dynamic from "next/dynamic";
import SmoothScroll from "./components/SmoothScroll";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import PracticeSection from "./components/PracticeSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

// Dynamic import — WebGL canvas cannot be server-rendered
const LadyJusticeScene = dynamic(
  () => import("./components/LadyJusticeScene"),
  { ssr: false },
);

export default function Home() {
  return (
    <SmoothScroll>
      <Navbar />

      {/* Fixed 3D Model — right half of viewport */}
      <LadyJusticeScene />

      {/* Gradient fade between text content and 3D scene */}
      {/* <div className="fixed top-0 right-0 w-[55vw] h-screen z-[5] pointer-events-none bg-gradient-to-r from-white via-white/80 to-transparent" /> */}

      {/* Scrollable content sections — left half */}
      <main className="relative z-0 w-full">
        <HeroSection />
        <AboutSection />
        <PracticeSection />
        <ContactSection />

        <Footer />
      </main>
    </SmoothScroll>
  );
}
