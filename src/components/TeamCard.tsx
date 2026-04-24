"use client";
import Linkedin from "@/images/linkedin.svg";
import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { useTranslations } from "next-intl";
import { FaGithub } from "react-icons/fa";
import Image from "next/image";

interface TeamCardProps {
  imageSrc: string | undefined;
  name: string;
  role: string;
  linkedinLink?: string;
  githubLink?: string;
  mousePosition?: { x: number; y: number };
  moveFactor?: number; // -1, 0, or 1 to determine movement direction
}

const TeamCard: React.FC<TeamCardProps> = ({
  imageSrc,
  name,
  role,
  linkedinLink,
  githubLink,
  mousePosition = { x: 0, y: 0 },
  moveFactor = 0,
}) => {
  const [isOpen] = useState(false);
  const t = useTranslations("TeamCard");

  const expandingContentVariants: Variants = {
    closed: {
      y: "0%",
      transition: {
        duration: 0.3,
        ease: "easeInOut" as const,
      },
      boxShadow: "none",
    },
    open: {
      y: "87%",
      transition: {
        duration: 0.3,
        ease: "easeInOut" as const,
      },
      boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.15)",
    },
  };

  const containerVariants: Variants = {
    closed: {
      height: "clamp(300px, 40vw, 420px)",
      transition: {
        duration: 0.3,
        ease: "easeInOut" as const,
      },
    },
    open: {
      height: "clamp(400px, 65vw, 700px)",
      transition: {
        duration: 0.3,
        ease: "easeInOut" as const,
      },
    },
  };

  // Calculate movement amount based on mouse position and moveFactor
  const xMovement = mousePosition.x * 10 * moveFactor;
  const yMovement = mousePosition.y * 10;

  // Derive initials for the fallback avatar
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <motion.div
      className="team-card-wrapper"
      variants={containerVariants}
      animate={isOpen ? "open" : "closed"}
      whileHover={{
        filter: "drop-shadow(0 0 18px rgba(8,8,157,0.55))",
        transition: { duration: 0.25 },
      }}
      style={{
        transform: `translate(${xMovement}px, ${yMovement}px)`,
        transition: "transform 0.5s ease-out",
      }}
    >
      <div className="relative">
        <div
          className="w-[clamp(200px,30.2vw,322px)] h-[clamp(300px,41vw,418px)] rounded-tr-[clamp(20px,5vw,54px)] rounded-bl-[clamp(20px,5vw,54px)] relative bg-[#E0E0E0]"
          style={{
            boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.25)",
            zIndex: 30,
          }}
        >
          <div className="flex flex-col items-start p-[clamp(10px,2vw,22px)]">
            {/* Avatar area */}
            <div
              className="w-full h-[clamp(170px,24vw,257px)] rounded-tr-[clamp(20px,2.87vw,31px)] rounded-bl-[clamp(20px,2.87vw,31px)] flex items-center justify-center overflow-hidden relative"
              style={{
                background: "linear-gradient(180deg, #08089D 0%, #030337 100%)",
              }}
            >
              {imageSrc ? (
                <Image
                  src={imageSrc}
                  alt={name}
                  width={400}
                  height={500}
                  className="transform translate-y-[15%]"
                  style={{ width: "100%", height: "auto" }}
                  sizes="(max-width: 768px) 50vw, 300px"
                />
              ) : (
                <span
                  className="text-white font-bold select-none"
                  style={{ fontSize: "clamp(36px, 6vw, 72px)" }}
                >
                  {initials}
                </span>
              )}
              {/* Shimmer overlay on hover */}
              <div className="team-card-shimmer" />
            </div>
            <h3 className="text-[clamp(14px,1.5vw,18px)] font-semibold mt-4 text-[#332F2B]">
              {name}
            </h3>
            <p className="text-[clamp(9px,1.2vw,12px)] text-gray-600">{role}</p>
            <div className="flex space-x-2 mt-2">
              {githubLink && (
                <motion.a
                  href={githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-[clamp(30px,3.7vw,40px)] h-[clamp(30px,3.7vw,40px)] bg-[#08089D] rounded-full text-white flex items-center justify-center"
                  whileHover={{ scale: 1.15, backgroundColor: "#0A0AE4" }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaGithub size={18} />
                </motion.a>
              )}
              {linkedinLink && (
                <motion.a
                  href={linkedinLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-[clamp(30px,3.7vw,40px)] h-[clamp(30px,3.7vw,40px)] bg-[#08089D] rounded-full text-white flex items-center justify-center"
                  whileHover={{ scale: 1.15, backgroundColor: "#0A0AE4" }}
                  whileTap={{ scale: 0.9 }}
                >
                  <img src={Linkedin.src} alt="LinkedIn" />
                </motion.a>
              )}
            </div>
          </div>
        </div>
        <motion.div
          className="absolute bottom-0 left-0 w-full text-center pb-[clamp(20px,4vw,40px)] pt-[clamp(28px,6vw,56px)] rounded-br-[clamp(20px,3vw,54px)] rounded-bl-[clamp(20px,3vw,54px)]"
          style={{
            backgroundColor: "#E9E9E9F5",
            color: "#332F2B",
            zIndex: 20,
          }}
          variants={expandingContentVariants}
          animate={isOpen ? "open" : "closed"}
        >
          <p className="text-[clamp(7px,1.2vw,14px)] font-normal px-[clamp(20px,6vw,40px)] text-justify">
            {t("about")}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TeamCard;
