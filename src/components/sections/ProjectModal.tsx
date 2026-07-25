/* eslint-disable @next/next/no-img-element */
"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { FiExternalLink, FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi";
import Image from "next/image";
import type { Project } from "@/data/projects";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

export default function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const t = useTranslations("Projects");
  const titleId = useId();
  const images = project.images ?? [];
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const thumbRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

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
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Focus trap: move focus into the dialog on open, cycle Tab within it,
  // restore focus to the trigger element on close.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;

    const getFocusable = () =>
      Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));

    const first = getFocusable()[0];
    (first ?? dialog).focus();

    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const items = getFocusable();
      if (items.length === 0) return;
      const firstItem = items[0];
      const lastItem = items[items.length - 1];
      if (e.shiftKey && document.activeElement === firstItem) {
        e.preventDefault();
        lastItem.focus();
      } else if (!e.shiftKey && document.activeElement === lastItem) {
        e.preventDefault();
        firstItem.focus();
      }
    };

    dialog.addEventListener("keydown", handleKeydown);
    return () => {
      dialog.removeEventListener("keydown", handleKeydown);
      previouslyFocused?.focus();
    };
  }, []);

  const longDescriptionKey = `items.${project.id}.longDescription`;
  const blocks = (t.has(longDescriptionKey) ? t(longDescriptionKey) : "").split(
    "\n\n"
  );

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
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className="relative w-full max-w-6xl rounded-3xl flex flex-col md:flex-row overflow-y-auto md:overflow-hidden outline-none"
        style={{
          maxHeight: "92vh",
          background: "linear-gradient(135deg, #08082a 0%, #030318 100%)",
          boxShadow: "0 0 0 1px rgba(100,100,255,0.15), 0 32px 80px rgba(0,0,0,0.7)",
          overscrollBehavior: "contain",
          WebkitOverflowScrolling: "touch",
        }}
        initial={{ scale: 0.94, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.94, y: 20 }}
        transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-30 w-9 h-9 rounded-full flex items-center justify-center text-white/60 hover:text-white transition-colors"
          style={{ background: "rgba(255,255,255,0.08)" }}
          aria-label={t("modal.close")}
        >
          <FiX size={18} />
        </button>

        {images.length > 0 && (
          <div
            className="order-1 md:order-2 w-full md:w-[58%] shrink-0 flex flex-col border-b md:border-b-0 md:border-l border-white/10 h-[58vh] md:h-auto"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
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
                    aria-label={t("modal.prev")}
                  >
                    <FiChevronLeft size={16} />
                  </button>
                  <button
                    onClick={next}
                    className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full flex items-center justify-center text-white transition-colors"
                    style={{ background: "rgba(255,255,255,0.1)" }}
                    aria-label={t("modal.next")}
                  >
                    <FiChevronRight size={16} />
                  </button>
                </>
              )}
            </div>

            {images.length > 1 && (
              <div
                ref={thumbRef}
                className="shrink-0 flex gap-1.5 px-3 py-2 overflow-x-auto border-t border-white/10"
                style={{ scrollbarWidth: "none" }}
              >
                {images.map((src, i) => (
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
                    aria-label={t("modal.viewImage", { index: i + 1 })}
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

        <div
          className="order-2 md:order-1 w-full md:w-[42%] shrink-0 flex flex-col px-6 py-6 md:px-8 md:py-8 md:overflow-y-auto"
          style={{ scrollbarWidth: "none" }}
        >
          {project.logo && (
            <img
              src={project.logo}
              alt=""
              className="h-10 w-auto object-contain mb-5 self-start"
              draggable={false}
            />
          )}

          <div className="flex items-center gap-2 mb-4">
            <h3 id={titleId} className="text-white font-bold text-xl leading-tight">
              {project.title}
            </h3>
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors shrink-0 mt-0.5"
                aria-label={t("visit", { title: project.title })}
              >
                <FiExternalLink size={15} />
              </a>
            )}
          </div>

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
                          <p className="text-white/70 text-sm leading-relaxed">
                            {line.slice(1).trim()}
                          </p>
                        </div>
                      );
                    }
                    if (/^[📦✅🚀]/.test(line)) {
                      return (
                        <p
                          key={j}
                          className="text-white/90 text-sm font-semibold leading-relaxed"
                        >
                          {line}
                        </p>
                      );
                    }
                    return line ? (
                      <p key={j} className="text-white/70 text-sm leading-relaxed">
                        {line}
                      </p>
                    ) : null;
                  })}
                </div>
              );
            })}
          </div>

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
