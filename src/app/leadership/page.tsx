import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const founders = [
  {
    name: "Dhruv Jain",
    role: "Founder & President",
    bio: "Established IES with the mission of democratizing economic literacy globally. Under his leadership, IES has grown from a single chapter to a network spanning 20+ countries.",
  },
  {
    name: "Executive Director",
    role: "Co-Founder & Executive Director",
    bio: "Built the organizational infrastructure and governance framework that established IES's credibility as a global institution.",
  },
  {
    name: "Director of Research",
    role: "Co-Founder & Research Director",
    bio: "Leads IES's research initiatives and academic partnerships, ensuring scholarly rigor across all chapter programming and publications.",
  },
  {
    name: "Director of Operations",
    role: "Co-Founder & Operations Director",
    bio: "Manages the global chapter verification process and operational logistics, maintaining the high standards that define the IES network.",
  },
];

export const metadata = {
  title: "Leadership | International Economic Society",
};

export default function LeadershipPage() {
  return (
    <>
      <Navigation />
      <main className="pt-24">
        {/* Header */}
        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <span className="text-xs font-bold text-gold tracking-widest uppercase">Leadership</span>
            <h1 className="mt-4 font-serif text-4xl sm:text-5xl font-bold text-arch-white leading-tight max-w-3xl">
              The Founding Team
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-text-secondary leading-relaxed">
              The people behind a global institution dedicated to advancing
              economic understanding across borders.
            </p>
          </div>
        </section>

        {/* Featured founder — full width */}
        <section className="bg-obsidian-light py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-2 flex justify-center lg:justify-start">
                <div className="w-24 h-24 bg-obsidian border border-border flex items-center justify-center">
                  <span className="font-serif text-3xl font-bold text-gold">
                    {founders[0].name.split(" ").map((n) => n[0]).join("")}
                  </span>
                </div>
              </div>
              <div className="lg:col-span-9 lg:col-start-4">
                <p className="text-xs font-semibold tracking-[0.15em] uppercase text-gold mb-1">
                  {founders[0].role}
                </p>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-arch-white mb-4">
                  {founders[0].name}
                </h2>
                <p className="text-base text-text-secondary leading-relaxed max-w-2xl">
                  {founders[0].bio}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Other founders — three-column cards */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-border">
              {founders.slice(1).map((founder) => (
                <div key={founder.name} className="bg-obsidian p-8 lg:p-10">
                  <div className="w-14 h-14 bg-obsidian-lighter border border-border flex items-center justify-center mb-6">
                    <span className="font-serif text-lg font-bold text-gold">
                      {founder.name.split(" ").map((n) => n[0]).join("")}
                    </span>
                  </div>
                  <p className="text-xs font-semibold tracking-[0.15em] uppercase text-gold mb-1">
                    {founder.role}
                  </p>
                  <h3 className="text-lg font-semibold text-arch-white">
                    {founder.name}
                  </h3>
                  <p className="mt-3 text-sm text-text-secondary leading-relaxed">
                    {founder.bio}
                  </p>
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
