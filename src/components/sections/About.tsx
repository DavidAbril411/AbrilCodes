"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const, delay },
  }),
};

export default function About() {
  const t = useTranslations("About");
  const paragraphsRaw = t.raw("paragraphs");
  const paragraphs = Array.isArray(paragraphsRaw)
    ? (paragraphsRaw as string[])
    : [String(paragraphsRaw)];

  return (
    <div className="relative overflow-hidden bg-surface py-(--spacing-section)">
      <div
        className="glow-blob"
        style={{
          width: "min(45vw, 460px)",
          height: "min(45vw, 460px)",
          top: "10%",
          right: "-10%",
          background: "rgba(10,10,228,0.14)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto grid w-full max-w-5xl gap-12 px-6 md:grid-cols-[1.5fr_1fr] md:items-start">
        <div>
          <motion.h2
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-10% 0px" }}
            variants={fadeUp}
            className="font-display text-h2 font-semibold text-ink-100"
          >
            {t("heading.primary")}{" "}
            <span className="text-blue-300">{t("heading.accent")}</span>
          </motion.h2>

          <div className="mt-6 space-y-4">
            {paragraphs.map((paragraph, index) => (
              <motion.p
                key={paragraph}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-10% 0px" }}
                custom={0.1 + index * 0.12}
                variants={fadeUp}
                className={
                  index === paragraphs.length - 1
                    ? "border-l-2 border-blue-500 bg-blue-500/[0.07] py-3 pl-4 text-ink-300 italic"
                    : "text-lead text-ink-300"
                }
              >
                {paragraph}
              </motion.p>
            ))}
          </div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10% 0px" }}
          custom={0.3}
          variants={fadeUp}
          className="glass rounded-card p-6"
        >
          <h3 className="mb-3 border-b border-white/10 pb-3 text-h3 font-semibold text-blue-300">
            {t("aiTitle")}
          </h3>
          <p className="text-sm leading-relaxed text-ink-300">{t("aiBody")}</p>
        </motion.div>
      </div>
    </div>
  );
}
