import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Mission & Values | International Economic Society",
};

export default function MissionPage() {
  return (
    <>
      <Navigation />
      <main className="pt-24">
        {/* Full-width hero mission statement */}
        <section className="py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <span className="text-xs font-bold text-gold tracking-widest uppercase">Our Mission</span>
            <h1 className="mt-4 font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-arch-white leading-[1.1] max-w-5xl">
              Making Economics Accessible, Relevant & Global
            </h1>
            <div className="mt-10 max-w-3xl border-l-2 border-gold pl-6">
              <p className="text-lg text-text-secondary leading-relaxed">
                The mission of the International Economic Society is to make global
                economics understandable, accessible, and relevant to high school
                students. IES aims to foster informed discussion, critical thinking,
                and international collaboration while encouraging interest in
                economics, public policy, and global affairs.
              </p>
            </div>
          </div>
        </section>

        {/* Core Values — alternating left/right layout */}
        <section className="bg-obsidian-light py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-arch-white mb-16">
              Core Values
            </h2>
            <div className="space-y-12">
              {[
                {
                  number: "01",
                  title: "Accessibility",
                  description:
                    "No prior background in economics is required to participate. IES is open to all students regardless of academic track, coursework history, or institutional background.",
                  align: "left",
                },
                {
                  number: "02",
                  title: "Clarity",
                  description:
                    "Emphasis on real-world applications rather than abstract theory. IES programming connects economic concepts to everyday life, current events, and student experiences.",
                  align: "right",
                },
                {
                  number: "03",
                  title: "Student Leadership",
                  description:
                    "Chapters are founded, managed, and led by students. IES trusts young leaders to shape their own programming, build their own communities, and drive their own impact.",
                  align: "left",
                },
                {
                  number: "04",
                  title: "Respectful Dialogue",
                  description:
                    "Diverse perspectives are encouraged within a structured, respectful environment. IES fosters open discussion where students feel comfortable exploring different viewpoints on complex economic issues.",
                  align: "right",
                },
                {
                  number: "05",
                  title: "Global Awareness",
                  description:
                    "Students engage with international perspectives while remaining grounded in local contexts. IES connects economic discourse across borders, cultures, and regions.",
                  align: "left",
                },
              ].map((item) => (
                <div
                  key={item.number}
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-6 items-start ${
                    item.align === "right" ? "" : ""
                  }`}
                >
                  <div
                    className={`lg:col-span-6 ${
                      item.align === "right" ? "lg:col-start-7" : "lg:col-start-1"
                    }`}
                  >
                    <div className="flex items-baseline gap-4 mb-3">
                      <span className="text-xs font-bold text-gold tracking-widest">{item.number}</span>
                      <h3 className="text-xl font-semibold text-arch-white">{item.title}</h3>
                    </div>
                    <p className="text-sm text-text-secondary leading-relaxed pl-8">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Commitment — accent block */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              <div className="lg:col-span-4">
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-arch-white">
                  Our Commitment
                </h2>
              </div>
              <div className="lg:col-span-7 lg:col-start-6 space-y-4 text-text-secondary leading-relaxed">
                <p>
                  IES is committed to responsible student leadership, inclusivity,
                  and intellectual integrity. The Society actively seeks to reduce
                  barriers to participation and encourages engagement with diverse
                  perspectives.
                </p>
                <p>
                  As part of its commitment to corporate social responsibility, IES
                  prioritizes equitable access to economic education, student voice,
                  and global awareness, reinforcing its role as a socially
                  responsible educational initiative.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
