"use client";
import Instagram from "@/images/instagram.svg";
import Linkedin from "@/images/linkedin.svg";
import { useState } from "react";
import { motion } from "framer-motion";

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
  moveFactor = 0
}) => {
  const [isOpen] = useState(false);

  // const toggleOpen = () => setIsOpen(!isOpen);

  const expandingContentVariants = {
    closed: {
      y: "0%",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
        boxShadow: "none",
      },
    },
    open: {
      y: "87%",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
      boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.15)",
    },
  };

  const containerVariants = {
    closed: {
      height: "clamp(300px, 40vw, 420px)",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    open: {
      height: "clamp(400px, 65vw, 700px)",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  // Calculate movement amount based on mouse position and moveFactor
  const xMovement = mousePosition.x * 10 * moveFactor;
  const yMovement = mousePosition.y * 10;

  return (
    <motion.div
      className=""
      variants={containerVariants}
      animate={isOpen ? "open" : "closed"}
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
            <div
              className="w-full h-[clamp(170px,24vw,257px)] rounded-tr-[clamp(20px,2.87vw,31px)] rounded-bl-[clamp(20px,2.87vw,31px)] flex items-center justify-center"
              style={{
                background: "linear-gradient(180deg, #08089D 0%, #030337 100%)",
              }}
            >
              <img
                src={imageSrc}
                alt={name}
                className="w-full transform -translate-y-[10.5%]"
              />
            </div>
            <h3 className="text-[clamp(14px,1.5vw,18px)] font-semibold mt-4 text-[#332F2B]">
              {name}
            </h3>
            <p className="text-[clamp(9px,1.2vw,12px)] text-gray-600">{role}</p>
            <div className="flex space-x-2 mt-2">
              {githubLink && (
                <button className="w-[clamp(30px,3.7vw,40px)] h-[clamp(30px,3.7vw,40px)] bg-[#08089D] rounded-full text-white flex items-center justify-center">
                  <a
                    href={githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={Instagram.src} alt="Instagram"/>
                  </a>
                </button>
              )}
              {linkedinLink && (
                <button className="w-[clamp(30px,3.7vw,40px)] h-[clamp(30px,3.7vw,40px)] bg-[#08089D] rounded-full text-white flex items-center justify-center">
                  <a
                    href={linkedinLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={Linkedin.src} alt="Linkedin"/>
                  </a>
                </button>
              )}
            </div>
          </div>
          {/* <button
            onClick={toggleOpen}
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-transparent text-white rounded-full p-2"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 20 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <rect width="20" height="26" fill="url(#pattern0_242_1493)" />
              <defs>
                <pattern
                  id="pattern0_242_1493"
                  patternContentUnits="objectBoundingBox"
                  width="1"
                  height="1"
                >
                  <use
                    xlinkHref="#image0_242_1493"
                    transform="matrix(0.01 0 0 0.00769231 0 0.115385)"
                  />
                </pattern>
                <image
                  id="image0_242_1493"
                  width="100"
                  height="100"
                  preserveAspectRatio="none"
                  xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAAXNSR0IArs4c6QAAA95JREFUeF7t3E1rE2EQB/B5nlZ8AavxKwgevAgqeBAUBLE3PfVrNE1jLl5y8WDJtr32UwhefDt4UEFR74L4HdqCPWjcNYsVaslmn83s7DOT/HPJITuTyf+XyRLIxhFuqhJwqqbBMAQQZW8CgABEWQLKxsGGAERZAsrGwYYARFkCysbBhgBEWQLKxsGGAERZAsrGwYYARFkCysbBhgBEWQLKxsGGAERZAsrGwYYARFkCysbBhgBEWQLKxsGGAERZAsrGCdqQLMuccy5TNruZcXZ2dk60Wq10ZWXld9nQE0GSJLlCRE+cc7eJyBPRqzRNH3a73a9ljfE40WAwuOy9T4joLhGlo/v33vteu93+VJRPIUiO4Zx7S0RnjxXveu+X2+32R4RenMD29vaNNE1fENH5Y0cdpGl6q9vtfhlXXQiyubn5nIiWC55yz3t/Dyjj0znEeElE5wrye9PpdO4Eg/T7fb+0tPSDiE5N2AKgjAknACOv+rW/v3+m3+8Pj7eYtCEHo/PH6ZKPJaAcCSgQI6/42el0TgZvSH7g6Bzy1Dn3IOA8AZTRiaICBjnnnq2trd2vBLKxsXFxcXHx85iT0rg+c41SBYOIdofD4fVer/e9Ekh+8NbW1tUsy14T0YWQTcmybHl9ff1DwLEzc8hgMLjmvc8zagW8qNI3bukXQ6AUx1w3Rv5MpSDYlPEgEhjBIED5H0UKoxIIUP6iSGJUBpl3FGmMqUDmFaUJjKlB5g2lKQwWyLygNInBBpl1lKYxagGZVZQYGLWBzBpKLIxaQWYFJSZG7SDWUWJjiIBYRdGAIQZiDUULhiiIFRRNGOIg2lG0YTQCohVFI0ZjINpQtGI0CqIFRTNG4yCxUbRjRAGJhWIBIxpI0yhWMKKCNIViCSM6iDSKNQwVIFIoFjHUgNSNYhVDFUhdKJYx1IFwUaxjqASZFiXLsl91/go9nyPGLejH1jEGq3jNxd7hjEXX9B19CaWXBMR4vf+eUy3IFJsSkqNqDLUfWUeTrXh9yiQU9RgmQGraFBMYZkCYKGYwTIFMiWIKwxxIRRRzGCZBAlFMYpgFyQef8Ocupv8cR/X3kLIvFkmSXHLOPSaim4fHvltYWHi0urr6raxW6+OmQbSGypkLIJz0BGoBIhAqpyVAOOkJ1AJEIFROS4Bw0hOoBYhAqJyWAOGkJ1ALEIFQOS0BwklPoBYgAqFyWgKEk55ALUAEQuW0BAgnPYFagAiEymkJEE56ArUAEQiV0xIgnPQEagEiECqnJUA46QnUAkQgVE5LgHDSE6gFiEConJYA4aQnUAsQgVA5LQHCSU+g9g9uyv+D2yV3aAAAAABJRU5ErkJggg=="
                />
              </defs>
            </svg>
          </button> */}
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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TeamCard;
