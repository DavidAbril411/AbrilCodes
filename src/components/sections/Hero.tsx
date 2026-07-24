"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import DavidPortrait from "../../images/david-portrait.webp";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" as const, delay },
  }),
};

export default function Hero() {
  const t = useTranslations("Hero");

  return (
    <main className="relative flex min-h-[calc(100svh-var(--spacing-header))] w-full items-center justify-center overflow-hidden pt-(--spacing-header)">
      {/* Static low-cost background glows — no animation loop */}
      <div
        className="glow-blob"
        style={{
          width: "min(60vw, 620px)",
          height: "min(60vw, 620px)",
          top: "-10%",
          left: "-10%",
          background: "rgba(10,10,228,0.16)",
        }}
        aria-hidden="true"
      />
      <div
        className="glow-blob"
        style={{
          width: "min(50vw, 520px)",
          height: "min(50vw, 520px)",
          bottom: "-15%",
          right: "-8%",
          background: "rgba(8,8,157,0.20)",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 40%, #000 0%, transparent 75%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center gap-10 px-6 py-16 md:flex-row md:items-center md:justify-between md:gap-8">
        <div className="flex max-w-xl flex-col items-center text-center md:items-start md:text-left">
          <motion.span
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-blue-300"
          >
            {t("title.greeting")}
          </motion.span>

          <motion.h1
            initial="hidden"
            animate="show"
            custom={0.1}
            variants={fadeUp}
            className="font-display text-display font-semibold text-ink-100"
          >
            {t("title.intro")}{" "}
            <span className="text-gradient-accent">{t("title.name")}</span>
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="show"
            custom={0.22}
            variants={fadeUp}
            className="mt-6 text-lead text-ink-300"
          >
            {t("description")}
          </motion.p>

          <motion.div
            initial="hidden"
            animate="show"
            custom={0.34}
            variants={fadeUp}
            className="mt-8 flex flex-wrap items-center justify-center gap-3 md:justify-start"
          >
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="rounded-full bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-3 text-sm font-semibold text-ink-100 shadow-[0_8px_30px_rgba(10,10,228,0.35)]"
            >
              {t("cta")}
            </motion.a>
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="glass rounded-full px-6 py-3 text-sm font-semibold text-ink-100"
            >
              {t("viewProjects")}
            </motion.a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
          className="glass relative flex h-56 w-56 shrink-0 items-end justify-center overflow-hidden rounded-full sm:h-72 sm:w-72"
        >
          <div
            className="absolute inset-0 -z-10"
            style={{
              background:
                "radial-gradient(circle at 50% 30%, rgba(10,10,228,0.35), transparent 70%)",
            }}
          />
          <Image
            src={DavidPortrait}
            alt="David Abril Perrig"
            priority
            className="h-full w-auto object-cover object-top"
            sizes="(max-width: 640px) 224px, 288px"
          />
        </motion.div>
      </div>
    </main>
  );
}
