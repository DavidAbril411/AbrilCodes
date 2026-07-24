import { setRequestLocale } from "next-intl/server";
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

  return (
    <main>
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
  );
}
