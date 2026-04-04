"use client";

export default function Footer() {
  return (
    <footer className="relative z-20 bg-navy py-16 w-full px-10 sm:px-14 lg:px-20">
      <div className="flex flex-col md:flex-row justify-between gap-10">
        <div>
          <p className="text-cream text-sm font-semibold tracking-[0.25em] uppercase">
            Αντωνια Κοντονη
          </p>
          <p className="text-cream/60 text-[10px] tracking-[0.3em] uppercase mt-1">
            Δικηγορος
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <a href="#section-hero" className="text-cream/60 hover:text-cream text-xs tracking-[0.15em] uppercase transition-colors duration-300">Αρχικη</a>
          <a href="#section-about" className="text-cream/60 hover:text-cream text-xs tracking-[0.15em] uppercase transition-colors duration-300">Σχετικα</a>
          <a href="#section-practice" className="text-cream/60 hover:text-cream text-xs tracking-[0.15em] uppercase transition-colors duration-300">Υπηρεσιες</a>
          <a href="#section-contact" className="text-cream/60 hover:text-cream text-xs tracking-[0.15em] uppercase transition-colors duration-300">Επικοινωνια</a>
        </div>
      </div>

      <div className="mt-12 pt-8">
        <p className="text-cream/30 text-xs tracking-[0.1em]">
          &copy; 2025 Αντωνία Κοντονή. Με επιφύλαξη παντός δικαιώματος.
        </p>
      </div>
    </footer>
  );
}
