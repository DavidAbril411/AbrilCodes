"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import DesignIcon from "../../images/Web.png";
import DevelopmentIcon from "../../images/Code.png";
import SupportIcon from "../../images/Manteinence.png";
import ServiceCard, { type ServiceItem } from "./ServiceCard";

type CardKey = "design" | "development" | "support";
type CardContent = {
  title: string;
  description: string;
  fullDescription: string;
  subtitle?: string;
  bottomRightDescription?: string;
  items?: { title: string; description: string }[];
};

export default function Services() {
  const t = useTranslations("Services");
  const cardsMessages = t.raw("cards") as Record<CardKey, CardContent>;
  const learnMoreLabel = t("learnMore");

  const cardConfigs: Array<{
    key: CardKey;
    iconSrc: string | undefined;
  }> = [
    { key: "design", iconSrc: DesignIcon.src },
    { key: "development", iconSrc: DevelopmentIcon.src },
    { key: "support", iconSrc: SupportIcon.src },
  ];

  const services: ServiceItem[] = cardConfigs.map(({ key, iconSrc }) => {
    const content = cardsMessages[key];
    return {
      id: key,
      title: content.title,
      description: content.description,
      fullDescription: content.fullDescription,
      subtitle: content.subtitle,
      bottomRightDescription: content.bottomRightDescription,
      iconSrc,
      iconAlt: content.title,
      items: content.items ?? [],
      actionLabel: learnMoreLabel,
    };
  });

  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-(--spacing-section)">
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center font-display text-h2 font-semibold text-ink-100"
      >
        {t("title")}
      </motion.h2>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {services.map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
          >
            <ServiceCard service={service} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
