import { setRequestLocale } from "next-intl/server";
import { AUTHOR, SITE_URL, SOCIAL } from "@/lib/site";
import MotionRoot from "@/components/MotionRoot";
import Header from "@/components/Header/Header";
import Footer from "@/components/sections/Footer";
import Services from "@/components/sections/Services";
import About from "@/components/sections/About";
import Hero from "@/components/sections/Hero";
import Contact from "@/components/sections/Contact";
import Projects from "@/components/sections/Projects";

export default async function Home({
  params,
}: Readonly<{ params: Promise<{ locale: string }> }>) {
  const { locale } = await params;
  setRequestLocale(locale);

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: AUTHOR.name,
    jobTitle: AUTHOR.jobTitle[locale as keyof typeof AUTHOR.jobTitle] ?? AUTHOR.jobTitle.en,
    url: `${SITE_URL}/${locale}`,
    email: `mailto:${AUTHOR.email}`,
    sameAs: [SOCIAL.linkedin, SOCIAL.github],
  };

  return (
    <MotionRoot>
      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <Header />

        <section id="home">
          <Hero />
        </section>

        <section id="about">
          <About />
        </section>

        <section id="services">
          <Services />
        </section>

        <section id="projects">
          <Projects />
        </section>

        <section id="contact">
          <Contact />
        </section>

        <Footer />
      </main>
    </MotionRoot>
  );
}
