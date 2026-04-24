"use client";

import { Fragment, useRef, useState } from "react";
import BackgroundShape from "../../images/background-shape.svg";
import DavidTop from "../../images/david-top.png";
import DavidBottom from "../../images/david-bottom.png";
import styles from "./Hero.module.css";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";

interface HeroProps {
  scrollToSection: (sectionId: string) => void;
}

export default function Hero({ scrollToSection }: HeroProps) {
  const [imagesLoaded, setImagesLoaded] = useState(true);
  const t = useTranslations("Hero");
  const descriptionLinesRaw = t.raw("description.lines");
  const descriptionLines = Array.isArray(descriptionLinesRaw)
    ? (descriptionLinesRaw as string[])
    : [String(descriptionLinesRaw)];

  const loadedCount = useRef(0);
  const handleImageLoad = () => {
    loadedCount.current++;
    if (loadedCount.current >= 2) setImagesLoaded(true);
  };

  const handleContactClick = () => {
    scrollToSection("contact");
  };

  return (
    <>
      <div className="h-[calc(4vw+60px)]"></div>
      <main className="h-[clamp(670px,80vh,800px)] sm:h-auto md:h-[clamp(630px,calc(100vh-110px),685px)] w-full relative flex items-center justify-center ">
        {/* Aurora gradient mesh */}
        <div className="hero-aurora" />
        {/* Floating particles */}
        {[
          { w: 8, h: 8, top: "15%", left: "8%", dur: "9s", delay: "0s" },
          { w: 5, h: 5, top: "60%", left: "5%", dur: "12s", delay: "2s" },
          { w: 10, h: 10, top: "30%", left: "88%", dur: "7s", delay: "1s" },
          { w: 6, h: 6, top: "75%", left: "80%", dur: "10s", delay: "3s" },
          { w: 4, h: 4, top: "50%", left: "50%", dur: "8s", delay: "1.5s" },
        ].map((p, i) => (
          <span
            key={i}
            className="float-particle"
            style={{
              width: p.w,
              height: p.h,
              top: p.top,
              left: p.left,
              ["--dur" as string]: p.dur,
              ["--delay" as string]: p.delay,
            }}
          />
        ))}
        <img
          src={BackgroundShape.src}
          alt="background-shape"
          className="absolute left-[-40%] top-[20%] -z-[1] w-[95vw] block md:hidden"
        />
        <img
          src={BackgroundShape.src}
          alt="background-shape"
          className="absolute left-[-200px] -z-[1] hidden md:block"
        />
        <div className="w-full max-w-[1280px] h-full flex">
          <div className="flex flex-col md:flex-row items-center justify-between w-full pl-10 pr-10 pt-20 md:pt-0">
            <motion.div
              className="space-y-6 text-center md:text-left"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.h1 className="leading-none">
                <motion.span
                  className="block font-light text-[#000] text-[clamp(40px,8vw,80px)]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                >
                  {t("title.greeting")}
                </motion.span>
                <motion.span
                  className="block font-normal text-[#0A0AE4] text-[clamp(40px,8vw,80px)]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
                >
                  {t("title.intro")}
                </motion.span>
                <motion.span
                  className="block font-semibold text-[#08089D] text-[clamp(40px,8vw,80px)]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
                >
                  {t("title.name")}
                </motion.span>
              </motion.h1>

              <motion.p
                className="leading-5 pt-[clamp(0px,1vw,12px)] hidden md:block"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                {descriptionLines.map((line, index) => (
                  <Fragment key={line}>
                    <span className="text-[clamp(12px,1.7vw,17.5px)] font-normal text-[#332F2B] flex-nowrap text-nowrap ">
                      {line}
                    </span>
                    {index < descriptionLines.length - 1 ? <br /> : null}
                  </Fragment>
                ))}
              </motion.p>

              <motion.p
                className="text-[clamp(11px,2vw,17.5px)] text-[#332F2B] text-center w-[clamp(228px,40vw,470px)] block md:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                {t("description.mobile")}
              </motion.p>

              <motion.button
                className="w-[clamp(111px,17vw,188px)] h-[clamp(30px,4vw,43px)] bg-gradient-to-r from-[#08089D] to-[#030337] text-white rounded-full text-[clamp(10px,1.5vw,18px)] hidden md:block cursor-pointer"
                onClick={handleContactClick}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t("cta")}
              </motion.button>
            </motion.div>

            <div className="relative pt-10 md:pt-0">
              {!imagesLoaded && <></>}
              {imagesLoaded && (
                <motion.div
                  className={`w-[clamp(230px,45vw,470px)] h-[clamp(230px,45vw,470px)] rounded-full relative transform translate-y-4
                }`}
                  style={{
                    boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.25)",
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 1,
                    ease: "easeOut",
                    delay: 0.3,
                  }}
                >
                  <div className="w-full h-full bg-gradient-to-b from-[#08089D] to-[#030337] rounded-full absolute overflow-hidden">
                    <div className="w-[90%] h-[90%] absolute top-[17.5%] left-[5%] flex items-center justify-center">
                      <Image src={DavidBottom} alt="David Bottom" style={{ width: "100%", height: "auto" }} sizes="(max-width: 768px) 90vw, 40vw" onLoad={handleImageLoad} priority />
                    </div>
                  </div>
                  <div className="w-[90%] h-[90%] absolute top-[-30.5%] left-[5%] flex items-center justify-center">
                    <Image src={DavidTop} alt="David Top" style={{ width: "100%", height: "auto" }} sizes="(max-width: 768px) 90vw, 40vw" onLoad={handleImageLoad} priority />
                  </div>
                </motion.div>
              )}
            </div>

            <motion.button
              className="w-[clamp(111px,17vw,188px)] h-[clamp(30px,4vw,43px)] bg-gradient-to-r from-[#08089D] to-[#030337] text-white rounded-full text-[clamp(10px,1.5vw,18px)] block md:hidden translate-y-4 mt-5"
              onClick={handleContactClick}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t("cta")}
            </motion.button>
          </div>
        </div>
        <div className={styles.headerShape}></div>
      </main>
    </>
  );
}
