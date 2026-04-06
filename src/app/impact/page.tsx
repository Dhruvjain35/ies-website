"use client";

import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import dynamic from "next/dynamic";

const WorldMap = dynamic(() => import("@/components/WorldMap"), { ssr: false });

interface Chapter {
  id: string;
  name: string;
  country: string;
  coordinates: [number, number];
}

const chapters: Chapter[] = [
  { id: "birmingham", name: "Birmingham", country: "United Kingdom", coordinates: [-1.8904, 52.4862] },
  { id: "glasgow", name: "Glasgow", country: "United Kingdom", coordinates: [-4.2518, 55.8642] },
  { id: "india", name: "Delhi", country: "India", coordinates: [77.209, 28.6139] },
  { id: "abudhabi", name: "Abu Dhabi", country: "UAE", coordinates: [54.3773, 24.4539] },
  { id: "dubai", name: "Dubai", country: "UAE", coordinates: [55.2708, 25.2048] },
  { id: "dhaka", name: "Dhaka", country: "Bangladesh", coordinates: [90.4125, 23.8103] },
  { id: "bacau", name: "Bacau", country: "Romania", coordinates: [26.914, 46.567] },
  { id: "miami", name: "Miami", country: "United States", coordinates: [-80.1918, 25.7617] },
  { id: "denver", name: "Denver", country: "United States", coordinates: [-104.9903, 39.7392] },
  { id: "lyon", name: "Lyon", country: "France", coordinates: [4.8357, 45.764] },
  { id: "canada", name: "Canada", country: "Canada", coordinates: [-75.6972, 45.4215] },
  { id: "accra", name: "Accra", country: "Ghana", coordinates: [-0.187, 5.6037] },
  { id: "casablanca", name: "Casablanca", country: "Morocco", coordinates: [-7.5898, 33.5731] },
  { id: "addisababa", name: "Addis Ababa", country: "Ethiopia", coordinates: [38.7578, 9.0192] },
  { id: "karachi", name: "Karachi", country: "Pakistan", coordinates: [67.0011, 24.8607] },
  { id: "aktau", name: "Aktau", country: "Kazakhstan", coordinates: [51.1475, 43.65] },
];

const regions = [
  { region: "Europe", chapters: ["Birmingham, UK", "Glasgow, UK", "Lyon, France", "Bacau, Romania"] },
  { region: "Middle East & South Asia", chapters: ["Delhi, India", "Abu Dhabi, UAE", "Dubai, UAE", "Karachi, Pakistan", "Dhaka, Bangladesh"] },
  { region: "Africa", chapters: ["Accra, Ghana", "Casablanca, Morocco", "Addis Ababa, Ethiopia"] },
  { region: "Americas", chapters: ["Miami, US", "Denver, US", "Ottawa, Canada"] },
  { region: "Central Asia", chapters: ["Aktau, Kazakhstan"] },
];

export default function ImpactPage() {
  const [active, setActive] = useState<Chapter | null>(null);

  return (
    <>
      <Navigation />
      <main className="pt-24">
        {/* Header with stats integrated */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <span className="text-xs font-bold text-gold tracking-widest uppercase">Chapters</span>
            <h1 className="mt-3 font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-arch-white leading-tight max-w-3xl">
              Our Global Network
            </h1>
            <p className="mt-6 text-lg text-text-secondary leading-relaxed max-w-2xl">
              An expanding network of student-led chapters driving economic
              discourse and collaboration worldwide.
            </p>
            {/* Inline stats */}
            <div className="mt-10 flex flex-wrap gap-10">
              {[
                { value: "16", label: "Active Chapters" },
                { value: "12", label: "Countries" },
                { value: "5", label: "Continents" },
              ].map((stat) => (
                <div key={stat.label} className="flex items-baseline gap-2">
                  <span className="text-3xl font-serif font-bold text-gold">{stat.value}</span>
                  <span className="text-sm text-text-muted">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Full-width map */}
        <section className="bg-obsidian-light">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 py-8">
            <div className="relative border border-border overflow-hidden">
              <WorldMap
                chapters={chapters}
                activeId={active?.id ?? null}
                onHover={setActive}
              />
              {active && (
                <div className="absolute bottom-4 left-4 bg-obsidian border border-border px-4 py-3 pointer-events-none z-10">
                  <p className="text-sm font-semibold text-arch-white">{active.name}</p>
                  <p className="text-xs text-text-secondary">{active.country}</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Chapter directory — table-style layout */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-arch-white mb-12">
              Chapter Directory
            </h2>
            <div className="space-y-0 divide-y divide-border">
              {regions.map((group) => (
                <div key={group.region} className="grid grid-cols-1 sm:grid-cols-12 gap-4 py-6 first:pt-0">
                  <div className="sm:col-span-3">
                    <h3 className="text-xs font-bold text-gold tracking-widest uppercase">{group.region}</h3>
                  </div>
                  <div className="sm:col-span-9 flex flex-wrap gap-x-8 gap-y-1">
                    {group.chapters.map((ch) => (
                      <p key={ch} className="text-sm text-text-secondary">{ch}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
