/* eslint-disable @next/next/no-img-element */
"use client";
import CarouselComponent from "@/components/Carousel/Carousel";

import Viajeando from "../../images/viajeando.png";
import { useTranslations } from "next-intl";

export default function Projects() {
  const t = useTranslations("Projects");
  return (
    <section className="w-full flex flex-col items-center justify-center mt-20">
      <h2 className="text-[clamp(30px,4vw,50px)] text-[#000] font-normal">
        {t("title")}
      </h2>
      <div className="w-full max-w-[100vw] px-4 lg:max-w-[1100px] h-full flex items-center justify-center mt-6">
        <CarouselComponent>
          {/* Primer proyecto (placeholder) */}
          <div className="h-full w-full rounded-[25px] overflow-hidden relative bg-gray-200"></div>

          {/* Segundo proyecto (Viajeando) */}
          <div className="h-full w-full rounded-[25px] overflow-hidden relative bg-gray-200">
            <img
              src={Viajeando.src}
              alt="Viajeando.com"
              className="object-cover"
            />
            <span className="absolute bottom-0 w-full bg-[#06067E] h-[clamp(40px,6vw,65px)] text-white text-start text-[clamp(14px,1.5vw,20px)] flex items-center  px-4 font-semibold">
              {t("viajeando")}
            </span>
          </div>

          {/* Tercer proyecto (placeholder) */}
          <div className="h-full w-full rounded-[25px] overflow-hidden relative bg-gray-200"></div>

          {/* Cuarto proyecto (placeholder) */}
          <div className="h-full w-full rounded-[25px] overflow-hidden relative bg-gray-200"></div>
        </CarouselComponent>
      </div>
    </section>
  );
}
