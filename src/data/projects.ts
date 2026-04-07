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

export interface Project {
  id: string;
  title: string;
  description?: string;
  images?: string[]; // Array of image paths — supports internal gallery
  url?: string;
  tech?: string[];
}

// Add projects here as they are completed.
// Example:
// {
//   id: "my-project",
//   title: "My Project",
//   description: "Brief description.",
//   images: ["/projects/screenshot-1.png"],
//   url: "https://myproject.com",
//   tech: ["Next.js", "Node.js"],
// }
export const projects: Project[] = [
  {
    id: "orion-logistics",
    title: "OrionLogistics",
    description:
      "Plataforma completa de gestión logística: app Android nativa (Kotlin/MVVM/Hilt), backend NestJS en VPS propio con MySQL, optimización de rutas con OSRM y panel web Next.js.",
    url: "https://calei.com.ar",
    tech: [
      "NestJS",
      "MySQL",
      "TypeORM",
      "Docker",
      "Nginx",
      "Kotlin",
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
];
