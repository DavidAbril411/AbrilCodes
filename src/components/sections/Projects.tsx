"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { projects, type Project } from "@/data/projects";
import CarouselComponent from "@/components/Carousel/Carousel";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";
import { FiExternalLink, FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi";
import Image from "next/image";

/* ─────────────────────────────────────────────────────────────────
   EXPANDED MODAL
   Mobile:  carousel top (fixed height) → description bottom (scroll)
   Desktop: description left → carousel right
───────────────────────────────────────────────────────────────── */
function ProjectExpandedModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const images = project.images ?? [];
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const thumbRef = useRef<HTMLDivElement>(null);

  const prev = useCallback(
    () => setActive((i) => (i - 1 + images.length) % images.length),
    [images.length]
  );
  const next = useCallback(
    () => setActive((i) => (i + 1) % images.length),
    [images.length]
  );

  useEffect(() => {
    if (paused || images.length <= 1) return;
    const id = setInterval(next, 3500);
    return () => clearInterval(id);
  }, [paused, images.length, next]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, next, prev]);

  // Scroll thumbnail strip without triggering parent scroll
  useEffect(() => {
    const strip = thumbRef.current;
    if (!strip) return;
    const el = strip.children[active] as HTMLElement | undefined;
    if (!el) return;
    const stripRect = strip.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    strip.scrollLeft += elRect.left - stripRect.left - (stripRect.width - elRect.width) / 2;
  }, [active]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const blocks = (project.longDescription ?? project.description ?? "").split("\n\n");

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center p-3 md:p-4"
      style={{ backgroundColor: "rgba(2,2,20,0.88)", backdropFilter: "blur(18px)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
    >
      <motion.div
        className="relative w-full max-w-6xl rounded-3xl flex flex-col md:flex-row overflow-y-auto md:overflow-hidden"
        style={{
          maxHeight: "92vh",
          background: "linear-gradient(135deg, #08082a 0%, #030318 100%)",
          boxShadow: "0 0 0 1px rgba(100,100,255,0.15), 0 32px 80px rgba(0,0,0,0.7)",
          overscrollBehavior: "contain",
          WebkitOverflowScrolling: "touch",
        } as React.CSSProperties}
        initial={{ scale: 0.94, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.94, y: 20 }}
        transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-30 w-9 h-9 rounded-full flex items-center justify-center text-white/60 hover:text-white transition-colors"
          style={{ background: "rgba(255,255,255,0.08)" }}
          aria-label="Cerrar"
        >
          <FiX size={18} />
        </button>

        {/* ══════════════════════════════════════════
            CAROUSEL — order-1 on mobile (top), order-2 on desktop (right)
        ══════════════════════════════════════════ */}
        {images.length > 0 && (
          <div
            className="order-1 md:order-2 w-full md:w-[58%] shrink-0 flex flex-col border-b md:border-b-0 md:border-l border-white/10 h-[58vh] md:h-auto"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {/* Main image */}
            <div className="flex-1 relative bg-black/20 overflow-hidden min-h-0">
              {images.map((src, i) => (
                <div
                  key={src}
                  className="absolute inset-3"
                  style={{
                    opacity: i === active ? 1 : 0,
                    transition: "opacity 0.4s ease",
                    pointerEvents: i === active ? "auto" : "none",
                  }}
                >
                  <Image
                    src={src}
                    alt={`Screenshot ${i + 1}`}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 650px"
                    priority={i === 0}
                  />
                </div>
              ))}

              {/* Counter */}
              <span
                className="absolute top-2 right-2 text-white/40 text-xs tabular-nums z-10 px-2 py-0.5 rounded-full"
                style={{ background: "rgba(0,0,0,0.4)" }}
              >
                {active + 1} / {images.length}
              </span>

              {images.length > 1 && (
                <>
                  <button
                    onClick={prev}
                    className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full flex items-center justify-center text-white transition-colors"
                    style={{ background: "rgba(255,255,255,0.1)" }}
                    aria-label="Anterior"
                  >
                    <FiChevronLeft size={16} />
                  </button>
                  <button
                    onClick={next}
                    className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full flex items-center justify-center text-white transition-colors"
                    style={{ background: "rgba(255,255,255,0.1)" }}
                    aria-label="Siguiente"
                  >
                    <FiChevronRight size={16} />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail strip */}
            {images.length > 1 && (
              <div
                ref={thumbRef}
                className="shrink-0 flex gap-1.5 px-3 py-2 overflow-x-auto border-t border-white/10"
                style={{ scrollbarWidth: "none" }}
              >
                {images.map((src, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className="shrink-0 rounded-lg overflow-hidden transition-all duration-200 hover:scale-105 relative"
                    style={{
                      width: 40,
                      height: 56,
                      border: `2px solid ${i === active ? "#5555ff" : "transparent"}`,
                      opacity: i === active ? 1 : 0.4,
                    }}
                    aria-label={`Ver imagen ${i + 1}`}
                  >
                    <img
                      src={src}
                      alt={`thumb-${i + 1}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ══════════════════════════════════════════
            DESCRIPTION — order-2 on mobile (bottom), order-1 on desktop (left)
        ══════════════════════════════════════════ */}
        <div
          className="order-2 md:order-1 w-full md:w-[42%] shrink-0 flex flex-col px-6 py-6 md:px-8 md:py-8 md:overflow-y-auto"
          style={{ scrollbarWidth: "none" } as React.CSSProperties}
        >
          {/* Logo */}
          {project.logo && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={project.logo}
              alt={project.title}
              className="h-10 w-auto object-contain mb-5 self-start"
              draggable={false}
            />
          )}

          {/* Title + link */}
          <div className="flex items-center gap-2 mb-4">
            <h3 className="text-white font-bold text-xl leading-tight">{project.title}</h3>
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors shrink-0 mt-0.5"
                aria-label={`Ver ${project.title}`}
              >
                <FiExternalLink size={15} />
              </a>
            )}
          </div>

          {/* Description blocks */}
          <div className="space-y-3 flex-1">
            {blocks.map((block, i) => {
              const lines = block.split("\n");
              return (
                <div key={i} className="space-y-1">
                  {lines.map((line, j) => {
                    if (line.startsWith("•")) {
                      return (
                        <div key={j} className="flex gap-2 items-start">
                          <span className="text-blue-400 mt-0.5 shrink-0">•</span>
                          <p className="text-white/70 text-sm leading-relaxed">{line.slice(1).trim()}</p>
                        </div>
                      );
                    }
                    if (/^[📦✅🚀]/.test(line)) {
                      return (
                        <p key={j} className="text-white/90 text-sm font-semibold leading-relaxed">{line}</p>
                      );
                    }
                    return line ? (
                      <p key={j} className="text-white/70 text-sm leading-relaxed">{line}</p>
                    ) : null;
                  })}
                </div>
              );
            })}
          </div>

          {/* Tech tags */}
          {project.tech && project.tech.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-5 pt-5 border-t border-white/10">
              {project.tech.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-full text-xs font-medium text-white/75 border border-white/15"
                  style={{ backgroundColor: "rgba(80,80,255,0.1)" }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   PROJECT CARD
───────────────────────────────────────────────────────────────── */
function ProjectCard({
  project,
  onExpand,
}: {
  project: Project;
  onExpand: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="h-full w-full rounded-[25px] overflow-hidden relative cursor-pointer"
      style={{
        transition: "box-shadow 0.3s ease, outline 0.3s ease",
        boxShadow: hovered
          ? "0 0 0 2px rgba(80,80,255,0.55), 0 8px 48px rgba(8,8,157,0.45)"
          : "0 4px 20px rgba(0,0,0,0.2)",
        outline: hovered
          ? "1.5px solid rgba(120,120,255,0.35)"
          : "1.5px solid transparent",
        background: "linear-gradient(135deg, #08082a 0%, #030318 100%)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onExpand}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onExpand()}
      aria-label={`Ver detalles de ${project.title}`}
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
          {/* eslint-disable-next-line @next/next/no-img-element */}
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
          <span className="text-white font-semibold text-[clamp(14px,1.5vw,20px)]">
            {project.title}
          </span>
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/50 hover:text-blue-300 transition-colors"
              onClick={(e) => e.stopPropagation()}
              aria-label={`Ver ${project.title}`}
            >
              <FiExternalLink size={13} />
            </a>
          )}
        </div>

        {project.description && (
          <p className="text-white/55 text-[clamp(9px,0.85vw,11px)] leading-snug mb-2 line-clamp-2">
            {project.description}
          </p>
        )}

        {project.tech && project.tech.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {project.tech.slice(0, 6).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-full text-[clamp(8px,0.8vw,10px)] font-medium text-white/80 border border-white/20"
                style={{ backgroundColor: "rgba(255,255,255,0.07)" }}
              >
                {tag}
              </span>
            ))}
            {project.tech.length > 6 && (
              <span className="px-2 py-0.5 rounded-full text-[clamp(8px,0.8vw,10px)] font-medium text-white/50">
                +{project.tech.length - 6}
              </span>
            )}
          </div>
        )}

        <p
          className="mt-2 text-white/30 text-[10px] tracking-wide transition-opacity duration-300"
          style={{ opacity: hovered ? 1 : 0 }}
        >
          Click para ver más →
        </p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   SECTION
───────────────────────────────────────────────────────────────── */
export default function Projects() {
  const t = useTranslations("Projects");
  const [expanded, setExpanded] = useState<Project | null>(null);

  return (
    <section className="w-full flex flex-col items-center justify-center mt-20 relative overflow-hidden">
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
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" aria-hidden="true">
              <rect x="4" y="12" width="56" height="40" rx="6" stroke="#08089D" strokeWidth="2.5" fill="none" />
              <path d="M4 20h56" stroke="#08089D" strokeWidth="2" />
              <circle cx="13" cy="16" r="2" fill="#08089D" />
              <circle cx="21" cy="16" r="2" fill="#08089D" />
              <circle cx="29" cy="16" r="2" fill="#08089D" />
              <path d="M22 34l6 6 14-14" stroke="#0A0AE4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className="text-[clamp(18px,2.5vw,28px)] text-[#08089D] font-medium">
              {t("empty")}
            </p>
          </motion.div>
        ) : (
          <CarouselComponent>
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onExpand={() => setExpanded(project)}
              />
            ))}
          </CarouselComponent>
        )}
      </div>

      <AnimatePresence>
        {expanded && (
          <ProjectExpandedModal
            project={expanded}
            onClose={() => setExpanded(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
