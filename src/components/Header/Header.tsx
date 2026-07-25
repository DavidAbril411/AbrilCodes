/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { useActiveSection } from "@/hooks/useActiveSection";

import Icon from "../../images/icon-white.svg";
import IconText from "../../images/icon-text-white.svg";

const SECTION_IDS = ["home", "about", "services", "projects", "contact"];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("Header");
  const locale = useLocale();
  const activeSection = useActiveSection(SECTION_IDS);

  const closeMenu = () => setIsMenuOpen(false);

  const handleLanguageChange = (targetLocale: "en" | "es") => {
    if (targetLocale === locale) return;

    const hash = window.location.hash ?? "";
    const basePath = pathname || "/";
    const normalizedPath = basePath.startsWith("/") ? basePath : `/${basePath}`;

    const stripLocalePrefix = (path: string, currentLocale: string) => {
      const prefix = `/${currentLocale}`;
      if (path === prefix) return "/";
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
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:px-4 sm:pt-4">
      <div className="glass flex w-full max-w-5xl items-center justify-between gap-2 rounded-full py-2 pl-3 pr-2 sm:pl-5 sm:pr-3">
        <a href="#home" className="flex shrink-0 items-center gap-2">
          <img src={Icon.src} alt="" className="h-6 w-6 sm:h-7 sm:w-7" />
          <img
            src={IconText.src}
            alt="AbrilCodes"
            className="hidden h-4 w-auto sm:block"
          />
        </a>

        <nav className="hidden items-center gap-0.5 md:flex" aria-label="Sections">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                aria-current={isActive ? "true" : undefined}
                className={`relative rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                  isActive ? "text-ink-100" : "text-ink-300 hover:text-ink-100"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-active-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-white/10"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <div className="glass hidden items-center rounded-full p-0.5 sm:flex">
            {languageOptions.map((option) => (
              <button
                key={option.locale}
                type="button"
                onClick={() => handleLanguageChange(option.locale)}
                aria-label={t("language.aria", { locale: option.label })}
                aria-pressed={locale === option.locale}
                className={`relative rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
                  locale === option.locale
                    ? "text-ink-100"
                    : "text-ink-500 hover:text-ink-300"
                }`}
              >
                {locale === option.locale && (
                  <motion.span
                    layoutId="lang-active-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-blue-500"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                {option.label}
              </button>
            ))}
          </div>

          <button
            className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 rounded-full md:hidden"
            onClick={() => setIsMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            <span
              className={`block h-0.5 w-4 bg-ink-100 transition-transform ${
                isMenuOpen ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-4 bg-ink-100 transition-opacity ${
                isMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-4 bg-ink-100 transition-transform ${
                isMenuOpen ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-x-3 top-[calc(var(--spacing-header)+0.5rem)] z-40 flex flex-col gap-1 rounded-3xl border border-white/10 bg-navy-900/97 p-4 shadow-2xl backdrop-blur-xl md:hidden"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
          >
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={closeMenu}
                className={`rounded-2xl px-4 py-3 text-base font-medium ${
                  activeSection === item.id
                    ? "bg-white/10 text-ink-100"
                    : "text-ink-300"
                }`}
              >
                {item.label}
              </a>
            ))}
            <div className="mt-2 flex items-center gap-2 px-4">
              {languageOptions.map((option) => (
                <button
                  key={option.locale}
                  type="button"
                  onClick={() => handleLanguageChange(option.locale)}
                  aria-label={t("language.aria", { locale: option.label })}
                  aria-pressed={locale === option.locale}
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    locale === option.locale
                      ? "bg-blue-500 text-ink-100"
                      : "text-ink-500"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
