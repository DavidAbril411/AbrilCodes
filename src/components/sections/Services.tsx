"use client";
import { useRef, useState, useEffect } from "react";
import styles from "./services.module.css";
import DesignIcon from "../../images/Web.png";
import DevelopmentIcon from "../../images/Code.png";
import SupportIcon from "../../images/Manteinence.png";
import {
  ExpandProvider,
  ServicesCardContainer,
  ServiceItem,
} from "../ExpandableCard";
import { useTranslations } from "next-intl";

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null!);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const t = useTranslations("Services");

  // Handle mouse movement for parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const { left, top, width, height } =
          sectionRef.current.getBoundingClientRect();
        const x = (e.clientX - left) / width - 0.5;
        const y = (e.clientY - top) / height - 0.5;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  type CardKey = "design" | "development" | "support";
  type CardContent = {
    title: string;
    description: string;
    fullDescription: string;
    subtitle?: string;
    bottomRightDescription?: string;
    items?: { title: string; description: string }[];
  };

  const cardsMessages = t.raw("cards") as Record<CardKey, CardContent>;
  const learnMoreLabel = t("learnMore");

  const cardConfigs: Array<{
    key: CardKey;
    direction: ServiceItem["direction"];
    iconSrc: string | undefined;
    iconAlt: string;
  }> = [
    {
      key: "design",
      direction: "left-to-right",
      iconSrc: DesignIcon.src,
      iconAlt: t("cards.design.title"),
    },
    {
      key: "development",
      direction: "center",
      iconSrc: DevelopmentIcon.src,
      iconAlt: t("cards.development.title"),
    },
    {
      key: "support",
      direction: "right-to-left",
      iconSrc: SupportIcon.src,
      iconAlt: t("cards.support.title"),
    },
  ];

  const servicesData: ServiceItem[] = cardConfigs.map(
    ({ key, direction, iconSrc, iconAlt }) => {
      const content = cardsMessages[key];

      return {
        id: key,
        title: content.title,
        description: content.description,
        fullDescription: content.fullDescription,
        subtitle: content.subtitle,
        bottomRightDescription: content.bottomRightDescription,
        direction,
        iconSrc,
        iconAlt,
        items: content.items ?? [],
        actionLabel: learnMoreLabel,
      } satisfies ServiceItem;
    }
  );

  return (
    <section
      ref={sectionRef}
      className="max-w-[100vw] overflow-hidden relative pt-[clamp(50px,5vw,80px)]"
    >
      <div className="flex flex-col items-center justify-center pb-[clamp(20px,10vw,200px)] px-4 gap-14">
        <h2 className="text-[30px] font-semibold text-[#fff]">{t("title")}</h2>
        <ExpandProvider>
          <ServicesCardContainer
            services={servicesData}
            sectionRef={sectionRef}
            mousePosition={mousePosition}
          />
        </ExpandProvider>
      </div>
      <div
        className={`${styles.headerShapeInset}`}
        style={{ height: "calc(100% + clamp(300px, 40vw, 400px))" }}
      ></div>
    </section>
  );
}
