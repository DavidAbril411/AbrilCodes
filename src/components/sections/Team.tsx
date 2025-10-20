"use client";

import { useRef, useState, useEffect } from "react";
import DavidImage from "@/images/david-image.png";
import FranciscoImage from "@/images/francisco-image.png";
import ValentinaImage from "@/images/valentina-image.png";
import TeamCard from "../TeamCard";
import { useTranslations } from "next-intl";

export default function Team() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const t = useTranslations("Team");
  type MemberKey = "francisco" | "david" | "valentina";
  const members = t.raw("members") as Record<
    MemberKey,
    { name: string; role: string }
  >;

  // Track mouse movement for parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const { left, top, width, height } =
          sectionRef.current.getBoundingClientRect();
        const x = (e.clientX - left) / width - 0.5;
        const y = (e.clientY - top) / height - 0.5;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Set up scroll reveal animations
  useEffect(() => {
    // Reset refs array
    cardRefs.current = cardRefs.current.slice(0, 3);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px",
      }
    );

    // Observe all cards
    cardRefs.current.forEach((card) => {
      if (card) {
        observer.observe(card);
      }
    });

    return () => {
      cardRefs.current.forEach((card) => {
        if (card) {
          observer.unobserve(card);
        }
      });
    };
  }, []);

  return (
    <section
      className="w-full flex flex-col items-center justify-center pt-10"
      ref={sectionRef}
    >
      <h2 className="text-[clamp(30px,3.3vw,40px)] text-[#000] font-normal">
        {t("title")}
      </h2>

      {/* Cambiamos de flex-row a flex-col en móviles, y cambiamos espaciado */}
      <div
        className="flex flex-col md:flex-row items-center md:items-start 
                space-y-20 md:space-y-0 md:space-x-[clamp(10px,5.47vw,70px)] mt-14"
      >
        <div
          ref={(el) => {
            cardRefs.current[0] = el;
          }}
          className="scroll-reveal-card"
        >
          <TeamCard
            imageSrc={FranciscoImage.src}
            name={members.francisco.name}
            role={members.francisco.role}
            linkedinLink="https://www.linkedin.com/in/fran-ameri/"
            githubLink="https://github.com/franameri"
            mousePosition={mousePosition}
            moveFactor={1}
          />
        </div>
        <div
          ref={(el) => {
            cardRefs.current[1] = el;
          }}
          className="scroll-reveal-card delay-1"
        >
          <TeamCard
            imageSrc={DavidImage.src}
            name={members.david.name}
            role={members.david.role}
            linkedinLink="https://www.linkedin.com/in/david-abril-perrig/"
            githubLink="https://github.com/DavidAbril"
            mousePosition={mousePosition}
            moveFactor={0}
          />
        </div>
        <div
          ref={(el) => {
            cardRefs.current[2] = el;
          }}
          className="scroll-reveal-card delay-2"
        >
          <TeamCard
            imageSrc={ValentinaImage.src}
            name={members.valentina.name}
            role={members.valentina.role}
            linkedinLink="https://www.linkedin.com/in/valentinacorreaok/"
            mousePosition={mousePosition}
            moveFactor={-1}
          />
        </div>
      </div>
    </section>
  );
}
