"use client";

import FondoLaptop from "@/images/fondo-laptop.jpg";

export default function About() {
  return (
    <section className="w-full h-[800px] relative flex items-center justify-center mt-10 transform translate-y-[7px] -z-10">
      <div
        className="absolute -top-[77px] h-[950px] left-0 -z-40 w-full md:w-[70%] "
        style={{
          background: "linear-gradient(90deg, #31315D99, #1A1A64)",
        }}
      ></div>
      <div
        className="absolute -top-[77px] h-[950px] left-[70%] -z-40 w-[30%] hidden md:block"
        style={{
          background: "#1A1A64",
        }}
      ></div>
      <div className="absolute -left-[9vw] -z-50 w-[90%] h-[120%]">
        <img
          src={FondoLaptop.src}
          alt=""
          className=" opacity-30 w-full h-full object-cover"
        />
      </div>
      <div className="w-full max-w-[1200px] h-full flex items-center justify-end">
        <div className="flex flex-col items-start px-6">
          <h2 className="text-[clamp(30px,3.3vw,40px)] font-semibold text-[#fff]">
            About <span className="text-[#8E8EFF]">Me</span>
          </h2>
          <p className="leading-tight pt-[clamp(0px,1vw,12px)] hidden md:block">
            <span className="text-[clamp(11px,1.7vw,20px)] font-extralight text-[#FFFFFF] flex-nowrap text-nowrap">
              I&apos;m David Abril, a professional developer with an 8.75/10 GPA
              in
            </span>
            <br />
            <span className="text-[clamp(11px,1.7vw,20px)] font-extralight text-[#FFFFFF] flex-nowrap text-nowrap">
              Computer Engineering. After 6 months at MindFactory, I ventured
            </span>
            <br />
            <span className="text-[clamp(11px,1.7vw,20px)] font-extralight text-[#FFFFFF] flex-nowrap text-nowrap">
              out to merge creativity and technology into unique projects.
            </span>
            <br />

            <span className="text-[clamp(11px,1.7vw,20px)] font-extralight text-[#FFFFFF] flex-nowrap text-nowrap">
              At Abril Codes, I collaborate with a talented team: Valentina
              Correa
            </span>
            <br />
            <span className="text-[clamp(11px,1.7vw,20px)] font-extralight text-[#FFFFFF] flex-nowrap text-nowrap">
              (graphic designer) and Francisco Ameri (software engineer and
            </span>
            <br />
            <span className="text-[clamp(11px,1.7vw,20px)] font-extralight text-[#FFFFFF] flex-nowrap text-nowrap">
              project manager), blending innovative design with robust code. We
            </span>
            <br />
            <span className="text-[clamp(11px,1.7vw,20px)] font-extralight text-[#FFFFFF] flex-nowrap text-nowrap">
              dream of revolutionizing the digital world while building a
              balanced
            </span>
            <br />
            <span className="text-[clamp(11px,1.7vw,20px)] font-extralight text-[#FFFFFF] flex-nowrap text-nowrap">
              life near the ocean.
            </span>
          </p>
          <p className="text-[9px] text-[#fff] text-center w-[clamp(228px,40vw,470px)] block md:hidden">
            I’m David Abril, a professional developer with an 8.75/10 GPA in
            Computer Engineering. After 6 months at MindFactory, I ventured out
            to merge creativity and technology into unique projects. At Abril
            Codes, I collaborate with a talented team: Valentina Correa (graphic
            designer) and Francisco Ameri (software engineer and project
            manager), blending innovative design with robust code. We dream of
            revolutionizing the digital world while building a balanced life
            near the ocean.
          </p>
        </div>
        {/* <div className="flex flex-col items-center justify-center px-6 w-[clamp(200px,35vw,368px)]">
                    <span
                        className="font-light text-[clamp(33px,3.9vw,48px)] text-center"
                        style={{
                            background:
                                "linear-gradient(251.76deg, #03033B 37.6%, #080898 87.25%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                        }}
                    >
                        My goal?
                    </span>
                    <span className="font-normal text-[clamp(12px,1.7vw,20px)] text-center text-[#6A6AD0B8]">
                        A franchised company in Singapore, where innovation and
                        quality are our trademarks.
                    </span>
                </div> */}
      </div>
    </section>
  );
}
