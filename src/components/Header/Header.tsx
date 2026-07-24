/* eslint-disable @next/next/no-img-element */
"use client";
import { Fragment, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { useActiveSection } from "@/hooks/useActiveSection";
import styles from "./Header.module.css";

import Icon from "../../images/icon-blue.svg";
import IconText from "../../images/icon-text.svg";

const SECTION_IDS = ["home", "about", "services", "projects", "contact"];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("Header");
  const locale = useLocale();
  const activeSection = useActiveSection(SECTION_IDS);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLanguageChange = (targetLocale: "en" | "es") => {
    if (targetLocale === locale) {
      return;
    }

    const hash = window.location.hash ?? "";
    const basePath = pathname || "/";
    const normalizedPath = basePath.startsWith("/") ? basePath : `/${basePath}`;

    const stripLocalePrefix = (path: string, currentLocale: string) => {
      const prefix = `/${currentLocale}`;

      if (path === prefix) {
        return "/";
      }

      if (path.startsWith(`${prefix}/`)) {
        const trimmed = path.slice(prefix.length);
        return trimmed.length > 0 ? trimmed : "/";
      }

      return path;
    };

    const pathWithoutLocale = stripLocalePrefix(normalizedPath, locale);
    const sanitizedPath = pathWithoutLocale.startsWith("/")
      ? pathWithoutLocale
      : `/${pathWithoutLocale}`;

    const targetPathname = sanitizedPath === "" ? "/" : sanitizedPath;

    router.replace(targetPathname, { locale: targetLocale });

    if (hash) {
      const normalizedHash = hash.startsWith("#") ? hash : `#${hash}`;
      requestAnimationFrame(() => {
        window.location.hash = normalizedHash;
      });
    }
    closeMenu();
  };

  const navItems: Array<{ id: string; label: string }> = [
    { id: "home", label: t("nav.home") },
    { id: "about", label: t("nav.about") },
    { id: "services", label: t("nav.services") },
    { id: "projects", label: t("nav.projects") },
    { id: "contact", label: t("nav.contact") },
  ];

  const languageOptions: Array<{ locale: "en" | "es"; label: string }> = [
    { locale: "en", label: t("language.en") },
    { locale: "es", label: t("language.es") },
  ];

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.logoContainer}>
          <img src={Icon.src} alt="" className={styles.logoIcon} />
          <img src={IconText.src} alt="AbrilCodes" className={styles.logoText} />
        </div>

        <nav
          className={`${styles.menuContainer} ${
            isMenuOpen ? styles.active : ""
          }`}
        >
          <div className={styles.menu}>
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={closeMenu}
                aria-current={activeSection === item.id ? "true" : undefined}
                className={`${styles.navButton} ${
                  activeSection === item.id ? styles.navButtonActive : ""
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>
        <div className={styles.languageSelector}>
          {languageOptions.map((option, index) => (
            <Fragment key={option.locale}>
              <button
                type="button"
                onClick={() => handleLanguageChange(option.locale)}
                aria-label={t("language.aria", { locale: option.label })}
                aria-pressed={locale === option.locale}
                className={`${styles.languageButton} ${
                  locale === option.locale ? styles.languageButtonActive : ""
                }`}
              >
                {option.label}
              </button>
              {index === 0 ? <span className={styles.languageDivider} /> : null}
            </Fragment>
          ))}
        </div>

        <button
          className={`${styles.hamburgerMenu} ${
            isMenuOpen ? styles.active : ""
          }`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
      <div className={styles.headerShape}></div>
    </header>
  );
};

export default Header;
