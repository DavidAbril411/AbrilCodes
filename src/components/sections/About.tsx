"use client";

import { useEffect, useRef, useState } from "react";
import "./About.css";
import { useTranslations } from "next-intl";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const textElements = useRef<HTMLParagraphElement[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const t = useTranslations("About");
  const paragraphsRaw = t.raw("paragraphs");
  const paragraphs = Array.isArray(paragraphsRaw)
    ? (paragraphsRaw as string[])
    : [String(paragraphsRaw)];

  // Add elements to the textElements array
  const addToRefs = (el: HTMLParagraphElement | null) => {
    if (el && !textElements.current.includes(el)) {
      textElements.current.push(el);
    }
  };

  useEffect(() => {
    const elementsSnapshot = [...textElements.current];
    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const { left, top, width, height } =
          sectionRef.current.getBoundingClientRect();
        const x = (e.clientX - left) / width - 0.5;
        const y = (e.clientY - top) / height - 0.5;
        setMousePosition({ x, y });
      }
    };

    // Scroll animation observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
    );

    // Observe all text elements
    elementsSnapshot.forEach((el) => observer.observe(el));

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      elementsSnapshot.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="relative">
      <div className="about-background-primary"></div>
      <div className="about-background-secondary"></div>

      <section className="about-section" id="about" ref={sectionRef}>
        <div
          className="about-content-container"
          style={{
            transform: `translate(${mousePosition.x * 5}px, ${
              mousePosition.y * 5
            }px)`,
            transition: "transform 0.5s ease-out",
          }}
        >
          <div className="about-text-container">
            <h2 className="about-heading">
              {t("heading.primary")} <span className="about-heading-accent">{t("heading.accent")}</span>
            </h2>

            <div className="about-bio">
              {paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className={`scroll-reveal ${
                    index === paragraphs.length - 1 ? "about-academic-emphasis" : ""
                  }`}
                  ref={addToRefs}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <div
            className="about-goals"
            style={{
              transform: `translate(${mousePosition.x * -7}px, ${
                mousePosition.y * -7
              }px)`,
              transition: "transform 0.5s ease-out",
            }}
          >
            <h3>{t("aiTitle")}</h3>
            <p className="scroll-reveal" ref={addToRefs}>
              {t("aiBody")}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
