"use client";

import { useRef, useState, useEffect } from "react";
import DavidImage from "@/images/david-image.png";
import TeamCard from "../TeamCard";
import { useTranslations } from "next-intl";

export default function Team() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const t = useTranslations("Team");
  type MemberKey = "dana" | "david" | "teo";
  const members = t.raw("members") as Record<
    MemberKey,
    { name: string; role: string }
  >;

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
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    cardRefs.current = cardRefs.current.slice(0, 3);

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

    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => {
      cardRefs.current.forEach((card) => {
        if (card) observer.unobserve(card);
      });
    };
  }, []);

  return (
    // No overflow-hidden here — it clips drop-shadow on cards.
    // Glow blobs live in their own overflow-hidden wrapper so they stay contained.
    <section
      className="w-full flex flex-col items-center justify-center pt-10 pb-16 relative"
      ref={sectionRef}
    >
      {/* Blob wrapper — clips only the decoration, not the card shadows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="glow-blob"
          style={{
            width: "clamp(200px,30vw,420px)",
            height: "clamp(200px,30vw,420px)",
            top: "10%",
            left: "-8%",
            background: "rgba(8,8,157,0.13)",
          }}
        />
        <div
          className="glow-blob"
          style={{
            width: "clamp(150px,22vw,320px)",
            height: "clamp(150px,22vw,320px)",
            top: "30%",
            right: "-6%",
            background: "rgba(10,10,228,0.10)",
          }}
        />
      </div>

      <h2 className="text-[clamp(30px,3.3vw,40px)] text-[#000] font-normal relative z-10">
        {t("title")}
      </h2>

      <div
        className="flex flex-col md:flex-row items-center md:items-start
                space-y-20 md:space-y-0 md:space-x-[clamp(10px,5.47vw,70px)] mt-14 relative z-10"
      >
        <div
          ref={(el) => { cardRefs.current[0] = el; }}
          className="scroll-reveal-card"
        >
          <TeamCard
            imageSrc={undefined}
            name={members.dana.name}
            role={members.dana.role}
            mousePosition={mousePosition}
            moveFactor={1}
          />
        </div>
        <div
          ref={(el) => { cardRefs.current[1] = el; }}
          className="scroll-reveal-card delay-1"
        >
          <TeamCard
            imageSrc={DavidImage.src}
            name={members.david.name}
            role={members.david.role}
            linkedinLink="https://www.linkedin.com/in/david-abril-perrig/"
            githubLink="https://github.com/DavidAbril411"
            mousePosition={mousePosition}
            moveFactor={0}
          />
        </div>
        <div
          ref={(el) => { cardRefs.current[2] = el; }}
          className="scroll-reveal-card delay-2"
        >
          <TeamCard
            imageSrc={undefined}
            name={members.teo.name}
            role={members.teo.role}
            mousePosition={mousePosition}
            moveFactor={-1}
          />
        </div>
      </div>
    </section>
  );
}
