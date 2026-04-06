import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata = {
  title: "Contact | International Economic Society",
  description: "Get in touch with the International Economic Society.",
};

export default function ContactPage() {
  return (
    <>
      <Navigation />
      <main className="pt-24">
        {/* Split layout — info left, accent panel right */}
        <section className="min-h-[calc(100vh-6rem)]">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20 sm:py-28">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
              {/* Left — contact information */}
              <div className="flex flex-col justify-center">
                <span className="text-xs font-bold text-gold tracking-widest uppercase">Get in Touch</span>
                <h1 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-arch-white leading-tight">
                  Contact Us
                </h1>
                <p className="mt-6 text-base text-text-secondary max-w-lg leading-relaxed">
                  For questions about starting a chapter, school partnerships, the
                  Growth Internship, or anything else, please reach out directly.
                </p>

                <div className="mt-12 space-y-8">
                  <div>
                    <h2 className="text-xs font-bold text-text-muted tracking-widest uppercase mb-3">Email</h2>
                    <a
                      href="mailto:ies.economicsociety@gmail.com"
                      className="text-lg text-gold hover:text-gold-dark transition-colors font-medium"
                    >
                      ies.economicsociety@gmail.com
                    </a>
                  </div>
                  <div>
                    <h2 className="text-xs font-bold text-text-muted tracking-widest uppercase mb-3">Phone</h2>
                    <a
                      href="tel:+14699370299"
                      className="text-lg text-gold hover:text-gold-dark transition-colors font-medium"
                    >
                      (469) 937-0299
                    </a>
                  </div>
                  <div>
                    <h2 className="text-xs font-bold text-text-muted tracking-widest uppercase mb-3">Response Time</h2>
                    <p className="text-sm text-text-secondary">
                      We typically respond within 2–3 business days.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right — accent panel with quick links */}
              <div className="bg-obsidian-light border border-border p-8 sm:p-12 flex flex-col justify-center">
                <h3 className="font-serif text-xl font-bold text-arch-white mb-6">
                  Looking for something specific?
                </h3>
                <div className="space-y-4">
                  {[
                    { label: "Start a Chapter", href: "/apply", desc: "Apply to launch an IES chapter at your school" },
                    { label: "School Partnership", href: "/partnership", desc: "Partnership proposal for administrators and faculty" },
                    { label: "Growth Internship", href: "/apply", desc: "Apply to join the IES international team" },
                    { label: "Competitions", href: "/competitions", desc: "Details on GEC, EPR, and GRP events" },
                  ].map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="group block py-3 border-b border-border last:border-0"
                    >
                      <span className="text-sm font-bold text-arch-white group-hover:text-gold transition-colors">
                        {item.label}
                      </span>
                      <span className="ml-2 text-xs text-text-muted">{item.desc}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
