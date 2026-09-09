export const SITE_URL = "https://abrilcodes.com";

/**
 * The contact form is served as static HTML from GitHub Pages, so it cannot
 * post to a relative /api route: the Express backend lives on its own host.
 */
export const CONTACT_ENDPOINT = "https://api.abrilcodes.com/api/contact";

export const SOCIAL = {
  linkedin: "https://www.linkedin.com/in/david-abril-perrig/",
  github: "https://github.com/DavidAbril411",
};

export const AUTHOR = {
  name: "David Abril Perrig",
  fullName: "David Ignacio Abril Perrig",
  email: "davidabril411@gmail.com",
  jobTitle: {
    en: "Full-Stack, Mobile & AI Software Engineer",
    es: "Ingeniero de software full-stack, mobile e IA",
  },
};
