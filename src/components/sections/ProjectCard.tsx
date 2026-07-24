/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { FiExternalLink } from "react-icons/fi";
import type { Project } from "@/data/projects";

export default function ProjectCard({
  project,
  onExpand,
}: {
  project: Project;
  onExpand: () => void;
}) {
  const t = useTranslations("Projects");
  const [hovered, setHovered] = useState(false);
  const descriptionKey = `items.${project.id}.description`;
  const description = t.has(descriptionKey) ? t(descriptionKey) : null;

  return (
    <div
      className="h-full w-full rounded-card overflow-hidden relative cursor-pointer bg-gradient-to-br from-navy-800 to-navy-950"
      style={{
        transition: "box-shadow 0.3s ease, outline 0.3s ease",
        boxShadow: hovered
          ? "0 0 0 2px rgba(80,80,255,0.55), 0 8px 48px rgba(8,8,157,0.45)"
          : "0 4px 20px rgba(0,0,0,0.2)",
        outline: hovered
          ? "1.5px solid rgba(120,120,255,0.35)"
          : "1.5px solid transparent",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onExpand}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onExpand();
        }
      }}
      aria-label={t("viewDetails", { title: project.title })}
    >
      {/* Grid texture */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Hover glow */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500"
        style={{
          opacity: hovered ? 1 : 0,
          background: "radial-gradient(circle at 50% 40%, rgba(80,80,255,0.18) 0%, transparent 65%)",
        }}
      />

      {/* Logo — fills the upper ~58% of the card */}
      {project.logo && (
        <div
          className="absolute left-0 right-0 top-0 flex items-center justify-center"
          style={{ bottom: "42%", padding: "6% 10%" }}
        >
          <img
            src={project.logo}
            alt={project.title}
            draggable={false}
            className="max-w-full max-h-full object-contain select-none"
            style={{
              transform: hovered ? "scale(1.06)" : "scale(1)",
              transition: "transform 0.5s ease",
            }}
          />
        </div>
      )}

      {/* Bottom info overlay */}
      <div
        className="absolute bottom-0 left-0 right-0 z-10 px-4 pt-12 pb-4"
        style={{
          background: "linear-gradient(to top, rgba(3,3,55,0.97) 60%, transparent 100%)",
        }}
      >
        <div className="flex items-center gap-1.5 mb-1.5">
          <span className="text-ink-100 font-semibold text-[clamp(14px,1.5vw,20px)]">
            {project.title}
          </span>
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink-500 hover:text-blue-300 transition-colors"
              onClick={(e) => e.stopPropagation()}
              aria-label={t("visit", { title: project.title })}
            >
              <FiExternalLink size={13} />
            </a>
          )}
        </div>

        {description && (
          <p className="text-ink-300 text-[clamp(9px,0.85vw,11px)] leading-snug mb-2 line-clamp-2">
            {description}
          </p>
        )}

        {project.tech && project.tech.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {project.tech.slice(0, 6).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-full text-[clamp(8px,0.8vw,10px)] font-medium text-ink-100 border border-white/20 bg-white/[0.07]"
              >
                {tag}
              </span>
            ))}
            {project.tech.length > 6 && (
              <span className="px-2 py-0.5 rounded-full text-[clamp(8px,0.8vw,10px)] font-medium text-ink-500">
                +{project.tech.length - 6}
              </span>
            )}
          </div>
        )}

        <p
          className="mt-2 text-ink-500 text-[10px] tracking-wide transition-opacity duration-300"
          style={{ opacity: hovered ? 1 : 0 }}
        >
          {t("viewMore")}
        </p>
      </div>
    </div>
  );
}
