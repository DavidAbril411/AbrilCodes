/* eslint-disable @next/next/no-img-element */
"use client";
import { Fragment, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import styles from "./Header.module.css";

import Icon from "../../images/icon-blue.svg";
import IconText from "../../images/icon-text.svg";

interface HeaderProps {
  scrollToSection: (sectionId: string) => void;
  activeSection: string;
}

const Header: React.FC<HeaderProps> = ({ scrollToSection, activeSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("Header");
  const locale = useLocale();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleNavClick = (sectionId: string) => {
    closeMenu();

    // If we're on the homepage, scroll to section
    const normalizedPath = pathname || "/";
    const isHome =
      normalizedPath === "/" || normalizedPath === `/${locale}`;

    if (isHome) {
      scrollToSection(sectionId);
    } else {
      // If we're on another page, navigate to homepage and then scroll
      router.push(`/${locale}#${sectionId}`);
    }
  };

  const handleLanguageChange = (targetLocale: "en" | "es") => {
    if (targetLocale === locale) {
      return;
    }

    const hash = window.location.hash ?? "";
    const basePath = pathname || "/";
    const normalizedPath = basePath.startsWith("/") ? basePath : `/${basePath}`;
    const targetPath =
      normalizedPath === "/"
        ? `/${targetLocale}`
        : `/${targetLocale}${normalizedPath}`;

    router.replace(`${targetPath}${hash}`);
    closeMenu();
  };

  const navItems: Array<{ id: string; label: string }> = [
    { id: "home", label: t("nav.home") },
    { id: "about", label: t("nav.about") },
    { id: "services", label: t("nav.services") },
    { id: "team", label: t("nav.team") },
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
          <img src={Icon.src} alt="Icon" className={styles.logoIcon} />
          <img src={IconText.src} alt="IconText" className={styles.logoText} />
        </div>

        <nav
          className={`${styles.menuContainer} ${
            isMenuOpen ? styles.active : ""
          }`}
        >
          <div className={styles.menu}>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`${styles.navButton} ${
                  activeSection === item.id ? styles.navButtonActive : ""
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </nav>
        <div className={styles.languageSelector}>
          {languageOptions.map((option, index) => (
            <Fragment key={option.locale}>
              <button
                type="button"
                onClick={() => handleLanguageChange(option.locale)}
                aria-label={t("language.aria")}
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
