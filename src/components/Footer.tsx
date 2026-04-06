import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-obsidian-light" role="contentinfo">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/ies-logo.png"
                alt="IES Logo"
                width={32}
                height={32}
                style={{ filter: 'brightness(0) saturate(100%) invert(67%) sepia(30%) saturate(700%) hue-rotate(10deg) brightness(95%) contrast(85%)' }}
              />
              <span className="font-serif font-bold text-arch-white">IES</span>
            </div>
            <p className="text-sm text-text-muted leading-relaxed">
              A global network of student-led high school economics chapters advancing economic literacy worldwide.
            </p>
          </div>

          {/* Compete & Learn */}
          <div>
            <h3 className="font-bold text-arch-white mb-4">Compete &amp; Learn</h3>
            <ul className="space-y-2.5">
              <li><Link href="/competitions" className="text-sm text-text-muted hover:text-arch-white transition-colors">All Competitions</Link></li>
              <li><Link href="/programs" className="text-sm text-text-muted hover:text-arch-white transition-colors">Chapter Programs</Link></li>
              <li><Link href="/journal" className="text-sm text-text-muted hover:text-arch-white transition-colors">IES Journal</Link></li>
            </ul>
          </div>

          {/* Chapters */}
          <div>
            <h3 className="font-bold text-arch-white mb-4">Get Involved</h3>
            <ul className="space-y-2.5">
              <li><Link href="/apply" className="text-sm text-text-muted hover:text-arch-white transition-colors">Start a Chapter</Link></li>
              <li><Link href="/apply" className="text-sm text-text-muted hover:text-arch-white transition-colors">Growth Internship</Link></li>
              <li><Link href="/impact" className="text-sm text-text-muted hover:text-arch-white transition-colors">Current Chapters</Link></li>
              <li><Link href="/partnership" className="text-sm text-text-muted hover:text-arch-white transition-colors">School Partnerships</Link></li>
            </ul>
          </div>

          {/* Organization */}
          <div>
            <h3 className="font-bold text-arch-white mb-4">Organization</h3>
            <ul className="space-y-2.5">
              <li><Link href="/about" className="text-sm text-text-muted hover:text-arch-white transition-colors">About IES</Link></li>
              <li><Link href="/leadership" className="text-sm text-text-muted hover:text-arch-white transition-colors">Leadership</Link></li>
              <li><Link href="/governance" className="text-sm text-text-muted hover:text-arch-white transition-colors">Governance</Link></li>
              <li><Link href="/contact" className="text-sm text-text-muted hover:text-arch-white transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-xs text-text-muted">
            &copy; {new Date().getFullYear()} International Economic Society. All Rights Reserved.
          </p>
          <a
            href="mailto:ies.economicsociety@gmail.com"
            className="text-xs text-text-muted hover:text-arch-white transition-colors"
          >
            ies.economicsociety@gmail.com
          </a>
        </div>
      </div>
    </footer>
  );
}
