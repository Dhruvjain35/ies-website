import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" aria-label="Hero">
      {/* Background image */}
      <Image
        src="/IES_BackgroundLandingPage.png"
        alt=""
        fill
        preload
        className="object-cover contrast-[1.15] brightness-[1.1]"
        quality={95}
      />
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 py-20">
        {/* IES Logo */}
        <Image
          src="/ies-logo.png"
          alt="IES Logo"
          width={140}
          height={140}
          preload
          className="mb-8"
          style={{ filter: 'brightness(0) saturate(100%) invert(67%) sepia(30%) saturate(700%) hue-rotate(10deg) brightness(95%) contrast(85%)' }}
        />

        <div className="mb-5 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/30 bg-gold/10 backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
          <span className="text-xs font-semibold text-gold tracking-wide uppercase">Now in 12 countries</span>
        </div>

        <h1 className="font-serif text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-[1.1] text-white drop-shadow-lg">
          International<br />Economic Society
        </h1>

        <p className="mt-6 max-w-xl text-lg sm:text-xl text-white/80 leading-relaxed">
          16 student-led chapters across 5 continents. Free to start,
          open to all — no prior economics experience needed.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
          <Link
            href="/apply"
            className="px-8 py-3.5 text-sm font-bold text-obsidian bg-gold hover:bg-gold-dark transition-colors duration-200"
          >
            Start a Chapter — It&apos;s Free
          </Link>
          <Link
            href="/competitions"
            className="px-8 py-3.5 text-sm font-bold text-white border-2 border-white/30 hover:border-white/60 hover:bg-white/10 transition-all duration-200"
          >
            View Competitions
          </Link>
        </div>

      </div>

      {/* Bottom gradient fade into page */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#111111] to-transparent" />
    </section>
  );
}
