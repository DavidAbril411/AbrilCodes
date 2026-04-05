/* eslint-disable @next/next/no-img-element */
"use client";
import { useTranslations } from "next-intl";
import { projects, type Project } from "@/data/projects";
import CarouselComponent from "@/components/Carousel/Carousel";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";
import { FiExternalLink, FiChevronLeft, FiChevronRight } from "react-icons/fi";

/* ─── Inner image gallery for a single project card ──────────── */
function ProjectImageGallery({ images }: { images: string[] }) {
  const [[activeIndex, direction], setPage] = useState([0, 0]);
  const [isPaused, setIsPaused] = useState(false);

  const paginate = useCallback(
    (newDir: number) => {
      setPage(([prev]) => {
        const next = (prev + newDir + images.length) % images.length;
        return [next, newDir];
      });
    },
    [images.length]
  );

  useEffect(() => {
    if (isPaused || images.length <= 1) return;
    const id = setInterval(() => paginate(1), 4000);
    return () => clearInterval(id);
  }, [isPaused, images.length, paginate]);

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({
      x: dir > 0 ? "-100%" : "100%",
      opacity: 0,
    }),
  };

  return (
    <div
      className="relative w-full h-full overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <AnimatePresence initial={false} custom={direction}>
        <motion.img
          key={activeIndex}
          src={images[activeIndex]}
          alt={`Screenshot ${activeIndex + 1}`}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />
      </AnimatePresence>

      {/* Prev / Next */}
      {images.length > 1 && (
        <>
          <motion.button
            onClick={(e) => { e.stopPropagation(); paginate(-1); }}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white"
            whileHover={{ scale: 1.15, backgroundColor: "rgba(8,8,157,0.7)" }}
            whileTap={{ scale: 0.9 }}
          >
            <FiChevronLeft size={16} />
          </motion.button>
          <motion.button
            onClick={(e) => { e.stopPropagation(); paginate(1); }}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white"
            whileHover={{ scale: 1.15, backgroundColor: "rgba(8,8,157,0.7)" }}
            whileTap={{ scale: 0.9 }}
          >
            <FiChevronRight size={16} />
          </motion.button>
        </>
      )}

      {/* Dot indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
          {images.map((_, i) => (
            <motion.button
              key={i}
              onClick={(e) => { e.stopPropagation(); setPage([i, i > activeIndex ? 1 : -1]); }}
              className="rounded-full bg-white/60"
              animate={{
                width: i === activeIndex ? 20 : 8,
                opacity: i === activeIndex ? 1 : 0.5,
              }}
              style={{ height: 8 }}
              transition={{ duration: 0.25 }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Placeholder when no images yet ─────────────────────────── */
function ProjectPlaceholder({ description }: { description?: string }) {
  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center gap-3 px-6 relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #08089D 0%, #030337 100%)",
      }}
    >
      {/* Animated grid lines */}
      <div className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />

      {/* Rocket icon with float animation */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-10"
      >
        <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
          <circle cx="28" cy="28" r="28" fill="rgba(255,255,255,0.08)" />
          <path
            d="M28 10C28 10 38 16 38 28C38 34.627 33.627 39 27 40.5L25 44L23 40.5C16.373 39 12 34.627 12 28C12 16 22 10 28 10Z"
            fill="white"
            fillOpacity="0.9"
          />
          <circle cx="28" cy="28" r="4" fill="#08089D" />
          <path d="M20 38L16 44" stroke="white" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.6" />
          <path d="M36 38L40 44" stroke="white" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.6" />
        </svg>
      </motion.div>

      {/* Description */}
      {description && (
        <p className="text-white/80 text-center text-[clamp(10px,1.1vw,13px)] leading-relaxed max-w-[260px] relative z-10">
          {description}
        </p>
      )}
    </div>
  );
}

/* ─── Single project card with tilt + glow ───────────────────── */
function ProjectCard({ project }: { project: Project }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  // Smooth spring for tilt
  const springConfig = { stiffness: 150, damping: 20 };
  const rotateXSpring = useTransform(rotateX, (v) => v);
  const rotateYSpring = useTransform(rotateY, (v) => v);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    rotateX.set(y * -12);
    rotateY.set(x * 12);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  const hasImages = project.images && project.images.length > 0;

  return (
    <motion.div
      ref={cardRef}
      className="h-full w-full rounded-[25px] overflow-hidden relative cursor-pointer select-none"
      style={{
        rotateX: rotateXSpring,
        rotateY: rotateYSpring,
        transformPerspective: 1000,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{
        boxShadow: "0 0 40px rgba(8,8,157,0.55), 0 0 80px rgba(8,8,157,0.2)",
        transition: { duration: 0.3 },
      }}
      whileInView={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 30 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* Image gallery OR placeholder */}
      <div className="absolute inset-0">
        {hasImages ? (
          <ProjectImageGallery images={project.images!} />
        ) : (
          <ProjectPlaceholder description={project.description} />
        )}
      </div>

      {/* Bottom info overlay */}
      <div
        className="absolute bottom-0 left-0 right-0 z-30 px-4 pt-8 pb-4"
        style={{
          background:
            "linear-gradient(to top, rgba(3,3,55,0.97) 60%, transparent 100%)",
        }}
      >
        {/* Title + external link */}
        <div className="flex items-center justify-between gap-2 mb-2">
          {project.url ? (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white font-semibold text-[clamp(14px,1.5vw,20px)] hover:text-blue-300 transition-colors flex items-center gap-1.5 group"
              onClick={(e) => e.stopPropagation()}
            >
              {project.title}
              <FiExternalLink
                size={14}
                className="opacity-60 group-hover:opacity-100 transition-opacity"
              />
            </a>
          ) : (
            <span className="text-white font-semibold text-[clamp(14px,1.5vw,20px)]">
              {project.title}
            </span>
          )}
        </div>

        {/* Tech chips */}
        {project.tech && project.tech.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {project.tech.map((tag) => (
              <motion.span
                key={tag}
                className="px-2 py-0.5 rounded-full text-[clamp(9px,0.9vw,11px)] font-medium text-white/90 border border-white/20"
                style={{ backgroundColor: "rgba(255,255,255,0.08)", backdropFilter: "blur(8px)" }}
                whileHover={{ scale: 1.08, backgroundColor: "rgba(8,8,157,0.5)", borderColor: "rgba(142,142,255,0.5)" }}
                transition={{ duration: 0.15 }}
              >
                {tag}
              </motion.span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

/* ─── Section ─────────────────────────────────────────────────── */
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
              <ProjectCard key={project.id} project={project} />
            ))}
          </CarouselComponent>
        )}
      </div>
    </section>
  );
}
