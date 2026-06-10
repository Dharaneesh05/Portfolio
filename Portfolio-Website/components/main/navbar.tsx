'use client';

import { NAV_LINKS } from "@/constants";

/** Must match the h-[65px] wrapper. */
const NAVBAR_H = 65;

/**
 * Precise section scroll with heading detection.
 *
 * Priority for picking the scroll anchor inside a section:
 *   1. <h1> or <h2>  — semantic heading (About Me, Skills)
 *   2. [font-extrabold] div — styled section title (Projects, Contact)
 *   3. [font-bold] div  — styled section title (Experience)
 *   4. <h3>            — last-resort sub-heading
 *   5. section element + negative-margin compensation (pure fallback)
 *
 * When a heading element is found via querySelector, its
 * getBoundingClientRect() already reflects the true document position
 * (negative margins on the parent are baked in). No extra overlap
 * compensation is needed in that case.
 */
function scrollToSection(href: string) {
  const id = href.startsWith('#') ? href.slice(1) : href;
  const section = document.getElementById(id);
  if (!section) return;

  // ── Locate the section's primary heading ───────────────────────────
  const heading =
    section.querySelector<HTMLElement>('h1, h2')                        ||
    section.querySelector<HTMLElement>('[class*="font-extrabold"]')     ||
    section.querySelector<HTMLElement>('[class*="font-bold"]')          ||
    section.querySelector<HTMLElement>('h3')                            ||
    null;

  // Small consistent breathing room below the navbar
  const GAP = 12;

  let target: number;

  if (heading) {
    // Use the heading's exact absolute position.
    // getBoundingClientRect already accounts for any parent negative margin.
    target = heading.getBoundingClientRect().top + window.scrollY - NAVBAR_H - GAP;
  } else {
    // Pure fallback — section has no detectable heading.
    // Compensate for negative top-margin (e.g. -mt-20 on Projects if
    // the querySelector above somehow missed).
    const mt = parseFloat(window.getComputedStyle(section).marginTop) || 0;
    const overlapFix = mt < 0 ? -mt : 0;
    target =
      section.getBoundingClientRect().top + window.scrollY + overlapFix - NAVBAR_H - GAP;
  }

  window.scrollTo({ top: Math.max(0, target), behavior: 'smooth' });
}

export const Navbar = () => {
  return (
    <header className="w-full h-[65px] fixed top-0 z-[999] flex items-center justify-center px-1 md:px-10">

      {/* Desktop */}
      <nav aria-label="Main Navigation" className="hidden md:flex navbar-glass items-center gap-0 px-2 py-1.5">
        {NAV_LINKS.map((link) => (
          <button
            key={link.title}
            aria-label={`Go to ${link.title} section`}
            onClick={() => scrollToSection(link.link)}
            className="nav-link bg-transparent border-0 outline-none cursor-pointer"
          >
            {link.title}
          </button>
        ))}
      </nav>

      {/* Mobile */}
      <nav aria-label="Mobile Navigation" className="flex md:hidden navbar-glass items-center gap-0 px-1 py-1">
        {NAV_LINKS.map((link) => (
          <button
            key={link.title}
            aria-label={`Go to ${link.title} section`}
            onClick={() => scrollToSection(link.link)}
            className="nav-link text-xs bg-transparent border-0 outline-none cursor-pointer"
          >
            {link.title}
          </button>
        ))}
      </nav>

    </header>
  );
};