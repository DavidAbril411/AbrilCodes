/* eslint-disable @next/next/no-img-element */
"use client";

import Icon from "../../images/icon-white.svg";
import IconText from "../../images/icon-text-white.svg";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("Footer");
  const navItems = [
    { id: "home", label: t("nav.home") },
    { id: "about", label: t("nav.about") },
    { id: "services", label: t("nav.services") },
    { id: "projects", label: t("nav.projects") },
  ];

  return (
    <footer className="mt-(--spacing-section) w-full border-t border-white/8 bg-surface">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-8 px-6 py-12 text-center md:flex-row md:items-start md:justify-between md:text-left">
        <div className="flex flex-col items-center md:items-start">
          <div className="flex items-center gap-2">
            <img src={Icon.src} alt="" className="h-6 w-6" />
            <img src={IconText.src} alt="AbrilCodes" className="h-4 w-auto" />
          </div>
          <p className="mt-4 max-w-[280px] text-sm text-ink-500">
            {t("description")}
          </p>
        </div>

        <div className="flex flex-col items-center md:items-start">
          <h4 className="mb-2 text-sm font-semibold text-ink-100">
            {t("explore")}
          </h4>
          <ul className="space-y-2 text-sm text-ink-500">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="transition-colors hover:text-ink-100"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/8 px-6 py-5 text-center text-xs text-ink-500">
        © {new Date().getFullYear()} · {t("copyright")}
      </div>
    </footer>
  );
}
