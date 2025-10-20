/* eslint-disable @next/next/no-img-element */
"use client";

import Icon from "../../images/icon-white.svg";
import IconText from "../../images/icon-text-white.svg";
import styles from "./Footer.module.css";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export default function Footer() {
  const t = useTranslations("Footer");
  const navItems = [
    { id: "home", label: t("nav.home") },
    { id: "about", label: t("nav.about") },
    { id: "services", label: t("nav.services") },
    { id: "team", label: t("nav.team") },
    { id: "projects", label: t("nav.projects") },
  ];

  return (
    <footer
      className="w-full flex flex-col items-center justify-center text-white py-[clamp(20px,5vw,40px)] mt-[clamp(20px,5vw,40px)]"
      style={{
        background:
          "linear-gradient(270.04deg, #2626AA -10.57%, #08089D 48.56%, #2626AA 111.01%)",
      }}
    >
      <div className="w-full max-w-[1200px] flex flex-col md:flex-row items-center justify-between px-[clamp(16px,4vw,32px)] gap-6">
        {/* Logo y descripción */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className={styles.logoContainer}>
            <img src={Icon.src} alt="Icon" className={styles.logoIcon} />
            <img src={IconText.src} alt="IconText" className={styles.logoText} />
          </div>
          <p className="text-[clamp(12px,1.2vw,16px)] max-w-[300px] mt-4">
            {t("description")}
          </p>
        </div>

        {/* Enlaces de navegación */}
        <div className="flex flex-col items-center md:items-start">
          <h4 className="text-[clamp(14px,1.5vw,18px)] font-semibold mb-2">
            {t("explore")}
          </h4>
          <ul className="space-y-2 text-[clamp(12px,1.2vw,16px)]">
            {navItems.map((item) => (
              <li key={item.id}>
                <Link
                  href={{ pathname: "/", hash: item.id }}
                  className="transition-opacity hover:opacity-80"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Derechos reservados */}
      <div className="w-full flex items-center justify-center mt-6 px-[clamp(16px,4vw,32px)] text-center">
        <p className="text-[clamp(12px,1.2vw,16px)]">{t("copyright")}</p>
      </div>
    </footer>
  );
}
