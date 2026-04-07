/* eslint-disable @next/next/no-img-element */
"use client";

import { useTranslations } from "next-intl";
import { projects, type Project } from "@/data/projects";
import CarouselComponent from "@/components/Carousel/Carousel";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";
import {
  FiExternalLink,
  FiChevronLeft,
  FiChevronRight,
  FiX,
  FiMaximize2,
} from "react-icons/fi";

/* ─────────────────────────────────────────────────────────────────
   GALLERY  — pure CSS opacity cross-fade, no AnimatePresence
   (AnimatePresence inside overflow-hidden Swiper slides breaks clicks)
───────────────────────────────────────────────────────────────── */
function ProjectImageGallery({
  images,
  onOpenLightbox,
}: {
  images: string[];
  onOpenLightbox: (index: number) => void;
}) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

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
    const id = setInterval(next, 4000);
    return () => clearInterval(id);
  }, [paused, images.length, next]);

  return (
    <div
      className="relative w-full h-full"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Stack all images; only active one is opaque */}
      {images.map((src, i) => (
        <img
          key={src}
          src={src}
          alt={`Screenshot ${i + 1}`}
          draggable={false}
          className="absolute inset-0 w-full h-full object-cover select-none"
          style={{
            opacity: i === active ? 1 : 0,
            transition: "opacity 0.45s ease",
            pointerEvents: i === active ? "auto" : "none",
          }}
        />
      ))}

      {/* Expand / lightbox button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onOpenLightbox(active);
        }}
        className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-[rgba(8,8,157,0.7)] transition-colors"
        aria-label="Ver proyecto en detalle"
      >
        <FiMaximize2 size={14} />
      </button>

      {/* Prev / Next arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-[rgba(8,8,157,0.7)] transition-colors"
            aria-label="Imagen anterior"
          >
            <FiChevronLeft size={16} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-[rgba(8,8,157,0.7)] transition-colors"
            aria-label="Imagen siguiente"
          >
            <FiChevronRight size={16} />
          </button>
        </>
      )}

      {/* Dot indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-[4.5rem] left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={(e) => {
                e.stopPropagation();
                setActive(i);
              }}
              className="rounded-full bg-white/70 transition-all duration-200"
              style={{
                width: i === active ? 20 : 8,
                height: 8,
                opacity: i === active ? 1 : 0.5,
              }}
              aria-label={`Ir a imagen ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   FULLSCREEN LIGHTBOX
───────────────────────────────────────────────────────────────── */
function ProjectLightbox({
  project,
  startIndex,
  onClose,
}: {
  project: Project;
  startIndex: number;
  onClose: () => void;
}) {
  const images = project.images ?? [];
  const [[activeIndex, direction], setPage] = useState<[number, number]>([
    startIndex,
    0,
  ]);
  const thumbRef = useRef<HTMLDivElement>(null);

  const paginate = useCallback(
    (dir: number) => {
      setPage(([prev]) => [(prev + dir + images.length) % images.length, dir]);
    },
    [images.length]
  );

  const goTo = useCallback(
    (i: number) =>
      setPage(([prev]) => [i, i > prev ? 1 : -1]),
    []
  );

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") paginate(1);
      if (e.key === "ArrowLeft") paginate(-1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, paginate]);

  // Scroll active thumbnail into view
  useEffect(() => {
    const el = thumbRef.current?.children[activeIndex] as
      | HTMLElement
      | undefined;
    el?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [activeIndex]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const slideVariants = {
    enter: (d: number) => ({ x: d > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? "-100%" : "100%", opacity: 0 }),
  };

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex flex-col"
      style={{
        backgroundColor: "rgba(2,2,30,0.95)",
        backdropFilter: "blur(14px)",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      {/* Header */}
      <div
        className="shrink-0 flex items-center justify-between px-6 py-4 border-b border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-2">
            <span className="text-white font-semibold text-lg leading-tight">
              {project.title}
            </span>
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors"
                onClick={(e) => e.stopPropagation()}
                aria-label="Ver sitio del proyecto"
              >
                <FiExternalLink size={15} />
              </a>
            )}
          </div>
          {project.description && (
            <p className="text-white/55 text-sm max-w-xl leading-snug">
              {project.description}
            </p>
          )}
        </div>

        <div className="flex items-center gap-4 shrink-0 ml-4">
          <span className="text-white/40 text-sm tabular-nums">
            {activeIndex + 1} / {images.length}
          </span>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center text-white/80"
            aria-label="Cerrar"
          >
            <FiX size={18} />
          </button>
        </div>
      </div>

      {/* Main image */}
      <div
        className="flex-1 relative flex items-center justify-center px-16 min-h-0 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.img
            key={activeIndex}
            src={images[activeIndex]}
            alt={`${project.title} – screenshot ${activeIndex + 1}`}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
            className="max-h-full max-w-full object-contain rounded-2xl select-none"
            draggable={false}
            style={{ boxShadow: "0 24px 64px rgba(0,0,0,0.7)" }}
          />
        </AnimatePresence>

        {images.length > 1 && (
          <>
            <button
              onClick={() => paginate(-1)}
              className="absolute left-3 w-10 h-10 rounded-full bg-white/10 hover:bg-[rgba(8,8,157,0.6)] backdrop-blur-sm transition-colors flex items-center justify-center text-white z-10"
              aria-label="Imagen anterior"
            >
              <FiChevronLeft size={20} />
            </button>
            <button
              onClick={() => paginate(1)}
              className="absolute right-3 w-10 h-10 rounded-full bg-white/10 hover:bg-[rgba(8,8,157,0.6)] backdrop-blur-sm transition-colors flex items-center justify-center text-white z-10"
              aria-label="Imagen siguiente"
            >
              <FiChevronRight size={20} />
            </button>
          </>
        )}
      </div>

      {/* Tech tags + thumbnail strip */}
      <div
        className="shrink-0 px-6 py-4 space-y-3 border-t border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        {project.tech && project.tech.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {project.tech.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-0.5 rounded-full text-xs font-medium text-white/80 border border-white/15"
                style={{ backgroundColor: "rgba(255,255,255,0.07)" }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {images.length > 1 && (
          <div
            ref={thumbRef}
            className="flex gap-2 overflow-x-auto pb-1"
            style={{ scrollbarWidth: "none" }}
          >
            {images.map((src, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className="shrink-0 rounded-lg overflow-hidden border-2 transition-all duration-200 hover:scale-105"
                style={{
                  width: 56,
                  height: 80,
                  borderColor:
                    i === activeIndex ? "#4444ff" : "transparent",
                  opacity: i === activeIndex ? 1 : 0.45,
                }}
                aria-label={`Ver imagen ${i + 1}`}
              >
                <img
                  src={src}
                  alt={`thumb-${i + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   PROJECT CARD
   Hover: glow + border highlight (no transforms — avoids conflicts
   with Swiper's own 3D coverflow transforms on the slide element).
───────────────────────────────────────────────────────────────── */
function ProjectCard({
  project,
  onOpenLightbox,
}: {
  project: Project;
  onOpenLightbox: (index: number) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const hasImages = (project.images?.length ?? 0) > 0;

  return (
    <div
      className="h-full w-full rounded-[25px] overflow-hidden relative"
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
    >
      {/* ── Image gallery ── */}
      <div className="absolute inset-0">
        {hasImages ? (
          <ProjectImageGallery
            images={project.images!}
            onOpenLightbox={onOpenLightbox}
          />
        ) : (
          /* Placeholder when no screenshots yet */
          <div
            className="w-full h-full flex flex-col items-center justify-center gap-3 px-6 relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #08089D 0%, #030337 100%)",
            }}
          >
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
                backgroundSize: "30px 30px",
              }}
            />
            {project.description && (
              <p className="text-white/80 text-center text-[clamp(10px,1.1vw,13px)] leading-relaxed max-w-[260px] relative z-10">
                {project.description}
              </p>
            )}
          </div>
        )}
      </div>

      {/* ── Bottom info overlay ── */}
      <div
        className="absolute bottom-0 left-0 right-0 z-30 px-4 pt-10 pb-4 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(3,3,55,0.97) 55%, transparent 100%)",
        }}
      >
        {/* Title + external link */}
        <div className="flex items-center gap-1.5 mb-2 pointer-events-auto">
          <span className="text-white font-semibold text-[clamp(14px,1.5vw,20px)]">
            {project.title}
          </span>
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-blue-300 transition-colors"
              onClick={(e) => e.stopPropagation()}
              aria-label={`Ver ${project.title}`}
            >
              <FiExternalLink size={13} />
            </a>
          )}
        </div>

        {/* Description */}
        {project.description && (
          <p className="text-white/65 text-[clamp(9px,0.85vw,11px)] leading-snug mb-2 line-clamp-2">
            {project.description}
          </p>
        )}

        {/* Tech tags */}
        {project.tech && project.tech.length > 0 && (
          <div className="flex flex-wrap gap-1 pointer-events-auto">
            {project.tech.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-full text-[clamp(8px,0.8vw,10px)] font-medium text-white/85 border border-white/20"
                style={{
                  backgroundColor: "rgba(255,255,255,0.08)",
                  backdropFilter: "blur(8px)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   SECTION
───────────────────────────────────────────────────────────────── */
export default function Projects() {
  const t = useTranslations("Projects");
  const [lightbox, setLightbox] = useState<{
    project: Project;
    index: number;
  } | null>(null);

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
            <svg
              width="64"
              height="64"
              viewBox="0 0 64 64"
              fill="none"
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
              <path d="M4 20h56" stroke="#08089D" strokeWidth="2" />
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
              <ProjectCard
                key={project.id}
                project={project}
                onOpenLightbox={(index) => setLightbox({ project, index })}
              />
            ))}
          </CarouselComponent>
        )}
      </div>

      {/* Lightbox — rendered outside carousel so z-index is never trapped */}
      <AnimatePresence>
        {lightbox && (
          <ProjectLightbox
            project={lightbox.project}
            startIndex={lightbox.index}
            onClose={() => setLightbox(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
