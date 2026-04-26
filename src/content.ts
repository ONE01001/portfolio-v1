export type Project = {
  title: string;
  description: string[];
  tech: string[];
  liveUrl?: string;
  repoUrl?: string;
};

export type Education = {
  school: string;
  year: string;
  program: string;
  location: string;
};

export type SocialLinks = {
  github?: string;
  linkedin?: string;
};

export const PROFILE = {
  name: "Hardik Rana",
  role: "Frontend-Focused Full Stack Developer",
  location: "Delhi, India",
  availability: "Open to opportunities",
  phone: "9643462342",
  email: "hardikrana2717@gmail.com",
  socials: {
    github: "https://github.com/ONE01001",
    linkedin: "https://www.linkedin.com/in/hardik-rana-923a042b6/",
  } satisfies SocialLinks,
};

export const SUMMARY =
  "Frontend-focused Full Stack Developer with hands-on experience building and deploying real-world web applications using HTML, CSS, JavaScript, and React.js. Experienced in backend development with Node.js and Express.js, and in deploying applications on Render. Passionate about building impactful, user-friendly products and continuously expanding into full stack development.";

export const SKILL_GROUPS: { label: string; items: string[] }[] = [
  { label: "Languages", items: ["JavaScript", "HTML", "CSS"] },
  { label: "Frameworks", items: ["React.js", "Node.js", "Express.js"] },
  { label: "Design", items: ["Figma", "Google Stitch"] },
  { label: "3D", items: ["Blender"] },
  {
    label: "Tools",
    items: ["Git", "GitHub", "Git Bash", "Render", "DevTools"],
  },
];

export const PROJECTS: Project[] = [
  {
    title: "Pokémon API Web Application",
    description: [
      "Built a web application to search Pokemon by name or ID using a public REST API.",
      "Displayed Pokemon attributes and images with error handling and a responsive UI.",
    ],
    tech: ["HTML", "CSS", "JavaScript", "REST API", "Render"],
    liveUrl: "https://pokemon-apii2.onrender.com",
  },
  {
    title: "Real-Time Chatbot Application",
    description: [
      "Developed a real-time chatbot web application using React.js with live user interaction.",
      "Deployed and hosted the application live for users on Render.",
    ],
    tech: ["React.js", "JavaScript", "Render"],
    liveUrl: "https://chatbot-project-bwix.onrender.com/",
  },
  {
    title: "AI-Powered College Web Application (Collaborative Project)",
    description: [
      "Built an AI-powered MERN stack platform for notes, PDFs, and MCQ-based mock tests.",
      "Integrated Google Gemini API and deployed the project on Render.",
    ],
    tech: ["MERN", "Gemini API", "Render"],
    liveUrl: "https://studyai-dc2u.onrender.com",
  },
];

export const EDUCATION: Education[] = [
  {
    school: "Inderprastha Engineering College",
    year: "2026",
    program: "Bachelor of Computer Applications (BCA)",
    location: "Ghaziabad, Uttar Pradesh",
  },
  {
    school: "Senior Secondary (CBSE) - Class XII",
    year: "2023",
    program: "CBSE",
    location: "Delhi, India",
  },
  {
    school: "Secondary (CBSE) - Class X",
    year: "2021",
    program: "CBSE",
    location: "Krishna Nagar, Delhi",
  },
];

export const HOBBIES: string[] = [
  "Interest in game development and 3D modeling using Blender.",
  "Enjoy building web applications and exploring new technologies.",
  "Currently learning Japanese to improve global communication skills.",
  "Actively play badminton, improving focus and discipline.",
];

export const TECH_COLORS: Record<string, string> = {
  HTML: "#E34F26",
  CSS: "#1572B6",
  JavaScript: "#F7DF1E",
  "React.js": "#61DAFB",
  "Node.js": "#339933",
  "Express.js": "#888888",
  Figma: "#F24E1E",
  "Google Stitch": "#4285F4",
  Blender: "#F5792A",
  Git: "#F05032",
  GitHub: "#FFFFFF",
  "Git Bash": "#4EAA25",
  Render: "#46E3B7",
  DevTools: "#A8A8A8",
  "REST API": "#0096D6",
  MERN: "#00D8FF",
  "Gemini API": "#8E75B2"
};
