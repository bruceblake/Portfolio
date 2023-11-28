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
      title: "Chief Technology Officer",
      company_name: "CaughtUp",
      icon: caughtup,
      iconBg: "#E6DEDD",
      date: "Nov 2023 - Present",
      points: [
        "Leading the development of a cross-platform mobile application using Flutter, Dart, and Firebase."
      ],
    },
  ];
  
 
  const projects = [
    {
      name: "Top Secret",
      description:
        "Organizes many aspects of friend groups such a gallery, chat, calendar, map, along with nearby events",
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
  ];
  
  export { services, technologies, experiences, projects };