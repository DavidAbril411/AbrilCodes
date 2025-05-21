"use client";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleNavClick = (sectionId: string) => {
    closeMenu();

    // If we're on the homepage, scroll to section
    if (pathname === "/") {
      scrollToSection(sectionId);
    } else {
      // If we're on another page, navigate to homepage and then scroll
      router.push(`/#${sectionId}`);
    }
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
            <button
              onClick={() => handleNavClick("home")}
              className={activeSection === "home" ? styles.active : ""}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick("about")}
              className={activeSection === "about" ? styles.active : ""}
            >
              About me
            </button>
            <button
              onClick={() => handleNavClick("services")}
              className={activeSection === "services" ? styles.active : ""}
            >
              Services
            </button>
            <button
              onClick={() => handleNavClick("team")}
              className={activeSection === "team" ? styles.active : ""}
            >
              My team
            </button>
            {/* <button
              onClick={() => handleNavClick("projects")}
              className={activeSection === "projects" ? styles.active : ""}
            >
              Projects
            </button> */}
            <button
              onClick={() => handleNavClick("contact")}
              className={activeSection === "contact" ? styles.active : ""}
            >
              Contact
            </button>
          </div>
        </nav>
        <div className={styles.languageSelector}>
          <button className="">EN</button>
          <button className="">ES</button>
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
