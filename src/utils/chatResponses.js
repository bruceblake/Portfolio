// Intelligent static chat responses for Bruce Blake's portfolio
// Based on actual data from bruce-blake-data.json

const portfolioData = {
  experience: {
    google: {
      keywords: ["google", "intern", "internship", "step", "geo", "platform"],
      response: `**Bruce is a 2x Google STEP intern working on platforms that impact millions.**

## Google Experience

### **STEP Intern - Platforms & Devices** (May 2025 - Aug 2025)
• **Upcoming intern** on the Platforms & Devices team
• Will work with **Java, Angular, TypeScript, and Protocol Buffers**
• Contributing to platform-level solutions used across Google products
• Building foundational platforms powering Google's ecosystem

### **STEP Intern - Geo Data Quality** (May 2024 - Aug 2024)
• **Built ML-powered issue-similarity recommender** from scratch
• **2.5M+ monthly active users** adopted the tool
• **Reduced manual triage time by 40%** for data quality issues
• Implemented **OpenAI embeddings** for semantic similarity matching
• Worked with **Java, TypeScript, Angular, and SQL**
• Received **excellent performance review** and return offer
• Launched feature end-to-end within 12-week internship

The Google STEP program has an extremely competitive selection process, highlighting Bruce's exceptional capabilities.`,
    },

    entrepreneurial: {
      keywords: [
        "entrepreneur",
        "business",
        "revenue",
        "startup",
        "freelance",
        "red bar",
        "sushi",
        "ai phone",
      ],
      response: `**Bruce generated $15K+ revenue building an AI phone ordering system for Red Bar Sushi.**

## Freelance Software Engineer - Red Bar Sushi (Sep 2024 - Feb 2025)

### **Project Overview**
• Built complete **AI-powered inbound phone ordering system** from scratch
• **$15,000+ revenue generated** in first 3 months
• **600+ customers served** with 98% order accuracy
• **70% reduction** in order processing time

### **Technical Implementation**
• Architected solution using **Python, MySQL, Docker, Celery, Twilio, and OpenAI API**
• Designed **MySQL + JSON menu management** for dynamic updates
• Implemented **Celery workers** for asynchronous SMS confirmations
• Containerized micro-services following **DevSecOps practices**
• Integrated **payment processing** and order management workflows
• Built system that **scales to handle concurrent calls**

### **Business Impact**
• **24/7 automated ordering** - no missed orders
• **98% order accuracy** - minimal errors
• **70% time reduction** - faster order processing
• **Scalable architecture** - grows with business

This project demonstrates Bruce's ability to:
- Identify real business problems and create solutions
- Build complete, production-ready systems
- Generate measurable revenue impact
- Work directly with clients to deliver value`,
    },
  },

  skills: {
    languages: {
      keywords: [
        "language",
        "programming",
        "code",
        "coding",
        "python",
        "javascript",
        "c++",
        "java",
        "swift",
        "typescript",
      ],
      response: `**Bruce is proficient in multiple programming languages with deep expertise across the stack.**

## Programming Languages

### **Expert Level**
• **Java** - 2x Google internships, backend systems
• **Python** - AI/ML systems, FastAPI, freelance projects
• **TypeScript/JavaScript** - React, Angular, Node.js
• **Swift** - 20,000+ line iOS app with SwiftUI

### **Proficient**
• **C++** - Built custom 3D game engine from scratch
• **C#** - Game development experience

### **Familiar**
• **Dart** - Flutter development
• **SQL** - Database queries and optimization
• **HTML/CSS** - Web development

### **Frameworks & Tools**
• **Frontend**: React, Angular, SwiftUI, Flutter
• **Backend**: FastAPI, Flask, Spring Boot
• **Mobile**: SwiftUI, UIKit, Flutter
• **Databases**: PostgreSQL, MySQL, Firebase, Redis, MongoDB
• **Cloud**: AWS, Google Cloud, Vercel
• **DevOps**: Docker, GitHub Actions, CI/CD

Bruce's expertise spans from low-level C++ systems to high-level web frameworks, enabling full-stack development.`,
    },

    technical: {
      keywords: ["tech", "stack", "framework", "tool", "skill", "technology", "experience"],
      response: `**Bruce has comprehensive technical skills from systems programming to cloud architecture.**

## Technical Expertise

### **Frontend Development**
• **React** with TypeScript, Hooks, and modern patterns
• **Angular** - Used at Google for enterprise applications
• **SwiftUI** - Built 20k+ line iOS application
• **Flutter** - Cross-platform mobile development
• **CSS**: Tailwind, styled-components, responsive design

### **Backend & Infrastructure**
• **Python**: FastAPI, Flask, Celery for async tasks
• **Java**: Spring Boot, used extensively at Google
• **Node.js**: Express, REST APIs
• **Databases**: PostgreSQL, MySQL, Firebase, Redis, MongoDB
• **Cloud**: AWS, Google Cloud Platform, Vercel
• **DevOps**: Docker, Kubernetes, GitHub Actions

### **Specialized Skills**
• **AI/ML Integration**: OpenAI APIs, embeddings, LangChain
• **Game Development**: Custom C++ engine, OpenGL, physics
• **Mobile**: iOS (Swift/SwiftUI), cross-platform (Flutter)
• **Real-time**: WebSockets, concurrent systems
• **Low-level**: C++ systems programming, memory management

### **Development Practices**
• Git version control
• Agile/Scrum methodologies
• Code reviews and documentation
• Test-driven development
• CI/CD pipelines`,
    },
  },

  projects: {
    general: {
      keywords: [
        "project",
        "built",
        "created",
        "developed",
        "work",
        "portfolio",
        "physics",
        "game",
        "ios",
        "app",
      ],
      response: `**Bruce has built impressive projects from game engines to production AI systems.**

## Featured Projects

### **3D Physics Engine & Multiplayer FPS** (6 months)
• **Custom C++ game engine** built from scratch
• Implemented **SAT and GJK collision detection** algorithms
• **OpenGL rendering** with dynamic lighting and shadows
• **Low-latency multiplayer** using ENet protocol
• **Entity-Component-System** architecture
• Cross-platform support (Windows, Linux, macOS)
• Level editor using Dear ImGui

### **iOS Social Media App** (20,000+ lines)
• Comprehensive **SwiftUI** application with **MVVM architecture**
• **Real-time messaging** using Firebase
• **Offline support** with CoreData
• Features: Auth, groups, events, photo gallery, push notifications
• Clean architecture demonstrating iOS expertise

### **BetterRepo2File** (Active Development)
• **Developer tool** for extracting repository context for AI
• **AST-based code analysis** for intelligent extraction
• **End-to-end testing** with Playwright
• Used by developers to improve AI code generation

### **DreamCanvas** (AI Image Generation)
• **TypeScript/React** with Stable Diffusion integration
• **Real-time WebSocket** progress streaming
• Mask-based inpainting for precise edits

### **SudokuSolver** (Algorithms & Web)
• Interactive solver with step-by-step visualization
• Backtracking algorithm with optimizations
• Deployed on Vercel with Lighthouse checks

Each project demonstrates deep technical understanding and practical implementation skills.`,
    },
  },

  education: {
    keywords: [
      "education",
      "school",
      "virginia tech",
      "vt",
      "gpa",
      "degree",
      "study",
      "graduation",
      "major",
    ],
    response: `**Bruce has a 3.85 GPA at Virginia Tech, graduating May 2026 with Computer Engineering degree.**

## Education

### **Virginia Tech** (Graduating May 2026)
**Bachelor of Science in Computer Engineering**  
**Minor in Computer Science**
• **3.85 GPA** on 4.0 scale
• **Dean's List** multiple semesters

### **Relevant Coursework**
• Data Structures & Algorithms
• Computer Architecture
• Operating Systems
• Machine Learning
• Software Engineering
• Computer Networks
• Database Systems
• Embedded Systems

### **Academic Achievements**
• **VTHacks 12 Winner** - Built 'Memegen' AI meme generator in 36 hours
• **Diggeridoos Tunnel Robotics Team** - Software team member
  - One of only **12 teams worldwide** invited to Elon Musk's Not-A-Boring competition
  - Developing **autonomous navigation systems** for tunnel-boring robot
• **Dean's List** recognition for academic excellence

### **Activities**
• Active in hackathon community
• Building autonomous systems for robotics
• Combining hardware and software expertise

Bruce excels academically while gaining real-world experience through internships and projects.`,
  },

  strengths: {
    keywords: [
      "strength",
      "why",
      "hire",
      "stand out",
      "unique",
      "best",
      "candidate",
      "special",
      "different",
    ],
    response: `**Bruce offers a unique combination: builds from first principles while delivering business impact.**

## Why Bruce Stands Out

### **🚀 Proven Track Record**
• **2.5M+ users** impacted at Google
• **$15K+ revenue** generated for Red Bar Sushi
• **98% order accuracy** in production AI system
• **2x Google intern** with excellent reviews

### **💡 Deep Technical Understanding**
• Built **3D game engine from scratch** in C++
• Created **20,000+ line iOS app** with clean architecture
• Develops from **embedded systems** to **cloud services**
• Understands technology **from first principles**

### **📈 Business Impact Focus**
• Reduced order processing time by **70%** for restaurant
• Built **revenue-generating systems**, not just demos
• Tool at Google adopted by **2.5M+ monthly users**
• Creates solutions that **scale with growth**

### **🎯 Unique Experiences**
• **Tunnel Robotics Team** - 1 of 12 teams worldwide
• **VTHacks Winner** - Built AI solution in 36 hours
• Combines **hardware and software** expertise
• **3.85 GPA** while working on real projects

### **⚡ Philosophy**
*"I believe in understanding technology from first principles. Whether building a physics engine or a distributed system, I start with the fundamentals and build up."*

Bruce's rare combination of low-level systems knowledge and high-level product thinking enables him to architect solutions that are both technically sound and business-impactful.`,
  },

  contact: {
    keywords: ["contact", "email", "reach", "connect", "linkedin", "github", "availability"],
    response: `**Here's how to connect with Bruce:**

## Contact Information

### **📧 Email**
**bruceblake@vt.edu** - Best for direct communication

### **💼 LinkedIn**
[linkedin.com/in/bruceblake](https://linkedin.com/in/bruceblake)
• Professional networking
• Open to connections

### **🐙 GitHub**
[github.com/bruceblake](https://github.com/bruceblake)
• Check out my projects
• See my code in action

### **📍 Location & Availability**
• Currently based in **USA (EST timezone)**
• Open to opportunities in:
  - San Francisco
  - New York
  - Seattle
  - Remote positions

### **🎯 Looking For**
• **Internships** and **full-time opportunities**
• Interested in:
  - AI/ML applications
  - Distributed systems
  - Full-stack development
  - Game engine development

### **⏰ Availability**
• Open to internships and full-time roles
• Available for interviews
• Quick response time (usually within 24 hours)

Feel free to reach out - I'm always excited to discuss new opportunities!`,
  },

  general: {
    keywords: [],
    response: `**I'm an AI assistant with knowledge about Bruce Blake, a software engineer pursuing Computer Engineering at Virginia Tech.**

## Quick Overview

### **🎓 Background**
• **2x Google STEP Intern** (2024 Geo, 2025 Platforms)
• **Virginia Tech Computer Engineering** - 3.85 GPA, graduating May 2026
• **$15K+ revenue** generated through AI freelance work
• **Tunnel Robotics Team** - 1 of 12 teams worldwide

### **💻 Technical Skills**
• **Languages**: Java, Python, TypeScript, JavaScript, Swift, C++
• **Expertise**: Full-stack web, iOS development, AI/ML, Game engines
• **Impact**: 2.5M+ users at Google, 600+ customers served

### **🚀 Notable Projects**
• **3D Physics Engine** - Custom C++ engine with multiplayer
• **AI Phone System** - Generated $15K+ for Red Bar Sushi
• **iOS Social App** - 20,000+ lines of SwiftUI code
• **ML Tool at Google** - Used by 2.5M+ monthly users

### **❓ Popular Questions**
• "Tell me about Bruce's Google experience"
• "What projects has Bruce built?"
• "What makes Bruce different from other candidates?"
• "What's his experience with AI and freelance work?"

What would you like to know about Bruce's background?`,
  },

  philosophy: {
    keywords: ["philosophy", "approach", "values", "goals", "believe", "think"],
    response: `**Bruce believes in understanding technology from first principles and building for real impact.**

## Engineering Philosophy

### **Core Approach**
*"I believe in understanding technology from first principles. Whether building a physics engine or a distributed system, I start with the fundamentals and build up."*

### **Values**
• **Deep Understanding** - Not just using frameworks, but understanding how they work
• **Real Impact** - Building systems that generate revenue and serve real users
• **Clean Code** - Maintainable, well-architected solutions over quick hacks
• **Continuous Learning** - Always expanding knowledge and skills

### **Goals**

**Short Term**
• Excel in upcoming Google internship
• Graduate with honors from Virginia Tech

**Medium Term**
• Join a company working on challenging technical problems at scale
• Continue building systems that impact millions

**Long Term**
• Build products that positively impact millions of users
• Contribute to advancing technology in meaningful ways

### **Work Approach**
• Start with fundamentals and build up
• Focus on business impact, not just technical elegance
• Write code that others can understand and maintain
• Always consider scalability and future growth

This philosophy has guided Bruce from building game engines in C++ to creating AI systems that generate real revenue.`,
  },
};

// Function to find the best matching response
export function getResponse(message) {
  const lowercaseMessage = message.toLowerCase();

  // Check each category for keyword matches
  for (const category of Object.values(portfolioData)) {
    for (const topic of Object.values(category)) {
      if (
        topic.keywords.some((keyword) => lowercaseMessage.includes(keyword))
      ) {
        return topic.response;
      }
    }
  }

  // Default response if no keywords match
  return portfolioData.general.keywords.response;
}

// Simulate typing delay for more realistic chat
export function getTypingDelay(message) {
  // Base delay + additional time based on message length
  const baseDelay = 500;
  const charDelay = 5; // ms per character
  return baseDelay + message.length * charDelay;
}