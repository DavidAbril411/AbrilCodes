import orion01 from "@/images/OrionLogistics/orion-01.png";
import orion02 from "@/images/OrionLogistics/orion-02.png";
import orion03 from "@/images/OrionLogistics/orion-03.png";
import orion04 from "@/images/OrionLogistics/orion-04.png";
import orion05 from "@/images/OrionLogistics/orion-05.png";
import orion06 from "@/images/OrionLogistics/orion-06.png";
import orion07 from "@/images/OrionLogistics/orion-07.png";
import orion08 from "@/images/OrionLogistics/orion-08.png";
import orion09 from "@/images/OrionLogistics/orion-09.png";
import orion10 from "@/images/OrionLogistics/orion-10.png";
import orion11 from "@/images/OrionLogistics/orion-11.png";
import orion12 from "@/images/OrionLogistics/orion-12.png";
import orionLogo from "@/images/OrionLogistics/orion-logo.png";
import cappy01 from "@/images/Cappy/cappy-01.webp";
import cappy02 from "@/images/Cappy/cappy-02.webp";
import cappy03 from "@/images/Cappy/cappy-03.webp";
import cappy04 from "@/images/Cappy/cappy-04.webp";

/**
 * Project metadata only. Every string the visitor reads (title, description,
 * longDescription) lives in src/messages/{en,es}.json under `Projects.items.<id>`.
 */
export interface Project {
  id: string;
  logo?: string;
  images?: string[];
  url?: string;
  tech?: string[];
}

export const projects: Project[] = [
  {
    id: "orion-logistics",
    logo: orionLogo.src,
    url: "https://calei.com.ar",
    tech: [
      "C++20",
      "Vroom",
      "NestJS",
      "MySQL",
      "TypeORM",
      "Docker",
      "Nginx",
      "Kotlin",
      "Coroutines",
      "Flow",
      "MVVM",
      "Hilt",
      "Room",
      "MapLibre",
      "Next.js",
      "OSRM",
    ],
    images: [
      orion01.src,
      orion02.src,
      orion03.src,
      orion04.src,
      orion05.src,
      orion06.src,
      orion07.src,
      orion08.src,
      orion09.src,
      orion10.src,
      orion11.src,
      orion12.src,
    ],
  },
  {
    id: "cappy",
    tech: [
      "React Native",
      "Expo SDK 52",
      "Expo Router",
      "Zustand",
      "NativeWind",
      "Mapbox",
      "Node.js",
      "Express",
      "PostgreSQL",
      "PostGIS",
      "Drizzle ORM",
      "Clerk",
      "MercadoPago",
      "Cloudinary",
      "Docker",
    ],
    images: [
      cappy01.src,
      cappy02.src,
      cappy03.src,
      cappy04.src,
    ],
  },
  {
    id: "nightdesk",
    tech: [
      "Python 3.11",
      "Pydantic v2",
      "Event Bus",
      "DAG Scheduler",
      "FSM",
      "SQLite FTS5",
      "Watchdog",
      "Circuit Breaker",
    ],
  },
  {
    id: "pos",
    tech: [
      "Java 21",
      "Spring Boot 3.2",
      "Spring Data JPA",
      "Spring Security",
      "JWT",
      "MySQL",
      "OpenAPI",
      "Next.js",
      "Material UI",
      "TypeScript",
      "GCP",
      "Azure",
    ],
  },
  {
    id: "hipolito",
    tech: [
      "Transformers.js",
      "WebAssembly",
      "TensorFlow.js",
      "RenPyWeb",
      "HTML5 Canvas",
      "Node.js",
      "Express",
      "Caddy",
    ],
  },
  {
    id: "simpleloc",
    tech: [
      "Swift",
      "SwiftUI",
      "CoreLocation",
      "GPX",
      "iOS SDK",
      "Kotlin",
      "Android",
    ],
  },
  {
    id: "miscuentas",
    tech: [
      "Python 3.11",
      "Flask",
      "SQLAlchemy 2",
      "SQLite WAL",
      "Triggers",
      "pytest",
    ],
  },
  {
    id: "web-epica",
    tech: [
      "Astro",
      "React 19",
      "Three.js",
      "React Three Fiber",
      "GSAP",
      "Framer Motion",
      "Tailwind CSS v4",
    ],
  },
];
