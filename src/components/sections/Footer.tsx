"use client";

import Icon from "../../images/icon-white.svg";
import IconText from "../../images/icon-text-white.svg";
import styles from "./Footer.module.css";

export default function Footer() {
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
            Tecnología precisa, diseño funcional: páginas web profesionales que
            convierten visitas en clientes.
          </p>
        </div>

        {/* Enlaces de navegación */}
        <div className="flex flex-col items-center md:items-start">
          <h4 className="text-[clamp(14px,1.5vw,18px)] font-semibold mb-2">
            Explore
          </h4>
          <ul className="space-y-2 text-[clamp(12px,1.2vw,16px)]">
            <li>Home</li>
            <li>About me</li>
            <li>Services</li>
            <li>My team</li>
            <li>Projects</li>
          </ul>
        </div>
      </div>

      {/* Derechos reservados */}
      <div className="w-full flex items-center justify-center mt-6 px-[clamp(16px,4vw,32px)] text-center">
        <p className="text-[clamp(12px,1.2vw,16px)]">
          © 2025 - David Ignacio Abril Perrig - Diseño y frontend responsive
        </p>
      </div>
    </footer>
  );
}
