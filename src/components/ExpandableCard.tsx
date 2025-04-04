/* eslint-disable @next/next/no-img-element */
"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import CheckWhite from "../images/check-white.svg";

const ExpandContext = createContext<{
  expandedCardId: string | null;
  setExpandedCardId: (id: string | null) => void;
}>({
  expandedCardId: null,
  setExpandedCardId: () => {},
});

export function ExpandProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);

  const contextValue = useMemo(() => {
    return { expandedCardId, setExpandedCardId };
  }, [expandedCardId]);

  return (
    <ExpandContext.Provider value={contextValue}>
      {children}
    </ExpandContext.Provider>
  );
}

export type ExpandDirection = "left-to-right" | "center" | "right-to-left";

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  subtitle?: string;
  bottomRightDescription?: string;
  direction: ExpandDirection;
  iconSrc: string | undefined;
  iconAlt: string;
  items?: { title: string; description: string }[];
}

interface ExpandableCardProps {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  subtitle?: string;
  bottomRightDescription?: string;
  direction: ExpandDirection;
  iconSrc: string | undefined;
  iconAlt: string;
  items?: { title: string; description: string }[];
}

interface ServicesCardContainerProps {
  services: ServiceItem[];
  sectionRef?: React.RefObject<HTMLElement>;
}

// Nuevo componente contenedor para manejar el array de servicios
export function ServicesCardContainer({
  services,
  sectionRef,
}: Readonly<ServicesCardContainerProps>) {
  const { expandedCardId, setExpandedCardId } = useContext(ExpandContext);
  const isAnyCardExpanded = expandedCardId !== null;

  // Add this function to handle expansion with scroll
  const handleExpandCard = (id: string) => {
    setExpandedCardId(id);

    // Scroll to the top of the services section with smooth behavior
    if (sectionRef?.current) {
      setTimeout(() => {
        window.scrollTo({
          top: sectionRef.current?.offsetTop || 0,
          behavior: "smooth",
        });
      }, 100); // Small delay to ensure state is updated before scrolling
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-between gap-6 w-full max-w-[1100px] relative">
      {/* Esta es la capa para tarjetas expandidas, siempre en la misma posición */}
      {isAnyCardExpanded && (
        <div className="absolute top-0 left-0 w-full z-20  flex items-center justify-center">
          {services.map((service) => (
            <ExpandedCardContent
              key={service.id}
              service={service}
              isExpanded={service.id === expandedCardId}
              onClose={() => setExpandedCardId(null)}
            />
          ))}
        </div>
      )}

      {/* Estas son las tarjetas visibles normalmente */}
      {services.map((service) => (
        <CollapsedCard
          key={service.id}
          {...service}
          isExpanded={service.id === expandedCardId}
          isAnyCardExpanded={isAnyCardExpanded}
          onExpand={handleExpandCard}
        />
      ))}
    </div>
  );
}

// Componente para la tarjeta en estado normal (colapsado)
function CollapsedCard({
  id,
  title,
  description,
  iconSrc,
  iconAlt,
  isAnyCardExpanded,
  onExpand
}: Readonly<{
  id: string;
  title: string;
  description: string;
  iconSrc: string | undefined;
  iconAlt: string;
  isExpanded: boolean;
  isAnyCardExpanded: boolean;
  onExpand: (id: string) => void;
}>) {

  const [cardHeight, setCardHeight] = useState<string>("450px");

  useEffect(() => {
    const updateHeight = () => {
      setCardHeight(window.innerWidth >= 768 ? "clamp(300px, 44vw, 450px)" : "450px");
    };

    // Set initial height
    updateHeight();

    // Add resize listener
    window.addEventListener("resize", updateHeight);

    // Cleanup
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  return (
    <motion.div
      className={`w-full max-w-[322px] md:max-w-[417px] mx-auto bg-[#6A6AD00F] border-[#6969EC78] border-[2px] rounded-[25px] transition-all`}
      style={{height: (isAnyCardExpanded && window.innerWidth < 768) ? 230 : cardHeight,}}
      animate={{
      opacity: isAnyCardExpanded ? 0 : 1,
      }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col items-center justify-center gap-3 mt-4 h-full">
      <div className="w-[clamp(75px,9.4vw,109px)] h-[clamp(75px,9.4vw,109px)] bg-[#06067E] rounded-full flex items-center justify-center p-[20px]">
        <img
        src={iconSrc}
        alt={iconAlt}
        className="w-full h-full object-contain"
        />
      </div>
      <h3 className="text-[20px] md:text-[clamp(16px,2.3vw,24px)] text-[#F8F8F8] font-normal text-center">
        {title}
      </h3>
      <p className="text-[14px] md:text-[clamp(10px,1.2vw,14px)] font-light text-[#ffffffbb] w-[80%] text-center leading-[21px] md:leading-[18px] mt-2 md:mt-4">
        {description}
      </p>
      <button
        onClick={() => onExpand(id)}
        className="w-[155px] md:w-[clamp(100px,13.28vw,155px)] h-[40px] md:h-[clamp(25px,3.42vw,40px)] bg-[#06067E] rounded-full flex items-center justify-center mt-[24px] md:mt-[clamp(12px,2vw,24px)] text-white text-[14px] md:text-[clamp(10px,1.2vw,14px)]"
      >
        Learn more
      </button>
      </div>
    </motion.div>
  );
}

// Componente para el contenido expandido
function ExpandedCardContent({
  service,
  isExpanded,
  onClose
}: Readonly<{
  service: ServiceItem;
  isExpanded: boolean;
  onClose: () => void;
}>) {
  const { setExpandedCardId } = useContext(ExpandContext);
  if (!isExpanded) return null;

  const {
    title,
    fullDescription,
    subtitle,
    bottomRightDescription,
    items = [],
    direction,
  } = service;

  const getExpandedStyles = () => {
    switch (direction) {
      case "left-to-right":
        return { left: 0, transformOrigin: "left center" };
      case "center":
        return {
          transformOrigin: "center center",
        };
      case "right-to-left":
        return {
          right: 0,
          left: "auto",
          transformOrigin: "right center",
        };
      default:
        return {};
    }
  };

  return (
    <AnimatePresence>
      {isExpanded && (
        <>
          {/* Versión móvil */}
          <motion.div
            className="w-full max-w-[470px] md:w-[300%] h-auto bg-[#6A6AD00F] backdrop-blur-[5px] border-[#6969EC78] border-[2px] rounded-[25px] px-6 py-8 z-20 text-[#EEEEEE] shadow-lg md:hidden"
            style={getExpandedStyles()}
            initial={{
              opacity: 0,
              scale: 0,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              scale: 0,
            }}
            transition={{ duration: 0.3 }}
          >
            <button
              className="absolute top-4 right-4 text-white hover:text-gray-200 text-xl focus:outline-none"
              onClick={onClose}
            >
              ✕
            </button>
            <div className="flex flex-col md:flex-row gap-6">
              {/* Columna izquierda */}
              <div className="flex-1 flex flex-col gap-4">
                <h3 className="text-[clamp(19px,6vw,30px)] text-[#EEEEEE] font-semibold mb-4">
                  {title}
                </h3>
                <p className="text-[clamp(12px,4vw,20px)] font-light text-[#EEEEEE] leading-6 mb-4">
                  {fullDescription}
                </p>
                {items.map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <img src={CheckWhite.src} alt="CheckWhite" />
                    <div>
                      <h4 className="text-[clamp(12px,3.2vw,16px)] text-[#EEEEEE] font-medium">
                        {item.title}
                      </h4>
                      <p className="text-[clamp(11px,3vw,15px)] text-[#EEEEEE] font-light">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Columna derecha */}
              <div className="flex-1 flex flex-col gap-4">
                <p className="text-[clamp(12px,4vw,20px)] font-light text-[#EEEEEE] mt-4 leading-6">
                  {bottomRightDescription}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Versión desktop */}
          <motion.div
            className="bg-[#6A6AD00F] backdrop-blur-[5px] border-[#6969EC78] border-[2px] rounded-[clamp(15px,2vw,25px)] px-[69px] py-12 z-20 w-[300%] text-[#EEEEEE] shadow-lg h-[clamp(650px,125vw, 750px)] hidden md:flex"
            initial={{
              opacity: 0,
              scale: 0,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              scale: 0,
            }}
            transition={{ duration: 0.3 }}
          >
            <button
              className="absolute top-4 right-4 text-white hover:text-gray-200 text-xl focus:outline-none"
              onClick={() => setExpandedCardId(null)}
            >
              ✕
            </button>
            <div className="flex flex-col md:flex-row gap-10">
              {/* Columna izquierda */}
              <div className="flex-1 gap-4 flex flex-col">
                {/* Título y descripción completa */}
                <h3 className="text-[clamp(16px,2.5vw,24px)] text-[#EEEEEE] font-semibold mb-4">
                  {title}
                </h3>
                <p className="text-[clamp(12px,2vw,16px)] font-light text-[#EEEEEE] leading-6 mb-4 pr-11">
                  {fullDescription}
                </p>
                <h4 className="font-medium text-[clamp(14px,2vw,18px)] text-[#1391FF]">
                  {subtitle}
                </h4>
                {/* Primeros dos ítems */}
                {items.slice(0, 2).map((item, index) => (
                  <div
                    key={index}
                    className="mb-4 text-[clamp(12px,2vw,16px)] leading-6 flex gap-2"
                  >
                    <img src={CheckWhite.src} alt="CheckWhite" />
                    <h4 className="text-[#EEEEEE] font-medium">
                      {item.title}
                      {": "}
                      <span className="font-light">{item.description}</span>
                    </h4>
                  </div>
                ))}
              </div>

              {/* Columna derecha */}
              <div className="flex-1 mt-20 leading-6">
                {/* Últimos dos ítems */}
                {items.slice(2).map((item, index) => (
                  <div
                    key={index}
                    className="mb-4 text-[clamp(12px,2vw,16px)] flex gap-2"
                  >
                    <img src={CheckWhite.src} alt="CheckWhite" />
                    <h4 className="text-[#EEEEEE] font-medium">
                      {item.title}
                      {": "}
                      <span className="font-light">{item.description}</span>
                    </h4>
                  </div>
                ))}

                {/* Descripción inferior derecha */}
                <p className="text-[clamp(12px,2vw,16px)] font-light text-[#EEEEEE] mt-4 leading-6">
                  {bottomRightDescription}
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Componente original simplificado
export default function ExpandableCard(props: Readonly<ExpandableCardProps>) {
  return (
    <div className="relative">
      <CollapsedCard
        id={props.id}
        title={props.title}
        description={props.description}
        iconSrc={props.iconSrc}
        iconAlt={props.iconAlt}
        isExpanded={false}
        isAnyCardExpanded={false} onExpand={function (): void {
          throw new Error("Function not implemented.");
        } }      />
    </div>
  );
}
