"use client";
import { ReactNode, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Pagination,
  Navigation,
  Autoplay,
  EffectCoverflow,
} from "swiper/modules";

// Importar estilos de Swiper
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import styles from "./Carousel.module.css";

interface CarouselComponentProps {
  readonly children: ReactNode[];
}

export default function CarouselComponent({
  children,
}: Readonly<CarouselComponentProps>) {
  const [slidesPerView, setSlidesPerView] = useState(1.5);

  // Ajustar slidesPerView basado en el ancho de la pantalla
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 480) {
        setSlidesPerView(1.25); // Aumentado desde 1.1 para mostrar más slides laterales
      } else if (window.innerWidth < 768) {
        setSlidesPerView(1.35); // Aumentado desde 1.2
      } else if (window.innerWidth < 1024) {
        setSlidesPerView(1.45); // Aumentado desde 1.3
      } else {
        setSlidesPerView(1.55); // Aumentado desde 1.4
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={styles.carouselWrapper}>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={slidesPerView}
        spaceBetween={-150} // Valor negativo para acercar los slides
        loop={true}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 80, // Reducido de 100 a 80
          modifier: 1.6, // Reducido de 2 a 1.6
          slideShadows: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
        className={styles.swiper}
      >
        {Array.isArray(children) ? (
          children.map((slide, index) => (
            <SwiperSlide key={index} className={styles.swiperSlide}>
              {slide}
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide className={styles.swiperSlide}>{children}</SwiperSlide>
        )}
      </Swiper>
    </div>
  );
}
