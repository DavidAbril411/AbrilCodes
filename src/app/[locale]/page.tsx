"use client";
import { useRef, useState, useEffect } from "react";
import Header from "@/components/Header/Header";
import Footer from "@/components/sections/Footer";
import Team from "@/components/sections/Team";
import Services from "@/components/sections/Services";
import About from "@/components/sections/About";
import Hero from "@/components/sections/Hero";
import Contact from "@/components/sections/Contact";

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");

  const homeRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (sectionId: string) => {
    const sectionRefs: Record<string, React.RefObject<HTMLDivElement | null>> = {
      home: homeRef,
      about: aboutRef,
      services: servicesRef,
      team: teamRef,
      projects: projectsRef,
      contact: contactRef
    };

    const ref = sectionRefs[sectionId];

    if (ref && ref.current) {
      const yOffset = -1 * ((4 * window.innerWidth) / 100 + 77);
      const element = ref.current;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({
        top: y,
        behavior: "smooth"
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        { id: "home", ref: homeRef },
        { id: "about", ref: aboutRef },
        { id: "services", ref: servicesRef },
        { id: "team", ref: teamRef },
        { id: "contact", ref: contactRef }
      ];

      let currentSection = "home";
      let maxVisibility = 0;

      sections.forEach(({ id, ref }) => {
        if (ref.current) {
          const rect = ref.current.getBoundingClientRect();
          const windowHeight = window.innerHeight;

          const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
          const visibilityRatio = visibleHeight / rect.height;

          if (visibilityRatio > 0 && visibilityRatio > maxVisibility) {
            maxVisibility = visibilityRatio;
            currentSection = id;
          }
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    if (window.location.hash) {
      const sectionId = window.location.hash.substring(1);
      scrollToSection(sectionId);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (window.location.hash) {
      const sectionId = window.location.hash.substring(1);
      setTimeout(() => {
        scrollToSection(sectionId);
      }, 500);
    }
  }, []);

  return (
    <main>
      <Header scrollToSection={scrollToSection} activeSection={activeSection} />

      <div ref={homeRef} id="home">
        <Hero scrollToSection={scrollToSection} />
      </div>

      <div ref={aboutRef} id="about">
        <About />
      </div>

      <div ref={servicesRef} id="services">
        <Services />
      </div>

      <div ref={teamRef} id="team">
        <Team />
      </div>

      <div ref={contactRef} id="contact">
        <Contact />
      </div>

      <Footer />
    </main>
  );
}
