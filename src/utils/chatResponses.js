// Intelligent static chat responses for Bruce Blake's portfolio
// This simulates an AI assistant with context-aware responses

const portfolioData = {
  experience: {
    google: {
      keywords: ['google', 'intern', 'internship', 'step', 'geo', 'platform'],
      response: `**Bruce is a 2x Google STEP intern with proven impact on millions of users.**

## Google Experience

### **STEP Intern - Platforms & Devices** (Upcoming Summer 2025)
• **Incoming intern** on the Platforms & Devices team
• Will work with **Java, Angular, TypeScript, and Protocol Buffers**
• Contributing to platform-level solutions used across Google products
• Building foundational platforms powering Google's ecosystem

### **STEP Intern - Geo Data Quality** (Summer 2024)
• **Built ML-powered issue-similarity recommender** from scratch
• **2.5M+ monthly active users** adopted the tool
• **Reduced manual triage time by 40%** for data quality issues
• Implemented **OpenAI embeddings** for semantic similarity matching
• Worked with **Java, TypeScript, Angular, and SQL**
• Received **excellent performance review** and return offer

The Google STEP program has **less than 3% acceptance rate**, highlighting Bruce's exceptional capabilities.`
    },
    
    entrepreneurial: {
      keywords: ['entrepreneur', 'business', 'revenue', 'startup', 'freelance', 'red bar', 'sushi'],
      response: `**Bruce generated $15K+ revenue building AI solutions for real businesses.**

## Entrepreneurial & Freelance Success

### **Red Bar Sushi - AI Phone Ordering System** (2024-2025)
• **$15,000+ revenue generated** in first 3 months
• **600+ customers served** with 98% order accuracy
• **70% reduction** in order processing time
• Built complete **AI-powered phone ordering system** from scratch
• Tech stack: **Python, MySQL, Docker, Celery, Twilio, OpenAI API**
• Implemented **24/7 automated ordering** with SMS confirmations
• Containerized micro-services following **DevSecOps practices**

### **Key Business Impact**
• Architected solution handling **concurrent phone calls**
• Designed **dynamic menu management** system
• Integrated **payment processing** workflows
• Built system that scales with business growth

This project demonstrates Bruce's ability to:
- Identify real business problems
- Build complete, production-ready solutions
- Generate measurable revenue impact
- Work directly with clients to deliver value`
    }
  },
  
  skills: {
    languages: {
      keywords: ['language', 'programming', 'code', 'coding', 'python', 'javascript', 'c++', 'java', 'swift'],
      response: `**Bruce is proficient in 10+ programming languages with expertise across the stack.**

## Programming Languages

### **Expert Level**
• **Java** - 2x Google internships, Spring Boot backends
• **Python** - AI/ML systems, FastAPI, data processing
• **TypeScript/JavaScript** - React, Angular, Node.js
• **Swift** - 20,000+ line iOS app with SwiftUI

### **Proficient**
• **C++** - Built custom 3D game engine from scratch
• **C#** - Unity game development, .NET applications
• **SQL** - Complex queries, database optimization

### **Frameworks by Domain**
• **Frontend**: React, Angular, SwiftUI, Flutter
• **Backend**: FastAPI, Flask, Spring Boot
• **Mobile**: SwiftUI, UIKit, Flutter
• **AI/ML**: OpenAI APIs, embeddings, LangChain
• **Game Dev**: Custom C++ engine, OpenGL, SDL2

### **Databases**
• PostgreSQL, MySQL, Firebase, Redis, MongoDB

Bruce's language expertise spans from low-level C++ to high-level web frameworks.`
    },
    
    technical: {
      keywords: ['tech', 'stack', 'framework', 'tool', 'skill', 'technology'],
      response: `**Bruce has comprehensive technical skills spanning full-stack development to AI/ML.**

## Technical Expertise

### **Frontend Development**
• **React** (4+ years) with Hooks, Context, Redux
• **Next.js** for SSR/SSG applications
• **TypeScript** for type-safe development
• **CSS**: Tailwind, Styled Components, SASS
• **Testing**: Jest, React Testing Library

### **Backend & Infrastructure**
• **Node.js/Express** for REST APIs
• **Python** backends with FastAPI/Django
• **Databases**: PostgreSQL, MongoDB, Redis
• **Cloud**: AWS (EC2, S3, Lambda), Google Cloud
• **DevOps**: Docker, Kubernetes, GitHub Actions

### **AI & Machine Learning**
• **LLM Integration**: OpenAI, Anthropic, Google APIs
• **ML Frameworks**: TensorFlow, PyTorch
• **Vector Databases**: Pinecone, Weaviate
• **RAG Systems**: LangChain, custom implementations

### **Specialized Skills**
• 3D Graphics programming (OpenGL/WebGL)
• Game engine development (C++)
• Mobile development (React Native, Android)
• Real-time systems and WebSockets`
    }
  },
  
  projects: {
    general: {
      keywords: ['project', 'built', 'created', 'developed', 'work', 'portfolio', 'physics', 'game', 'ios'],
      response: `**Bruce has built impressive projects from game engines to AI applications.**

## Featured Projects

### **3D Physics Engine & Multiplayer FPS** (6 months)
• **Custom C++ game engine** built from scratch
• Implemented **SAT and GJK collision detection** algorithms
• **OpenGL rendering** with dynamic lighting and shadows
• **Low-latency multiplayer** using ENet protocol
• **Entity-Component-System** architecture
• Supports **cross-platform** (Windows, Linux, macOS)

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

Each project demonstrates deep technical understanding and practical implementation.`
    }
  },
  
  education: {
    keywords: ['education', 'school', 'virginia tech', 'vt', 'gpa', 'degree', 'study', 'graduation'],
    response: `**Bruce has a 3.85 GPA at Virginia Tech, graduating May 2026 with Computer Engineering degree.**

## Education

### **Virginia Tech** (Graduating May 2026)
**Bachelor of Science in Computer Engineering**  
**Minor in Computer Science**
• **3.85 GPA** on 4.0 scale
• **Dean's List** multiple semesters
• **Relevant Coursework**: 
  - Data Structures & Algorithms
  - Computer Architecture
  - Operating Systems
  - Machine Learning
  - Embedded Systems
  - Database Systems

### **Academic Achievements**
• **VTHacks 12 Winner** - Built 'Memegen' AI meme generator in 36 hours
• **Diggeridoos Tunnel Robotics Team** - Software team member
  - One of only **12 teams worldwide** invited to Elon Musk's Not-A-Boring competition
  - Developing **autonomous navigation systems** for tunnel-boring robot
• **Dean's List** recognition for academic excellence

### **Technical Activities**
• Building autonomous systems for robotics competition
• Active in hackathon community
• Combining hardware and software expertise

Bruce excels academically while gaining real-world experience through internships and projects.`
  },
  
  strengths: {
    keywords: ['strength', 'why', 'hire', 'stand out', 'unique', 'best', 'candidate', 'special'],
    response: `**Bruce offers a unique combination: builds from first principles while delivering business impact.**

## Why Bruce Stands Out

### **🚀 Proven Track Record**
• **2.5M+ users** impacted at Google
• **$15K+ revenue** generated for clients
• **98% order accuracy** in production AI system
• **2x Google intern** (< 3% acceptance rate)

### **💡 Deep Technical Understanding**
• Built **3D game engine from scratch** in C++
• Created **20,000+ line iOS app** with clean architecture
• Develops from **embedded systems** to **cloud services**
• Understands technology **from first principles**

### **📈 Business Impact Focus**
• Reduced order processing time by **70%** for restaurant client
• Built **revenue-generating systems**, not just demos
• Delivered **$15K in 3 months** for Red Bar Sushi
• Creates solutions that **scale with business growth**

### **🎯 Unique Experiences**
• **Tunnel Robotics Team** - 1 of 12 teams worldwide
• **VTHacks Winner** - Built AI solution in 36 hours
• Combines **hardware and software** expertise
• **3.85 GPA** while working on real projects

### **⚡ Philosophy**
*"I believe in understanding technology from first principles. Whether building a physics engine or a distributed system, I start with the fundamentals and build up."*

Bruce delivers both technical excellence and measurable business value.`
  },
  
  contact: {
    keywords: ['contact', 'email', 'reach', 'connect', 'linkedin', 'github'],
    response: `**Here's how to connect with Bruce:**

## Contact Information

### **📧 Email**
**bruceblake@vt.edu** - Best for direct communication

### **💼 LinkedIn**
[linkedin.com/in/bruceblake](https://linkedin.com/in/bruceblake)
• 500+ connections
• Regular technical content posts
• Open to opportunities

### **🐙 GitHub**
[github.com/bruceblake](https://github.com/bruceblake)
• 50+ public repositories
• Active open source contributor
• Portfolio projects available

### **📍 Location**
• Currently based in **Virginia, USA**
• Open to **remote** and **relocation**
• Available for **Summer 2024** internships
• **Full-time** starting May 2025

### **⏰ Availability**
• Immediate availability for part-time projects
• Flexible schedule for interviews
• EST timezone (UTC-5)

Feel free to reach out - Bruce typically responds within 24 hours!`
  },
  
  general: {
    keywords: [],
    response: `**I'm here to help you learn about Bruce Blake, a software engineer with deep technical skills and proven business impact.**

## Quick Overview

### **🎓 Background**
• **2x Google STEP Intern** (2024, 2025) - < 3% acceptance rate
• **Virginia Tech Computer Engineering** - 3.85 GPA, graduating May 2026
• **$15K+ revenue** generated through freelance AI work
• **Tunnel Robotics Team** - 1 of 12 teams invited to Elon Musk's competition

### **💻 Core Expertise**
• **Languages**: Java, Python, TypeScript/JavaScript, Swift, C++
• **Domains**: Full-stack web, iOS development, AI/ML, Game engines
• **Impact**: 2.5M+ users at Google, 600+ customers served

### **🚀 Notable Projects**
• **3D Physics Engine** - Custom C++ engine with multiplayer FPS
• **AI Phone Ordering** - Generated $15K+ for Red Bar Sushi
• **iOS Social App** - 20,000+ lines of clean SwiftUI code
• **ML Recommender** - Used by 2.5M+ monthly at Google

### **❓ Popular Questions**
• "Tell me about Bruce's Google experience"
• "What makes Bruce different from other candidates?"
• "Show me his most impressive technical projects"
• "What's his experience with AI and machine learning?"

What aspect of Bruce's background interests you most?`
  }
};

// Function to find the best matching response
export function getResponse(message) {
  const lowercaseMessage = message.toLowerCase();
  
  // Check each category for keyword matches
  for (const category of Object.values(portfolioData)) {
    for (const topic of Object.values(category)) {
      if (topic.keywords.some(keyword => lowercaseMessage.includes(keyword))) {
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
  return baseDelay + (message.length * charDelay);
}