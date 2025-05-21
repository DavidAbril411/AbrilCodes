"use client";

import { useState, useEffect } from "react";
import BackgroundShape from "../../images/background-shape.svg";
import DavidTop from "../../images/david-top.png";
import DavidBottom from "../../images/david-bottom.png";
import styles from "./Hero.module.css";
import { motion } from "framer-motion";

interface HeroProps {
  scrollToSection: (sectionId: string) => void;
}

export default function Hero({ scrollToSection }: HeroProps) {
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    const topImg = new Image();
    const bottomImg = new Image();

    let loadedCount = 0;
    const checkAllLoaded = () => {
      loadedCount++;
      if (loadedCount === 2) {
        setImagesLoaded(true);
      }
    };

    topImg.onload = checkAllLoaded;
    bottomImg.onload = checkAllLoaded;

    topImg.src = DavidTop.src;
    bottomImg.src = DavidBottom.src;

    return () => {
      topImg.onload = null;
      bottomImg.onload = null;
    };
  }, []);

  const handleContactClick = () => {
    scrollToSection("contact");
  };

  return (
    <>
      <div className="h-[calc(4vw+60px)]"></div>
      <main className="h-[clamp(670px,80vh,800px)] sm:h-auto md:h-[clamp(630px,calc(100vh-110px),685px)] w-full relative flex items-center justify-center ">
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
                  Hello
                </motion.span>
                <motion.span
                  className="block font-normal text-[#0A0AE4] text-[clamp(40px,8vw,80px)]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
                >
                  I&apos;m David
                </motion.span>
                <motion.span
                  className="block font-semibold text-[#08089D] text-[clamp(40px,8vw,80px)]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
                >
                  Abril Perrig
                </motion.span>
              </motion.h1>

              <motion.p
                className="leading-5 pt-[clamp(0px,1vw,12px)] hidden md:block"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <span className="text-[clamp(12px,1.7vw,17.5px)] font-normal text-[#332F2B] flex-nowrap text-nowrap ">
                  I&apos;m a full-stack web developer
                </span>
                <br />
                <span className="text-[clamp(12px,1.7vw,17.5px)] font-normal text-[#332F2B] flex-nowrap text-nowrap">
                  and founder of Abril Codes. I turn ideas into
                </span>
                <br />
                <span className="text-[clamp(12px,1.7vw,17.5px)] font-normal text-[#332F2B] text-nowrap">
                  exceptional digital experiences. Need a professional
                </span>
                <br />
                <span className="text-[clamp(12px,1.7vw,17.5px)] font-normal text-[#332F2B] text-nowrap">
                  website, custom software, or an innovative solution?
                </span>
                <br />
                <span className="text-[clamp(12px,1.7vw,17.5px)] font-normal text-[#332F2B] text-nowrap">
                  Let&apos;s chat!
                </span>
              </motion.p>

              <motion.p
                className="text-[clamp(11px,2vw,17.5px)] text-[#332F2B] text-center w-[clamp(228px,40vw,470px)] block md:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                I&apos;m a full-stack web developer and <br />
                founder of Abril Codes. I turn ideas into exceptional digital
                experiences. Need a professional website, custom software, or an
                innovative solution?
                <br /> Let&apos;s chat!
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
                Contact Me
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
                    <div className="w-full h-full absolute top-[2%] left-[-3%] flex items-center justify-center">
                      <img src={DavidBottom.src} alt="David Bottom" />
                    </div>
                  </div>
                  <div className="w-[131.5%] h-[131.5%] absolute top-[-38.5%] left-[-11.4%] flex items-center justify-center">
                    <img src={DavidTop.src} alt="David Top" />
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
              Contact Me
            </motion.button>
          </div>
        </div>
        <div className={styles.headerShape}></div>
      </main>
    </>
  );
}
