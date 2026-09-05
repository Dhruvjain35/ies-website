"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { label: "About", href: "/about" },
  { label: "Programs", href: "/programs" },
  { label: "Competitions", href: "/competitions" },
  { label: "Journal", href: "/journal" },
  { label: "Chapters", href: "/impact" },
  { label: "Join", href: "/join" },
  { label: "Contact", href: "/contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          scrolled ? "bg-obsidian border-b border-border" : "bg-transparent"
        }`}
      >
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8"
          aria-label="Primary navigation"
        >
          <Link href="/" className="flex items-center gap-3" aria-label="IES Home">
            <Image
              src="/ies-logo.png"
              alt="IES Logo"
              width={36}
              height={36}
              style={{ filter: 'brightness(0) saturate(100%) invert(67%) sepia(30%) saturate(700%) hue-rotate(10deg) brightness(95%) contrast(85%)' }}
              preload
            />
            <span className="hidden sm:block text-sm font-bold text-arch-white">
              International Economic Society
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-text-secondary hover:text-arch-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/apply"
              className="px-5 py-2 text-sm font-bold text-obsidian bg-gold hover:bg-gold-dark transition-colors"
            >
              Apply Now
            </Link>
          </div>

          <button
            type="button"
            className="lg:hidden w-10 h-10 flex items-center justify-center text-arch-white"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-label="Toggle menu"
          >
            <div className="flex flex-col gap-1.5">
              <span
                className={`block w-6 h-px bg-current transition-all duration-200 origin-center ${
                  mobileOpen ? "rotate-45 translate-y-[4px]" : ""
                }`}
              />
              <span
                className={`block w-6 h-px bg-current transition-opacity duration-200 ${
                  mobileOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block w-6 h-px bg-current transition-all duration-200 origin-center ${
                  mobileOpen ? "-rotate-45 -translate-y-[4px]" : ""
                }`}
              />
            </div>
          </button>
        </nav>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-obsidian/95"
            onClick={() => setMobileOpen(false)}
          />
          <nav
            className="absolute right-0 top-0 h-full w-72 bg-obsidian-light border-l border-border flex flex-col pt-20 px-6"
            aria-label="Mobile navigation"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block py-4 text-base text-text-secondary hover:text-arch-white border-b border-border transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/apply"
              onClick={() => setMobileOpen(false)}
              className="mt-6 block text-center px-5 py-3 text-sm font-bold text-obsidian bg-gold"
            >
              Apply Now
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
