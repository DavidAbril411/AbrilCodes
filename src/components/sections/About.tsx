"use client";

import { useEffect, useRef, useState } from "react";
import "./About.css";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const textElements = useRef<HTMLParagraphElement[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Add elements to the textElements array
  const addToRefs = (el: HTMLParagraphElement) => {
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
              About <span className="about-heading-accent">Me</span>
            </h2>

            <div className="about-bio">
              <p className="scroll-reveal" ref={addToRefs}>
                I&apos;m David Abril, a professional developer with an 8.75/10
                GPA in Computer Engineering. My journey began at MindFactory,
                where I developed core skills before venturing out to create
                Abril Codes, blending creativity and technology into unique
                digital solutions.
              </p>

              <p className="scroll-reveal" ref={addToRefs}>
                At Abril Codes, I collaborate with a talented team: Valentina
                Correa (graphic designer) and Francisco Ameri (software engineer
                and project manager). Together, we create solutions that balance
                cutting-edge technology with thoughtful design. I&apos;m
                particularly proud of our approach that values both technical
                excellence and the human element in every project we undertake.
              </p>

              <p
                className="about-academic-emphasis scroll-reveal"
                ref={addToRefs}
              >
                I firmly believe in the value that academic knowledge brings to
                software development. When building my team, I prioritize
                individuals with strong educational backgrounds, as university
                education provides a solid foundation of theoretical principles
                and problem-solving methodologies that are essential for
                creating sophisticated, well-documented solutions that stand the
                test of time.
              </p>
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
            <h3>My AI Philosophy</h3>
            <p className="scroll-reveal" ref={addToRefs}>
              My approach to AI in development is pragmatic: it should enhance
              human creativity, not replace it. While AI can handle syntax and
              implementation details, developers must retain deep understanding
              of fundamentals. I don&apos;t believe in memorizing what AI can
              generate with a simple prompt—instead, I invest my energy in
              mastering core concepts and problem-solving skills that allow me
              to effectively direct AI tools while maintaining complete control
              over architecture and quality.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
