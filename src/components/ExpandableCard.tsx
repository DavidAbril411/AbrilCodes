/* eslint-disable @next/next/no-img-element */
"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

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
  isExpanded,
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

  const [cardHeight, setCardHeight] = useState(450);

  useEffect(() => {
    const updateHeight = () => {
      setCardHeight(window.innerWidth >= 768 ? 417 : 450);
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
      className={`w-full max-w-[322px] ${
        isAnyCardExpanded ? "h-[230px]" : "h-[450px]"
      } md:max-w-[417px] md:${
        isAnyCardExpanded ? "h-[250px]" : "h-[417px]"
      } mx-auto bg-[#6A6AD00F] border-[#6969EC78] border-[2px] rounded-[25px] transition-all`}
      animate={{
        opacity: isAnyCardExpanded ? 0 : 1,
        scale: isAnyCardExpanded && !isExpanded ? 0.95 : 1,
        filter: isAnyCardExpanded && !isExpanded ? "blur(4px)" : "blur(0px)",
        height: isAnyCardExpanded ? 230 : cardHeight,
      }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col items-center justify-center gap-3 mt-4 h-full">
        <div className="w-[90px] h-[90px] md:w-[109px] md:h-[109px] bg-[#06067E] rounded-full flex items-center justify-center p-[20px]">
          <img
            src={iconSrc}
            alt={iconAlt}
            className="w-full h-full object-contain"
          />
        </div>
        <h3 className="text-[20px] md:text-[24px] text-[#F8F8F8] font-normal text-center">
          {title}
        </h3>
        <p className="text-[14px] md:text-[13.5px] font-light text-[#ffffffbb] w-[80%] text-center leading-[21px] md:leading-[18px] mt-2 md:mt-4">
          {description}
        </p>
        <button
          onClick={() => onExpand(id)}
          className="w-[155px] h-[40px] bg-[#06067E] rounded-full flex items-center justify-center mt-[24px] text-white text-[14px]"
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
                    <svg
                      className="w-8 h-8 flex-shrink-0"
                      viewBox="0 0 33 43"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="33" height="43" fill="url(#pattern0)" />
                      <defs>
                        <pattern
                          id="pattern0"
                          patternContentUnits="objectBoundingBox"
                          width="1"
                          height="1"
                        >
                          <use
                            xlinkHref="#image0"
                            transform="matrix(0.01 0 0 0.00767442 0 0.116279)"
                          />
                        </pattern>
                        <image
                          id="image0"
                          width="100"
                          height="100"
                          preserveAspectRatio="none"
                          xlinkHref="data:image/png;base64,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"
                        />
                      </defs>
                    </svg>
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
            style={getExpandedStyles()}
            initial={{
              opacity: 0,
              scale: 0,
              x: direction === "center" ? "-50%" : 0,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              x: direction === "center" ? "-50%" : 0,
            }}
            exit={{
              opacity: 0,
              scale: 0,
              x: direction === "center" ? "-50%" : 0,
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
                    <svg
                      className="w-10 h-10 flex-shrink-0 -translate-y-1"
                      viewBox="0 0 33 43"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        width="33"
                        height="43"
                        fill="url(#pattern0_242_1339)"
                      />
                      <defs>
                        <pattern
                          id="pattern0_242_1339"
                          patternContentUnits="objectBoundingBox"
                          width="1"
                          height="1"
                        >
                          <use
                            xlinkHref="#image0_242_1339"
                            transform="matrix(0.01 0 0 0.00767442 0 0.116279)"
                          />
                        </pattern>
                        <image
                          id="image0_242_1339"
                          width="100"
                          height="100"
                          preserveAspectRatio="none"
                          xlinkHref="data:image/png;base64,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"
                        />
                      </defs>
                    </svg>
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
                    <svg
                      className="w-10 h-10 flex-shrink-0 -translate-y-1"
                      viewBox="0 0 33 43"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        width="33"
                        height="43"
                        fill="url(#pattern0_242_1339)"
                      />
                      <defs>
                        <pattern
                          id="pattern0_242_1339"
                          patternContentUnits="objectBoundingBox"
                          width="1"
                          height="1"
                        >
                          <use
                            xlinkHref="#image0_242_1339"
                            transform="matrix(0.01 0 0 0.00767442 0 0.116279)"
                          />
                        </pattern>
                        <image
                          id="image0_242_1339"
                          width="100"
                          height="100"
                          preserveAspectRatio="none"
                          xlinkHref="data:image/png;base64,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"
                        />
                      </defs>
                    </svg>
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
