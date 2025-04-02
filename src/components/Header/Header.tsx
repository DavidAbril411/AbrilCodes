// components/Header/Header.tsx
"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Añadir este import
import styles from "./Header.module.css";

import Icon from "../../images/icon-blue.svg";
import IconText from "../../images/icon-text.svg";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname(); // Obtener la ruta actual

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

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
            <Link
              href="/"
              onClick={closeMenu}
              className={pathname === "/" ? styles.active : ""}
            >
              Home
            </Link>
            <Link
              href="/about"
              onClick={closeMenu}
              className={pathname === "/about" ? styles.active : ""}
            >
              About me
            </Link>
            <Link
              href="/services"
              onClick={closeMenu}
              className={pathname === "/services" ? styles.active : ""}
            >
              Services
            </Link>
            <Link
              href="/team"
              onClick={closeMenu}
              className={pathname === "/team" ? styles.active : ""}
            >
              My team
            </Link>
            <Link
              href="/projects"
              onClick={closeMenu}
              className={pathname === "/projects" ? styles.active : ""}
            >
              Projects
            </Link>
          </div>
        </nav>

        <button className={styles.downloadCv}>Download CV</button>

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
