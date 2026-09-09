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

export interface Project {
  id: string;
  title: string;
  description?: string;
  longDescription?: string;
  logo?: string;
  images?: string[];
  url?: string;
  tech?: string[];
}

export const projects: Project[] = [
  {
    id: "orion-logistics",
    title: "OrionLogistics",
    description:
      "Ecosistema B2B de logística: app Android nativa offline-first (Kotlin/MVVM/Hilt), backend NestJS en VPS propio con MySQL, panel web Next.js y motor de ruteo propio en C++20 (Vroom + OSRM) que resuelve VRPTW en milisegundos.",
    longDescription:
      "¿Tus repartidores manejan rutas a ojo, pierden tiempo y no hay forma de saber qué se entregó realmente? OrionLogistics resuelve eso.\n\nUna app Android que cada repartidor lleva en el bolsillo y que:\n• Organiza y optimiza las rutas automáticamente\n• Registra cada entrega con fotos, firmas y notas como evidencia irrefutable\n• Captura toda la actividad de los clientes: quién, qué, cuándo, dónde\n• Imprime tickets de facturación en la calle con impresoras portátiles\n• Convierte toda la operación en métricas claras desde el primer día\n\nEl sistema sincroniza pedidos automáticamente, gestiona roles (Admin, Repartidor, Exhibidor) y mantiene un registro completo de quién hizo qué y cuándo, sin papel, sin excusas.\n\nResultados reales en operaciones activas:\n📦 40% menos tiempo en los recorridos\n✅ 25% menos errores operativos\n🚀 +50 entregas por día\n\nBajo el capó: la app es 100% offline-first, así que los choferes no pierden datos en zonas sin señal. Persistencia local con Room y un sincronizador reactivo con Coroutines y Flow que encola las operaciones y las descarga en orden cronológico apenas detecta conectividad. El ruteo lo resuelve un motor propio en C++20 sobre Vroom y OSRM, que ataca problemas de TSP y de ruteo con ventanas horarias (CVRP/VRPTW) en milisegundos.",
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
];
