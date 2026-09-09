import { Suspense } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import MemberArea from "@/components/members/MemberArea";

export default function MembersPage() {
  return (
    <>
      <Navigation />
      <main className="pt-24">
        <section className="py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            {/* MemberArea reads ?c= through useSearchParams, which needs a
                boundary above it for this page to prerender. */}
            <Suspense fallback={<div className="h-px w-24 bg-gold animate-pulse" />}>
              <MemberArea />
            </Suspense>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
