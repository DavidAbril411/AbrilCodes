"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { projects, type Project } from "@/data/projects";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";

export default function Projects() {
  const t = useTranslations("Projects");
  const [expanded, setExpanded] = useState<Project | null>(null);

  return (
    <section className="relative mx-auto w-full max-w-5xl overflow-hidden px-6 py-(--spacing-section)">
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
        aria-hidden="true"
      />

      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 text-center font-display text-h2 font-semibold text-ink-100"
      >
        {t("title")}
      </motion.h2>

      <div className="relative z-10 mt-12">
        {projects.length === 0 ? (
          <motion.div
            className="flex flex-col items-center justify-center gap-4 py-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" aria-hidden="true">
              <rect x="4" y="12" width="56" height="40" rx="6" stroke="#8f90ff" strokeWidth="2.5" fill="none" />
              <path d="M4 20h56" stroke="#8f90ff" strokeWidth="2" />
              <circle cx="13" cy="16" r="2" fill="#8f90ff" />
              <circle cx="21" cy="16" r="2" fill="#8f90ff" />
              <circle cx="29" cy="16" r="2" fill="#8f90ff" />
              <path d="M22 34l6 6 14-14" stroke="#0a0ae4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className="text-[clamp(18px,2.5vw,28px)] text-blue-300 font-medium">
              {t("empty")}
            </p>
          </motion.div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                className="aspect-[4/3]"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.08 }}
              >
                <ProjectCard
                  project={project}
                  onExpand={() => setExpanded(project)}
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {expanded && (
          <ProjectModal project={expanded} onClose={() => setExpanded(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
