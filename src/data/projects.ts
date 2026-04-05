export interface Project {
  id: string;
  title: string;
  description?: string;
  imageUrl?: string; // relative path from /public or absolute URL
  url?: string;
  tech?: string[];
}

// Add projects here as they are completed.
// Example:
// {
//   id: "my-project",
//   title: "My Project",
//   description: "Brief description of what it does.",
//   imageUrl: "/images/my-project.png",
//   url: "https://myproject.com",
//   tech: ["Next.js", "Node.js"],
// }
export const projects: Project[] = [];
