import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Governance | International Economic Society",
};

export default function GovernancePage() {
  return (
    <>
      <Navigation />
      <main className="pt-24">
        {/* Header — large statement */}
        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              <div className="lg:col-span-7">
                <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-arch-white leading-tight">
                  Chapter Structure & Governance
                </h1>
                <p className="mt-6 text-lg text-text-secondary leading-relaxed">
                  Each IES chapter is student-founded and student-run, operating
                  under a shared international framework that ensures consistency,
                  credibility, and accountability across the network.
                </p>
              </div>
              <div className="lg:col-span-4 lg:col-start-9 flex flex-wrap lg:flex-col gap-6 lg:gap-4 lg:justify-center lg:border-l lg:border-border lg:pl-8">
                {[
                  { value: "16", label: "Verified Chapters" },
                  { value: "12", label: "Countries" },
                  { value: "100%", label: "Student-Led" },
                  { value: "$0", label: "Cost to Join" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <span className="text-2xl font-serif font-bold text-gold">{stat.value}</span>
                    <span className="ml-2 text-sm text-text-muted">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Leadership roles — featured president + grid of others */}
        <section className="bg-obsidian-light py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-arch-white mb-12">
              Chapter Leadership Roles
            </h2>
            {/* Featured role */}
            <div className="border border-border bg-obsidian p-8 mb-px">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                <div>
                  <p className="text-sm font-bold text-gold mb-1">Core Leadership</p>
                  <p className="text-lg font-semibold text-arch-white">Chapter President</p>
                </div>
                <p className="text-sm text-text-secondary leading-relaxed">
                  Leads overall chapter operations, strategy, and external representation. The president sets the direction and ensures chapter alignment with IES standards.
                </p>
              </div>
            </div>
            {/* Other roles grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
              {[
                { role: "Vice President", description: "Supports the president and manages internal affairs" },
                { role: "Secretary", description: "Handles documentation and meeting records" },
                { role: "Treasurer", description: "Manages chapter finances and budgeting" },
                { role: "Outreach Lead", description: "Coordinates community engagement and recruitment" },
                { role: "Media & Communications", description: "Manages digital presence and communications" },
                { role: "Events Coordinator", description: "Plans and executes chapter programming" },
                { role: "Faculty Advisor", description: "Supervisory role per school policy" },
              ].map((item) => (
                <div key={item.role} className="bg-obsidian p-6">
                  <p className="text-sm font-semibold text-arch-white">{item.role}</p>
                  <p className="mt-2 text-xs text-text-secondary leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm text-text-muted">
              All leadership roles are held by students, providing meaningful
              organizational and leadership experience.
            </p>
          </div>
        </section>

        {/* Faculty Advisor + Institutional Framework — stacked full-width bands */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              <div className="lg:col-span-5">
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-arch-white mb-6">
                  Faculty Advisor
                </h2>
                <div className="space-y-4 text-sm text-text-secondary leading-relaxed">
                  <p>
                    Each chapter operates under the supervision of a faculty advisor,
                    in accordance with school policies. The advisor&apos;s role is
                    supervisory rather than managerial. IES is specifically designed
                    to minimize the workload placed on faculty advisors.
                  </p>
                  <p>The faculty advisor may:</p>
                </div>
                <ul className="mt-4 space-y-3">
                  {[
                    "Ensure compliance with school guidelines",
                    "Provide guidance when needed",
                    "Serve as an administrative point of contact",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="w-1 h-1 bg-gold mt-2 shrink-0" />
                      <span className="text-sm text-text-secondary">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="lg:col-span-6 lg:col-start-7">
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-arch-white mb-6">
                  Institutional Framework
                </h2>
                <div className="space-y-4">
                  {[
                    {
                      title: "Verified Network",
                      description: "Every chapter undergoes a verification process. Our network spans 16 chapters across 12 countries on five continents.",
                    },
                    {
                      title: "Transparent Operations",
                      description: "Clear bylaws, shared documentation, and international guidelines ensure accountability across all chapters.",
                    },
                    {
                      title: "Ethical Standards",
                      description: "A formal code of conduct governs the behavior of all officers and chapter leaders across the network.",
                    },
                    {
                      title: "Decentralized Model",
                      description: "Chapters manage local programming while adhering to international guidelines, balancing autonomy with consistency.",
                    },
                  ].map((item) => (
                    <div key={item.title} className="border-l-2 border-gold pl-4">
                      <h3 className="text-sm font-semibold text-arch-white">{item.title}</h3>
                      <p className="mt-1 text-sm text-text-secondary leading-relaxed">{item.description}</p>
                    </div>
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
