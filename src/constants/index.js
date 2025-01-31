import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  java,
  cpp,
  tailwind,
  nodejs,
  mongodb,
  firebase,
  swift,
  git,
  figma,
  docker,
  meta,
  starbucks,
  tesla,
  shopify,
  carrent,
  topsecret,
  jobit,
  tripguide,
  savenessa,
  threejs,
  familytree,
  csharp,
  external,
  caughtup,
  flutter,
  dart
} from "../assets";

export const navLinks = [
  {
    id: "resume",
    title: "Resume"
  },
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "Web Developer",
    icon: web,
  },
  {
    title: "Mobile Developer",
    icon: mobile,
  },
  {
    title: "Full-Stack Developer",
    icon: backend,
  }
];

const technologies = [
  {
    name: "Java",
    icon: java,
  },
  {
    name: "C++",
    icon: cpp,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "Swift",
    icon: swift,
  },
  {
    name: "C#",
    icon: csharp,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "Firebase",
    icon: firebase,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Git",
    icon: git,
  },
  {
    name: "Figma",
    icon: figma,
  },
  {
    name: "Flutter",
    icon: flutter,
  },
  {
    name: "Dart",
    icon: dart,
  }
];

const experiences = [

  {
    title: "STEP Intern",
    company_name: "Google",
    icon: caughtup,
    iconBg: "#E6DEDD",
    website: "google.com",
    date: "May 2025 - August 2025",
    points: [
      "Incoming 2025 STEP Intern on the Products and Devices team"
    ],
  },

  {
    title: "AI Trainer - Coder",
    company_name: "Scale AI",
    icon: caughtup,
    iconBg: "#E6DEDD",
    website: "scale.com",
    date: "September 2024 - January 2025",
    points: [
      "Helped various LLMs generate better code by evaluating and testing the quality of AI-generated code responses",
      " Wrote functional and optimized Swift code to refine AI responses with explanations, enhancing response accuracy"
    ],
  },

  {
    title: "Freelance Software Engineer",
    company_name: "Red Bar Sushi",
    icon: caughtup,
    iconBg: "#E6DEDD",
    website: "redbarsushi.com",
    date: "November 2024 - February 2025",
    points: [
      "Developed an AI-driven order system using Python and Flask that handles inbound phone calls via Twilio, serving over 600 customers and generating $15,000+ in revenue",
      "Implemented fuzzy-search algorithm using Levenshtein distance to match user input against the menu",
      "Leveraged OPENAI API for NLP to accurately parse customer orders and interactions",
      "Managed menu data in a Flask app backed by MySQL and JSON file storage"
    ],
  },

  {
    title: "STEP Intern",
    company_name: "Google",
    icon: caughtup,
    iconBg: "#E6DEDD",
    website: "google.com",
    date: "May 2024 - August 2024",
    points: [
      "Created a recommendation system that reduced the cost of manual issue management, used by 2,500,000+ people a month",
      "Wrote a design doc, and an implementation plan, went through design reviews, and launched internally",
      "Full stack development, using Java with Apps Framework, TypeScript with Angular, HTML, CSS",
      "Utilized vector word embeddings as the machine learning model to label “similar” issues"
    ],
  },
];


const projects = [
  {
    name: "Full Stack iOS Social Media App",
    description:
      "Organizes many aspects of friend groups such a gallery, chat, calendar, map, along with nearby events, Organized codebase with 20K+ lines of code using MVVM architecture pattern",
    tags: [
      {
        name: "Swift",
        color: "text-orange-400",
      },
      {
        name: "Firebase",
        color: "text-yellow-600",
      },
      {
        name: "SwiftUI",
        color: "text-blue-500",
      },
    ],
    image: topsecret,
    source_code_link: "https://github.com/bruceblake/Top-Secret",
  },
  {
    name: "Family Tree Graph Visualization",
    description:
      " Organized brothers in fraternity in family lineages using a tree data structure and visualization",
    tags: [
      {
        name: "React",
        color: "text-blue-500",
      },
      {
        name: "TailwindCSS",
        color: "text-blue-200",
      },
      {
        name: "JavaScript",
        color: "text-yellow-300"
      },
      {
        name: "Firebase",
        color: "text-yellow-600",
      },
    ],
    image: familytree,
    source_code_link: "https://github.com/bruceblake/Triangle-Family-Lineage-Tree",
  },
  {
    name: "Save Nessa",
    description:
      "2D arcade style shooting game where the user must keep “Nessa” safe for as long as possible",
    tags: [
      {
        name: "C#",
        color: "text-blue-500",
      },
      {
        name: "Unity",
        color: "text-white-500",
      }
    ],
    image: savenessa,
    source_code_link: "https://github.com/bruceblake/SaveNessa",
    externalLink: "https://ilynx.itch.io/save-nessa",
  },

  {
    name: "Hopfield Network Simulator",
    description:
      "Demonstrated the behavior of the Hopfield network’s ability to converge on stable states",
    tags: [
      {
        name: "Java",
        color: "text-blue-500",
      },
    ],
    image: savenessa,
    source_code_link: "https://github.com/bruceblake/Hopfield-Network",
    externalLink: "https://ilynx.itch.io/save-nessa",
  },
];

export { services, technologies, experiences, projects };
