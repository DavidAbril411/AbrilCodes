"use client";

import { useState, useEffect } from "react";
import BackgroundShape from "../../images/background-shape.svg";
import DavidTop from "../../images/david-top.png";
import DavidBottom from "../../images/david-bottom.png";
import styles from "./Hero.module.css";

export default function Hero() {
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

  return (
    <main className="md:h-[calc(100vh-110px)] w-full relative flex items-center justify-center ">
      <img
        src={BackgroundShape.src}
        alt="background-shape"
        className="absolute left-[-40%] top-[20%] -z-1 w-[95vw] block md:hidden"
      />
      <img
        src={BackgroundShape.src}
        alt="background-shape"
        className="absolute left-[-200px] -z-1 hidden md:block"
      />
      <div className="w-full max-w-[1280px] h-full flex">
        <div className="flex flex-col md:flex-row items-center justify-between w-full pl-10 pr-10 pt-20 md:pt-0">
          <div className="space-y-6 text-center md:text-left">
            <h1 className="leading-none">
              <span className="block font-light text-[#000] text-[clamp(40px,8vw,80px)]">
                Hello
              </span>
              <span className="block font-normal text-[#0A0AE4] text-[clamp(40px,8vw,80px)]">
                I&apos;m David
              </span>
              <span className="block font-semibold text-[#08089D] text-[clamp(40px,8vw,80px)]">
                Abril Perrig
              </span>
            </h1>
            <p className="leading-5 pt-[clamp(0px,1vw,12px)] hidden md:block">
              <span className="text-[clamp(12px,1.7vw,17.5px)] font-normal text-[#332F2B] flex-nowrap text-nowrap ">
                I’m a full-stack web developer
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
                Let’s chat!
              </span>
            </p>
            <p className="text-[clamp(11px,2vw,17.5px)] text-[#332F2B] text-center w-[clamp(228px,40vw,470px)] block md:hidden">
              I’m a full-stack web developer and <br />
              founder of Abril Codes. I turn ideas into exceptional digital
              experiences. Need a professional website, custom software, or an
              innovative solution?
              <br /> Let’s chat!
            </p>
            <button className="w-[clamp(111px,17vw,188px)] h-[clamp(30px,4vw,43px)] bg-gradient-to-r from-[#08089D] to-[#030337] text-white rounded-full text-[clamp(10px,1.5vw,18px)] hidden md:block">
              Contact Me
            </button>
          </div>
          <div className="relative pt-10 md:pt-0">
            <div
              className={`w-[clamp(230px,45vw,470px)] h-[clamp(230px,45vw,470px)] rounded-full relative transform translate-y-4 ${
                !imagesLoaded ? styles.spinLeft : ""
              }`}
              style={{
                boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.25)",
              }}
            >
              <div className="w-full h-full bg-gradient-to-b from-[#08089D] to-[#030337] rounded-full absolute overflow-hidden">
                {!imagesLoaded && (
                  <div className={`${styles.spinnerContainer}`}>
                    <div className={`${styles.spinner}`}></div>
                  </div>
                )}
                {imagesLoaded && (
                  <div className="w-full h-full absolute top-[2%] left-[-3%] flex items-center justify-center">
                    <img src={DavidBottom.src} alt="David Bottom" />
                  </div>
                )}
              </div>
              {imagesLoaded && (
                <div className="w-[131.5%] h-[131.5%] absolute top-[-38.5%] left-[-11.4%] flex items-center justify-center">
                  <img src={DavidTop.src} alt="David Top" />
                </div>
              )}
            </div>
          </div>
          <button className="w-[clamp(111px,17vw,188px)] h-[clamp(30px,4vw,43px)] bg-gradient-to-r from-[#08089D] to-[#030337] text-white rounded-full text-[clamp(10px,1.5vw,18px)] block md:hidden translate-y-4 mt-5">
            Contact Me
          </button>
        </div>
      </div>
      <div className={styles.headerShape}></div>
    </main>
  );
}
