"use client";
import { useRef, useState, useEffect } from "react";
import styles from "./services.module.css";
import DesignIcon from "../../images/Web.png";
import DevelopmentIcon from "../../images/Code.png";
import SupportIcon from "../../images/Manteinence.png";
import {
  ExpandProvider,
  ServicesCardContainer,
  ServiceItem,
} from "../ExpandableCard";

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null!);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Handle mouse movement for parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const { left, top, width, height } =
          sectionRef.current.getBoundingClientRect();
        const x = (e.clientX - left) / width - 0.5;
        const y = (e.clientY - top) / height - 0.5;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Array con todos los datos de los servicios
  const servicesData: ServiceItem[] = [
    {
      id: "desing",
      title: "Custom Design",
      description:
        "We create unique, tailored designs that reflect your brand identity and engage your audience effectively across all devices.",
      fullDescription:
        "Every business or project has a unique identity, and your website should reflect it. We don't use generic templates - instead, we create an exclusive design based on your brand image, values, and specific needs.",
      bottomRightDescription:
        "A personalized design approach ensures your digital presence stands out from competitors, creating memorable experiences that resonate with your target audience and reinforce your brand's unique positioning.",
      direction: "left-to-right",
      iconSrc: DesignIcon.src,
      iconAlt: "Design Icon",
      items: [
        {
          title: "Unique visual identity",
          description: "We adapt every web element to your style and message.",
        },
        {
          title: "Optimized user experience",
          description:
            "We design with intuitive and engaging navigation in mind.",
        },
        {
          title: "Market differentiation",
          description:
            "A custom design helps you stand out from the competition.",
        },
        {
          title: "Responsive adaptability",
          description:
            "Your website adjusts to different devices without losing quality or functionality.",
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
        "We provide ongoing technical support and regular updates to ensure your website remains secure, fast, and aligned with your evolving business needs.",
      fullDescription:
        "Our relationship doesn't end at launch. We provide ongoing maintenance to keep your website secure, up-to-date, and performing optimally. This includes technical support, regular updates, security monitoring, and performance optimization. As your business grows, we scale your website with new features to match your evolving needs.",
      subtitle: "How does this benefit your business?",
      bottomRightDescription:
        "With our support services, you can focus on your core business while we handle the technical aspects of your digital presence. Our proactive approach helps prevent issues before they impact your users, ensuring consistent performance and availability.",
      direction: "right-to-left",
      iconSrc: SupportIcon.src,
      iconAlt: "Support Icon",
      items: [
        {
          title: "Continuous monitoring",
          description:
            "Regular checks to prevent issues before they affect users.",
        },
        {
          title: "Security updates",
          description:
            "Timely patches and updates to keep your site protected against new threats.",
        },
        {
          title: "Performance optimization",
          description:
            "Ongoing improvements to maintain speed and responsiveness.",
        },
        {
          title: "Growth support",
          description:
            "Technical assistance as your business scales and evolves.",
        },
      ],
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="max-w-[100vw] overflow-hidden relative pt-[clamp(50px,5vw,80px)]"
    >
      <div className="flex flex-col items-center justify-center pb-[clamp(20px,10vw,200px)] px-4 gap-14">
        <h2 className="text-[30px] font-semibold text-[#fff]">My Services</h2>
        <ExpandProvider>
          <ServicesCardContainer
            services={servicesData}
            sectionRef={sectionRef}
            mousePosition={mousePosition}
          />
        </ExpandProvider>
      </div>
      <div
        className={`${styles.headerShapeInset}`}
        style={{ height: "calc(100% + clamp(300px, 40vw, 400px))" }}
      ></div>
    </section>
  );
}
