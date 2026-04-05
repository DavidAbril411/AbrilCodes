/* eslint-disable @next/next/no-img-element */
"use client";
import { useTranslations } from "next-intl";
import { projects } from "@/data/projects";
import CarouselComponent from "@/components/Carousel/Carousel";
import { motion } from "framer-motion";

export default function Projects() {
  const t = useTranslations("Projects");

  return (
    <section className="w-full flex flex-col items-center justify-center mt-20 relative overflow-hidden">
      {/* Glow blob */}
      <div
        className="glow-blob"
        style={{
          width: "clamp(200px,35vw,500px)",
          height: "clamp(200px,35vw,500px)",
          top: "0%",
          left: "50%",
          transform: "translateX(-50%)",
          background: "rgba(8,8,157,0.09)",
        }}
      />

      <h2 className="text-[clamp(30px,4vw,50px)] text-[#000] font-normal relative z-10">
        {t("title")}
      </h2>

      <div className="w-full max-w-[100vw] px-4 lg:max-w-[1100px] h-full flex items-center justify-center mt-6 relative z-10">
        {projects.length === 0 ? (
          <motion.div
            className="flex flex-col items-center justify-center gap-4 py-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <svg
              width="64"
              height="64"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <rect
                x="4"
                y="12"
                width="56"
                height="40"
                rx="6"
                stroke="#08089D"
                strokeWidth="2.5"
                fill="none"
              />
              <path
                d="M4 20h56"
                stroke="#08089D"
                strokeWidth="2"
              />
              <circle cx="13" cy="16" r="2" fill="#08089D" />
              <circle cx="21" cy="16" r="2" fill="#08089D" />
              <circle cx="29" cy="16" r="2" fill="#08089D" />
              <path
                d="M22 34l6 6 14-14"
                stroke="#0A0AE4"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="text-[clamp(18px,2.5vw,28px)] text-[#08089D] font-medium">
              {t("empty")}
            </p>
          </motion.div>
        ) : (
          <CarouselComponent>
            {projects.map((project) => (
              <div
                key={project.id}
                className="h-full w-full rounded-[25px] overflow-hidden relative bg-gray-200"
              >
                {project.imageUrl && (
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                )}
                <span className="absolute bottom-0 w-full bg-[#06067E] h-[clamp(40px,6vw,65px)] text-white text-start text-[clamp(14px,1.5vw,20px)] flex items-center px-4 font-semibold">
                  {project.url ? (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      {project.title}
                    </a>
                  ) : (
                    project.title
                  )}
                </span>
              </div>
            ))}
          </CarouselComponent>
        )}
      </div>
    </section>
  );
}
