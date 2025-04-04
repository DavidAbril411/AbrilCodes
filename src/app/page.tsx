"use client";
import { useRef, useState, useEffect } from "react";
import Header from "@/components/Header/Header";
import Footer from "@/components/sections/Footer";
import Projects from "@/components/sections/Projects";
import Team from "@/components/sections/Team";
import Services from "@/components/sections/Services";
import About from "@/components/sections/About";
import Hero from "@/components/sections/Hero";
import Contact from "@/components/sections/Contact";
// Import other sections as needed

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");

  // Create refs for each section
  const homeRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  // Function to scroll to a specific section
  const scrollToSection = (sectionId: string) => {
    const sectionRefs: Record<string, React.RefObject<HTMLDivElement | null>> = {
      home: homeRef,
      about: aboutRef,
      services: servicesRef,
      team: teamRef,
      projects: projectsRef,
      contact: contactRef,
    };

    const ref = sectionRefs[sectionId];

    if (ref && ref.current) {
      // Smooth scroll to the section
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Check which section is currently in view for highlighting in the menu
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        { id: "home", ref: homeRef },
        { id: "about", ref: aboutRef },
        { id: "services", ref: servicesRef },
        { id: "team", ref: teamRef },
        { id: "projects", ref: projectsRef },
        { id: "contact", ref: contactRef },
      ];

      // Find the section that is most visible on screen
      let currentSection = "home";
      let maxVisibility = 0;

      sections.forEach(({ id, ref }) => {
        if (ref.current) {
          const rect = ref.current.getBoundingClientRect();
          const windowHeight = window.innerHeight;

          // Calculate how much of the section is visible
          const visibleHeight =
            Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
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

    // Check once on initial load
    handleScroll();

    // Handle hash changes for direct links
    if (window.location.hash) {
      const sectionId = window.location.hash.substring(1);
      scrollToSection(sectionId);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Check if we need to scroll to a section based on URL hash when page loads
  useEffect(() => {
    if (window.location.hash) {
      const sectionId = window.location.hash.substring(1);
      setTimeout(() => {
        scrollToSection(sectionId);
      }, 500); // Small delay to ensure all components are loaded
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

      <div ref={projectsRef} id="projects">
        <Projects />
      </div>

      <div ref={contactRef} id="contact">
        <Contact />
      </div>

      <Footer />

      {/* Add other sections as needed */}
    </main>
  );
}
