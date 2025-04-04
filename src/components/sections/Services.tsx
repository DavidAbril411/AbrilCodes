"use client";
import { useRef } from "react";
import styles from "./sections.module.css";
import DesignIcon from "../../images/Web.png";
import DevelopmentIcon from "../../images/Code.png";
import SupportIcon from "../../images/Manteinence.png";
import { ExpandProvider, ServicesCardContainer, ServiceItem } from "../ExpandableCard";

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null!);

  // Array con todos los datos de los servicios
  const servicesData: ServiceItem[] = [
    {
      id: "desing",
      title: "Diseño Personalizado",
      description:
        "We build responsive websites with clean, efficient code that works flawlessly across all devices.",
      fullDescription:
        "Cada negocio o proyecto tiene una identidad única, y tu sitio web debe reflejarla. No utilizamos plantillas genéricas, sino que creamos un diseño exclusivo basado en tu imagen de marca, valores y necesidades específicas.",
      bottomRightDescription:
        "A professional development approach ensures your website operates efficiently and without limitations, adapting to your business's present and future needs.",
      direction: "left-to-right",
      iconSrc: DesignIcon.src,
      iconAlt: "Design Icon",
      items: [
        {
          title: "Identidad visual única",
          description: "Adaptamos cada elemento de la web a tu estilo y mensaje.",
        },
        {
          title: "Experiencia de usuario optimizada",
          description:
            "Diseñamos pensando en la navegación intuitiva y atractiva.",
        },
        {
          title: "Diferenciación del mercado",
          description: "Un diseño a medida te hace destacar entre la competencia.",
        },
        {
          title: "Adaptabilidad",
          description: "La web se ajusta a distintos dispositivos sin perder calidad ni funcionalidad.",
        },
      ],
    },
    {
      id: "development",
      title: "Web Development",
      description:
        "We build responsive websites with clean, efficient code that works flawlessly across all devices.",
      fullDescription:
        "We don't just design we build websites using modern technology, prioritizing speed, security, and scalability. We use tools such as Next.js, Node.js, and Docker to deliver superior performance.",
      subtitle: "What does this mean for your business?",
      bottomRightDescription:
        "A professional development approach ensures your website operates efficiently and without limitations, adapting to your business's present and future needs.",
      direction: "center",
      iconSrc: DevelopmentIcon.src,
      iconAlt: "Development Icon",
      items: [
        {
          title: "Faster speed",
          description: "Websites up to 4 times faster than traditional ones.",
        },
        {
          title: "Advanced security",
          description:
            "Protection against common vulnerabilities in outdated systems.",
        },
        {
          title: "Scalability",
          description: "Handles high traffic without compromising performance.",
        },
        {
          title: "Total flexibility",
          description: "No reliance on third-party templates or plugins.",
        },
      ],
    },
    {
      id: "support",
      title: "Support & Maintenance",
      description:
        "We provide ongoing technical support and regular updates to keep your website secure and performing at its best. Our team is always available to help with any issues.",
      fullDescription:
        "Our relationship doesn't end at launch. We offer comprehensive maintenance plans to ensure your website remains secure, up-to-date, and functioning optimally. Our support team provides quick responses to technical issues, regular software updates, security monitoring, and performance optimization. We also offer content management assistance, SEO monitoring, and regular analytics reports to help you understand user behavior and improve your site's effectiveness. As your business grows, we're ready to scale your website with new features and improvements to match your evolving needs.",
      direction: "right-to-left",
      iconSrc: SupportIcon.src,
      iconAlt: "Support Icon",
    },
  ];

  return (
    <section ref={sectionRef} className="max-w-[100vw] overflow-hidden relative pt-[clamp(50px,5vw,80px)]">
      <div className="flex flex-col items-center justify-center pb-[clamp(20px,10vw,200px)] px-4 gap-14">
        <h2 className="text-[30px] font-semibold text-[#fff]">
          My Services
        </h2>
        <ExpandProvider>
          <ServicesCardContainer services={servicesData} sectionRef={sectionRef} />
        </ExpandProvider>
      </div>
      <div
        className={`${styles.headerShapeInset}`}
        style={{ height: "calc(100% + clamp(300px, 40vw, 400px))" }}
      ></div>
    </section>
  );
}