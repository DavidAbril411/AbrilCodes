export interface Project {
  id: string;
  title: string;
  description?: string;
  images?: string[]; // Array of image paths from /public or absolute URLs
  url?: string;
  tech?: string[];
}

// Add projects here as they are completed.
// Example:
// {
//   id: "my-project",
//   title: "My Project",
//   description: "Brief description of what it does.",
//   images: ["/projects/my-project-1.png", "/projects/my-project-2.png"],
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
    // images: ["/projects/orion-1.png", "/projects/orion-2.png"],
  },
];
