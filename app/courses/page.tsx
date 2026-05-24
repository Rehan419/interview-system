"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  Users,
  Cpu,
  Code,
  Briefcase,
  Brain,
  MessageSquare,
  Target,
  Heart,
  Database,
  Server,
  Globe,
  Layers,
  Shield,
  GitBranch,
  ArrowRight,
  ArrowLeft,
  Clock,
  BookOpen,
  Star,
  CheckCircle,
  Play,
  FileText,
  Award,
  Zap,
  TrendingUp,
  HelpCircle,
  Lightbulb,
} from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { GlassCard } from "@/components/ui/glass-card";

// Interview categories within each course
interface InterviewTopic {
  id: string;
  title: string;
  description: string;
  questions: number;
  difficulty: "Easy" | "Medium" | "Hard";
  icon: typeof Code;
}

interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  lessons: number;
  level: string;
  rating: number;
  students: number;
  topics: string[];
  icon: typeof Code;
  interviewCategories: InterviewTopic[];
}

interface MainCategory {
  id: string;
  title: string;
  description: string;
  icon: typeof Code;
  color: string;
  image: string;
  courses: Course[];
}

const mainCategories: MainCategory[] = [
  {
    id: "hr",
    title: "HR Interview",
    description: "Master behavioral questions, soft skills, and professional communication",
    icon: Users,
    color: "from-emerald-500 to-teal-500",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80",
    courses: [
      {
        id: "behavioral",
        title: "Behavioral Interview Mastery",
        description: "Learn STAR method, handle situational questions, and showcase your experiences effectively",
        duration: "4 hours",
        lessons: 12,
        level: "Beginner",
        rating: 4.8,
        students: 2500,
        topics: ["STAR Method", "Situational Questions", "Experience Sharing"],
        icon: MessageSquare,
        interviewCategories: [
          {
            id: "star-method",
            title: "STAR Method Questions",
            description: "Practice Situation, Task, Action, Result format questions",
            questions: 25,
            difficulty: "Easy",
            icon: Target,
          },
          {
            id: "leadership",
            title: "Leadership Scenarios",
            description: "Questions about leading teams and making decisions",
            questions: 20,
            difficulty: "Medium",
            icon: Award,
          },
          {
            id: "conflict-resolution",
            title: "Conflict Resolution",
            description: "Handle workplace conflicts and difficult situations",
            questions: 18,
            difficulty: "Medium",
            icon: Users,
          },
          {
            id: "teamwork",
            title: "Teamwork & Collaboration",
            description: "Demonstrate your ability to work with others",
            questions: 22,
            difficulty: "Easy",
            icon: Heart,
          },
        ],
      },
      {
        id: "communication",
        title: "Professional Communication",
        description: "Develop clear communication, active listening, and presentation skills for interviews",
        duration: "3 hours",
        lessons: 10,
        level: "Beginner",
        rating: 4.7,
        students: 1800,
        topics: ["Active Listening", "Presentation", "Body Language"],
        icon: Target,
        interviewCategories: [
          {
            id: "verbal-comm",
            title: "Verbal Communication",
            description: "Practice clear and effective verbal communication",
            questions: 20,
            difficulty: "Easy",
            icon: MessageSquare,
          },
          {
            id: "presentation",
            title: "Presentation Skills",
            description: "Present ideas and projects confidently",
            questions: 15,
            difficulty: "Medium",
            icon: FileText,
          },
          {
            id: "active-listening",
            title: "Active Listening",
            description: "Demonstrate attentive listening and understanding",
            questions: 12,
            difficulty: "Easy",
            icon: HelpCircle,
          },
          {
            id: "body-language",
            title: "Non-Verbal Communication",
            description: "Master body language and professional presence",
            questions: 10,
            difficulty: "Easy",
            icon: Zap,
          },
        ],
      },
      {
        id: "softskills",
        title: "Soft Skills Development",
        description: "Build leadership, teamwork, problem-solving, and adaptability skills",
        duration: "5 hours",
        lessons: 15,
        level: "Intermediate",
        rating: 4.9,
        students: 3200,
        topics: ["Leadership", "Teamwork", "Problem Solving"],
        icon: Heart,
        interviewCategories: [
          {
            id: "problem-solving",
            title: "Problem-Solving Mindset",
            description: "Showcase analytical and creative thinking",
            questions: 22,
            difficulty: "Medium",
            icon: Lightbulb,
          },
          {
            id: "adaptability",
            title: "Adaptability & Flexibility",
            description: "Handle change and unexpected situations",
            questions: 18,
            difficulty: "Medium",
            icon: TrendingUp,
          },
          {
            id: "time-management",
            title: "Time Management",
            description: "Demonstrate organizational and prioritization skills",
            questions: 15,
            difficulty: "Easy",
            icon: Clock,
          },
          {
            id: "emotional-intelligence",
            title: "Emotional Intelligence",
            description: "Show self-awareness and empathy",
            questions: 20,
            difficulty: "Hard",
            icon: Heart,
          },
        ],
      },
      {
        id: "salary",
        title: "Salary Negotiation",
        description: "Learn techniques to negotiate your compensation package confidently",
        duration: "2 hours",
        lessons: 8,
        level: "Advanced",
        rating: 4.6,
        students: 1200,
        topics: ["Negotiation", "Market Research", "Benefits"],
        icon: Briefcase,
        interviewCategories: [
          {
            id: "salary-discussion",
            title: "Salary Discussion",
            description: "Navigate salary expectation questions",
            questions: 15,
            difficulty: "Hard",
            icon: Briefcase,
          },
          {
            id: "benefits-negotiation",
            title: "Benefits & Perks",
            description: "Negotiate beyond base salary",
            questions: 12,
            difficulty: "Medium",
            icon: Award,
          },
          {
            id: "counter-offers",
            title: "Counter Offers",
            description: "Handle and respond to counter offers",
            questions: 10,
            difficulty: "Hard",
            icon: TrendingUp,
          },
          {
            id: "market-research",
            title: "Market Value Assessment",
            description: "Research and present your market value",
            questions: 8,
            difficulty: "Medium",
            icon: Target,
          },
        ],
      },
    ],
  },
  {
    id: "cs",
    title: "CS Subject Interview",
    description: "Deep dive into computer science fundamentals and theoretical concepts",
    icon: Cpu,
    color: "from-blue-500 to-cyan-500",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80",
    courses: [
      {
        id: "dsa",
        title: "Data Structures & Algorithms",
        description: "Master arrays, linked lists, trees, graphs, sorting, searching, and dynamic programming",
        duration: "12 hours",
        lessons: 40,
        level: "Intermediate",
        rating: 4.9,
        students: 8500,
        topics: ["Arrays", "Trees", "Graphs", "DP"],
        icon: Database,
        interviewCategories: [
          {
            id: "arrays-strings",
            title: "Arrays & Strings",
            description: "Array manipulation, string algorithms, sliding window",
            questions: 50,
            difficulty: "Easy",
            icon: Layers,
          },
          {
            id: "linked-lists",
            title: "Linked Lists",
            description: "Singly, doubly linked lists, cycle detection",
            questions: 30,
            difficulty: "Medium",
            icon: GitBranch,
          },
          {
            id: "trees-graphs",
            title: "Trees & Graphs",
            description: "Binary trees, BST, BFS, DFS, shortest paths",
            questions: 45,
            difficulty: "Hard",
            icon: GitBranch,
          },
          {
            id: "dynamic-programming",
            title: "Dynamic Programming",
            description: "Memoization, tabulation, optimization problems",
            questions: 40,
            difficulty: "Hard",
            icon: Brain,
          },
          {
            id: "sorting-searching",
            title: "Sorting & Searching",
            description: "Quick sort, merge sort, binary search variations",
            questions: 25,
            difficulty: "Medium",
            icon: TrendingUp,
          },
        ],
      },
      {
        id: "os",
        title: "Operating Systems",
        description: "Learn process management, memory management, file systems, and concurrency",
        duration: "8 hours",
        lessons: 25,
        level: "Intermediate",
        rating: 4.7,
        students: 4200,
        topics: ["Processes", "Memory", "Deadlocks", "Scheduling"],
        icon: Server,
        interviewCategories: [
          {
            id: "process-management",
            title: "Process Management",
            description: "Process states, PCB, context switching",
            questions: 25,
            difficulty: "Medium",
            icon: Server,
          },
          {
            id: "memory-management",
            title: "Memory Management",
            description: "Paging, segmentation, virtual memory",
            questions: 30,
            difficulty: "Hard",
            icon: Database,
          },
          {
            id: "cpu-scheduling",
            title: "CPU Scheduling",
            description: "FCFS, SJF, Round Robin, Priority scheduling",
            questions: 20,
            difficulty: "Medium",
            icon: Clock,
          },
          {
            id: "deadlocks",
            title: "Deadlocks",
            description: "Detection, prevention, avoidance, recovery",
            questions: 18,
            difficulty: "Hard",
            icon: Shield,
          },
          {
            id: "file-systems",
            title: "File Systems",
            description: "File organization, allocation methods, directories",
            questions: 15,
            difficulty: "Medium",
            icon: FileText,
          },
        ],
      },
      {
        id: "dbms",
        title: "Database Management Systems",
        description: "SQL, normalization, indexing, transactions, and database design principles",
        duration: "6 hours",
        lessons: 20,
        level: "Intermediate",
        rating: 4.8,
        students: 5100,
        topics: ["SQL", "Normalization", "ACID", "Indexing"],
        icon: Database,
        interviewCategories: [
          {
            id: "sql-queries",
            title: "SQL Queries",
            description: "SELECT, JOIN, subqueries, aggregations",
            questions: 40,
            difficulty: "Medium",
            icon: Code,
          },
          {
            id: "normalization",
            title: "Normalization",
            description: "1NF, 2NF, 3NF, BCNF, denormalization",
            questions: 20,
            difficulty: "Medium",
            icon: Layers,
          },
          {
            id: "transactions",
            title: "Transactions & ACID",
            description: "ACID properties, isolation levels, concurrency",
            questions: 25,
            difficulty: "Hard",
            icon: Shield,
          },
          {
            id: "indexing",
            title: "Indexing & Optimization",
            description: "B-trees, hash indexes, query optimization",
            questions: 22,
            difficulty: "Hard",
            icon: Zap,
          },
          {
            id: "er-modeling",
            title: "ER Modeling",
            description: "Entity relationships, schema design",
            questions: 15,
            difficulty: "Easy",
            icon: GitBranch,
          },
        ],
      },
      {
        id: "cn",
        title: "Computer Networks",
        description: "OSI model, TCP/IP, routing, protocols, and network security fundamentals",
        duration: "7 hours",
        lessons: 22,
        level: "Intermediate",
        rating: 4.6,
        students: 3800,
        topics: ["OSI Model", "TCP/IP", "Protocols", "Security"],
        icon: Globe,
        interviewCategories: [
          {
            id: "osi-model",
            title: "OSI & TCP/IP Models",
            description: "Layer functions, protocols at each layer",
            questions: 25,
            difficulty: "Medium",
            icon: Layers,
          },
          {
            id: "tcp-udp",
            title: "TCP vs UDP",
            description: "Connection-oriented vs connectionless, use cases",
            questions: 20,
            difficulty: "Medium",
            icon: GitBranch,
          },
          {
            id: "ip-addressing",
            title: "IP Addressing & Subnetting",
            description: "IPv4, IPv6, CIDR, subnetting calculations",
            questions: 30,
            difficulty: "Hard",
            icon: Globe,
          },
          {
            id: "routing",
            title: "Routing Protocols",
            description: "RIP, OSPF, BGP, routing algorithms",
            questions: 22,
            difficulty: "Hard",
            icon: TrendingUp,
          },
          {
            id: "network-security",
            title: "Network Security",
            description: "Firewalls, VPN, SSL/TLS, common attacks",
            questions: 20,
            difficulty: "Medium",
            icon: Shield,
          },
        ],
      },
      {
        id: "oops",
        title: "Object-Oriented Programming",
        description: "Master OOP concepts, design patterns, SOLID principles, and best practices",
        duration: "5 hours",
        lessons: 16,
        level: "Beginner",
        rating: 4.8,
        students: 6200,
        topics: ["Encapsulation", "Inheritance", "Polymorphism", "SOLID"],
        icon: Layers,
        interviewCategories: [
          {
            id: "oop-basics",
            title: "OOP Fundamentals",
            description: "Classes, objects, encapsulation, abstraction",
            questions: 25,
            difficulty: "Easy",
            icon: Layers,
          },
          {
            id: "inheritance-polymorphism",
            title: "Inheritance & Polymorphism",
            description: "Types of inheritance, method overriding/overloading",
            questions: 30,
            difficulty: "Medium",
            icon: GitBranch,
          },
          {
            id: "design-patterns",
            title: "Design Patterns",
            description: "Singleton, Factory, Observer, Strategy patterns",
            questions: 35,
            difficulty: "Hard",
            icon: Brain,
          },
          {
            id: "solid-principles",
            title: "SOLID Principles",
            description: "Single responsibility, Open-closed, Liskov, etc.",
            questions: 20,
            difficulty: "Medium",
            icon: Award,
          },
        ],
      },
    ],
  },
  {
    id: "technical",
    title: "Technical Interview",
    description: "Hands-on coding challenges, system design, and real-world problem solving",
    icon: Code,
    color: "from-orange-500 to-rose-500",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80",
    courses: [
      {
        id: "coding",
        title: "Coding Interview Prep",
        description: "Practice LeetCode-style problems, optimize solutions, and improve problem-solving speed",
        duration: "15 hours",
        lessons: 50,
        level: "Intermediate",
        rating: 4.9,
        students: 12000,
        topics: ["Problem Solving", "Optimization", "Edge Cases"],
        icon: Code,
        interviewCategories: [
          {
            id: "easy-problems",
            title: "Easy Level Problems",
            description: "Warm-up problems and basic algorithms",
            questions: 50,
            difficulty: "Easy",
            icon: Play,
          },
          {
            id: "medium-problems",
            title: "Medium Level Problems",
            description: "Common interview patterns and techniques",
            questions: 80,
            difficulty: "Medium",
            icon: Code,
          },
          {
            id: "hard-problems",
            title: "Hard Level Problems",
            description: "Complex algorithms and optimization",
            questions: 40,
            difficulty: "Hard",
            icon: Brain,
          },
          {
            id: "mock-interviews",
            title: "Mock Coding Interviews",
            description: "Timed practice sessions simulating real interviews",
            questions: 25,
            difficulty: "Medium",
            icon: Clock,
          },
        ],
      },
      {
        id: "systemdesign",
        title: "System Design",
        description: "Design scalable systems, microservices, distributed systems, and cloud architecture",
        duration: "10 hours",
        lessons: 30,
        level: "Advanced",
        rating: 4.8,
        students: 7500,
        topics: ["Scalability", "Microservices", "Load Balancing"],
        icon: GitBranch,
        interviewCategories: [
          {
            id: "hld-basics",
            title: "High-Level Design Basics",
            description: "System components, APIs, databases",
            questions: 20,
            difficulty: "Medium",
            icon: Layers,
          },
          {
            id: "scalability",
            title: "Scalability & Performance",
            description: "Horizontal/vertical scaling, caching, CDN",
            questions: 25,
            difficulty: "Hard",
            icon: TrendingUp,
          },
          {
            id: "distributed-systems",
            title: "Distributed Systems",
            description: "CAP theorem, consistency, availability",
            questions: 30,
            difficulty: "Hard",
            icon: Globe,
          },
          {
            id: "real-world-systems",
            title: "Real-World System Designs",
            description: "Design Twitter, Uber, Netflix, etc.",
            questions: 15,
            difficulty: "Hard",
            icon: Server,
          },
          {
            id: "microservices",
            title: "Microservices Architecture",
            description: "Service communication, event-driven design",
            questions: 20,
            difficulty: "Hard",
            icon: GitBranch,
          },
        ],
      },
      {
        id: "webdev",
        title: "Web Development Interview",
        description: "Frontend, backend, APIs, frameworks, and modern web technologies",
        duration: "8 hours",
        lessons: 28,
        level: "Intermediate",
        rating: 4.7,
        students: 5800,
        topics: ["React", "Node.js", "APIs", "TypeScript"],
        icon: Globe,
        interviewCategories: [
          {
            id: "html-css",
            title: "HTML & CSS",
            description: "Semantic HTML, CSS layouts, responsive design",
            questions: 25,
            difficulty: "Easy",
            icon: Globe,
          },
          {
            id: "javascript",
            title: "JavaScript Fundamentals",
            description: "ES6+, closures, promises, event loop",
            questions: 40,
            difficulty: "Medium",
            icon: Code,
          },
          {
            id: "react-framework",
            title: "React & Frameworks",
            description: "Components, hooks, state management, Next.js",
            questions: 35,
            difficulty: "Medium",
            icon: Layers,
          },
          {
            id: "backend-nodejs",
            title: "Backend & Node.js",
            description: "Express, REST APIs, authentication",
            questions: 30,
            difficulty: "Medium",
            icon: Server,
          },
          {
            id: "web-performance",
            title: "Web Performance",
            description: "Optimization, Core Web Vitals, lazy loading",
            questions: 20,
            difficulty: "Hard",
            icon: Zap,
          },
        ],
      },
      {
        id: "security",
        title: "Security & Best Practices",
        description: "Web security, authentication, authorization, and secure coding practices",
        duration: "4 hours",
        lessons: 14,
        level: "Intermediate",
        rating: 4.6,
        students: 2900,
        topics: ["Authentication", "OWASP", "Encryption"],
        icon: Shield,
        interviewCategories: [
          {
            id: "owasp-top10",
            title: "OWASP Top 10",
            description: "Common vulnerabilities and prevention",
            questions: 25,
            difficulty: "Medium",
            icon: Shield,
          },
          {
            id: "authentication",
            title: "Authentication & Authorization",
            description: "OAuth, JWT, session management",
            questions: 20,
            difficulty: "Medium",
            icon: Award,
          },
          {
            id: "encryption",
            title: "Encryption & Cryptography",
            description: "Symmetric, asymmetric encryption, hashing",
            questions: 18,
            difficulty: "Hard",
            icon: Shield,
          },
          {
            id: "secure-coding",
            title: "Secure Coding Practices",
            description: "Input validation, SQL injection prevention",
            questions: 22,
            difficulty: "Medium",
            icon: Code,
          },
        ],
      },
      {
        id: "ai",
        title: "AI & Machine Learning",
        description: "ML algorithms, neural networks, NLP, and AI interview preparation",
        duration: "9 hours",
        lessons: 26,
        level: "Advanced",
        rating: 4.8,
        students: 4100,
        topics: ["ML Basics", "Neural Networks", "NLP", "Deep Learning"],
        icon: Brain,
        interviewCategories: [
          {
            id: "ml-fundamentals",
            title: "ML Fundamentals",
            description: "Supervised, unsupervised learning, regression, classification",
            questions: 30,
            difficulty: "Medium",
            icon: Brain,
          },
          {
            id: "neural-networks",
            title: "Neural Networks",
            description: "Perceptrons, backpropagation, activation functions",
            questions: 25,
            difficulty: "Hard",
            icon: GitBranch,
          },
          {
            id: "deep-learning",
            title: "Deep Learning",
            description: "CNN, RNN, LSTM, transformers",
            questions: 30,
            difficulty: "Hard",
            icon: Layers,
          },
          {
            id: "nlp",
            title: "Natural Language Processing",
            description: "Text processing, embeddings, language models",
            questions: 20,
            difficulty: "Hard",
            icon: MessageSquare,
          },
          {
            id: "ml-system-design",
            title: "ML System Design",
            description: "Building production ML pipelines",
            questions: 15,
            difficulty: "Hard",
            icon: Server,
          },
        ],
      },
    ],
  },
];

export default function CoursesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [hoveredCourse, setHoveredCourse] = useState<string | null>(null);

  const selectedCategoryData = mainCategories.find(
    (cat) => cat.id === selectedCategory
  );

  const selectedCourseData = selectedCategoryData?.courses.find(
    (course) => course.id === selectedCourse
  );

  const handleBackToCategories = () => {
    setSelectedCourse(null);
  };

  const handleBackToMain = () => {
    setSelectedCategory(null);
    setSelectedCourse(null);
  };

  return (
    <div className="min-h-screen">
      <AnimatedBackground />
      <Navbar />

      <main className="pt-28 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Interview Preparation <span className="text-gradient">Courses</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Choose from our comprehensive course categories to master your interview skills.
              Each course is designed by industry experts with real interview experience.
            </p>
          </motion.div>

          {/* Breadcrumb Navigation */}
          {(selectedCategory || selectedCourse) && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-8"
            >
              <div className="flex items-center gap-2 text-sm">
                <button
                  onClick={handleBackToMain}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  All Categories
                </button>
                {selectedCategory && (
                  <>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    <button
                      onClick={handleBackToCategories}
                      className={`${
                        selectedCourse
                          ? "text-muted-foreground hover:text-primary"
                          : "text-primary font-medium"
                      } transition-colors`}
                    >
                      {selectedCategoryData?.title}
                    </button>
                  </>
                )}
                {selectedCourse && (
                  <>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    <span className="text-primary font-medium">
                      {selectedCourseData?.title}
                    </span>
                  </>
                )}
              </div>
            </motion.div>
          )}

          {/* Main Categories View */}
          <AnimatePresence mode="wait">
            {!selectedCategory && (
              <motion.div
                key="main-categories"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                  {mainCategories.map((category, index) => {
                    const Icon = category.icon;
                    return (
                      <motion.div
                        key={category.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <GlassCard
                          className="h-full cursor-pointer relative overflow-hidden group"
                          onClick={() => setSelectedCategory(category.id)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {/* Background Image */}
                          <div className="absolute inset-0 z-0">
                            <Image
                              src={category.image}
                              alt={category.title}
                              fill
                              className="object-cover opacity-20 group-hover:opacity-30 transition-opacity"
                            />
                            <div
                              className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-20 group-hover:opacity-30 transition-opacity`}
                            />
                          </div>

                          <div className="relative z-10">
                            {/* Icon & Badge */}
                            <div className="flex items-start justify-between mb-4">
                              <div
                                className={`p-4 rounded-2xl bg-gradient-to-br ${category.color} group-hover:shadow-lg transition-shadow`}
                              >
                                <Icon className="h-8 w-8 text-white" />
                              </div>
                              <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/20 text-primary">
                                {category.courses.length} Courses
                              </span>
                            </div>

                            {/* Content */}
                            <h2 className="text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                              {category.title}
                            </h2>
                            <p className="text-muted-foreground mb-4 leading-relaxed">
                              {category.description}
                            </p>

                            {/* Stats */}
                            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                              <div className="flex items-center gap-1">
                                <BookOpen className="h-4 w-4" />
                                <span>
                                  {category.courses.reduce(
                                    (acc, c) => acc + c.lessons,
                                    0
                                  )}{" "}
                                  Lessons
                                </span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Users className="h-4 w-4" />
                                <span>
                                  {(
                                    category.courses.reduce(
                                      (acc, c) => acc + c.students,
                                      0
                                    ) / 1000
                                  ).toFixed(1)}
                                  K Students
                                </span>
                              </div>
                            </div>

                            {/* Action */}
                            <div className="flex items-center justify-between pt-4 border-t border-border">
                              <span className="text-sm font-medium text-primary">
                                Explore Courses
                              </span>
                              <ArrowRight className="h-5 w-5 text-primary group-hover:translate-x-1 transition-transform" />
                            </div>
                          </div>
                        </GlassCard>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Info Card */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-8"
                >
                  <GlassCard className="max-w-md mx-auto">
                    <div className="p-4 rounded-full bg-primary/20 w-fit mx-auto mb-4">
                      <CheckCircle className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      Select a Category
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Click on any category above to explore our comprehensive courses
                      and start your interview preparation journey.
                    </p>
                  </GlassCard>
                </motion.div>
              </motion.div>
            )}

            {/* Courses View */}
            {selectedCategoryData && !selectedCourse && (
              <motion.div
                key="courses-view"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="flex items-center gap-4 mb-8">
                  <button
                    onClick={handleBackToMain}
                    className="p-2 rounded-xl hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </button>
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">
                      {selectedCategoryData.title}
                    </h2>
                    <p className="text-muted-foreground">
                      Select a course to view interview topics
                    </p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {selectedCategoryData.courses.map((course, index) => {
                    const CourseIcon = course.icon;
                    const isHovered = hoveredCourse === course.id;
                    return (
                      <motion.div
                        key={course.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onMouseEnter={() => setHoveredCourse(course.id)}
                        onMouseLeave={() => setHoveredCourse(null)}
                      >
                        <GlassCard
                          className="h-full cursor-pointer group relative overflow-hidden"
                          onClick={() => setSelectedCourse(course.id)}
                          whileHover={{ scale: 1.02, y: -5 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {/* Course Icon */}
                          <div
                            className={`p-3 rounded-xl bg-gradient-to-br ${selectedCategoryData.color} w-fit mb-4 group-hover:shadow-lg transition-shadow`}
                          >
                            <CourseIcon className="h-6 w-6 text-white" />
                          </div>

                          {/* Course Info */}
                          <h4 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                            {course.title}
                          </h4>
                          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                            {course.description}
                          </p>

                          {/* Topics */}
                          <div className="flex flex-wrap gap-2 mb-4">
                            {course.topics.map((topic) => (
                              <span
                                key={topic}
                                className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary"
                              >
                                {topic}
                              </span>
                            ))}
                          </div>

                          {/* Interview Categories Preview */}
                          <div className="text-xs text-muted-foreground mb-4">
                            <span className="font-medium text-primary">
                              {course.interviewCategories.length} Interview Topics
                            </span>
                            {" • "}
                            {course.interviewCategories.reduce((acc, cat) => acc + cat.questions, 0)} Questions
                          </div>

                          {/* Meta Info */}
                          <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground mb-4">
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              <span>{course.duration}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <BookOpen className="h-3 w-3" />
                              <span>{course.lessons} lessons</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 text-yellow-500" />
                              <span>{course.rating}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              <span>{course.students.toLocaleString()}</span>
                            </div>
                          </div>

                          {/* Level Badge */}
                          <div className="flex items-center justify-between pt-4 border-t border-border">
                            <span
                              className={`px-2 py-1 text-xs rounded-full ${
                                course.level === "Beginner"
                                  ? "bg-green-500/20 text-green-400"
                                  : course.level === "Intermediate"
                                  ? "bg-yellow-500/20 text-yellow-400"
                                  : "bg-red-500/20 text-red-400"
                              }`}
                            >
                              {course.level}
                            </span>
                            <motion.div
                              animate={{ x: isHovered ? 5 : 0 }}
                              className="flex items-center text-sm text-primary"
                            >
                              View Topics <ArrowRight className="h-4 w-4 ml-1" />
                            </motion.div>
                          </div>
                        </GlassCard>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Interview Categories View (within a course) */}
            {selectedCourseData && (
              <motion.div
                key="interview-categories-view"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="flex items-center gap-4 mb-8">
                  <button
                    onClick={handleBackToCategories}
                    className="p-2 rounded-xl hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </button>
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">
                      {selectedCourseData.title}
                    </h2>
                    <p className="text-muted-foreground">
                      Select an interview topic to start practicing
                    </p>
                  </div>
                </div>

                {/* Course Overview Card */}
                <GlassCard className="mb-8">
                  <div className="flex flex-col sm:flex-row gap-6">
                    <div
                      className={`p-4 rounded-xl bg-gradient-to-br ${selectedCategoryData?.color} w-fit h-fit`}
                    >
                      <selectedCourseData.icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        {selectedCourseData.description}
                      </p>
                      <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-primary" />
                          <span>{selectedCourseData.duration}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <BookOpen className="h-4 w-4 text-primary" />
                          <span>{selectedCourseData.lessons} Lessons</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span>{selectedCourseData.rating} Rating</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-primary" />
                          <span>{selectedCourseData.students.toLocaleString()} Students</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </GlassCard>

                {/* Interview Topics Grid */}
                <h3 className="text-xl font-semibold text-foreground mb-6">
                  Interview Topics
                </h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {selectedCourseData.interviewCategories.map((topic, index) => {
                    const TopicIcon = topic.icon;
                    return (
                      <motion.div
                        key={topic.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Link
                          href={`/interview/difficulty?topic=${topic.id}&course=${selectedCourseData.id}&category=${selectedCategory}`}
                        >
                          <GlassCard
                            className="h-full cursor-pointer group"
                            whileHover={{ scale: 1.02, y: -5 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <div className="flex items-start justify-between mb-4">
                              <div
                                className={`p-3 rounded-xl bg-gradient-to-br ${selectedCategoryData?.color} group-hover:shadow-lg transition-shadow`}
                              >
                                <TopicIcon className="h-5 w-5 text-white" />
                              </div>
                              <span
                                className={`px-2 py-1 text-xs rounded-full ${
                                  topic.difficulty === "Easy"
                                    ? "bg-green-500/20 text-green-400"
                                    : topic.difficulty === "Medium"
                                    ? "bg-yellow-500/20 text-yellow-400"
                                    : "bg-red-500/20 text-red-400"
                                }`}
                              >
                                {topic.difficulty}
                              </span>
                            </div>

                            <h4 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                              {topic.title}
                            </h4>
                            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                              {topic.description}
                            </p>

                            <div className="flex items-center justify-between pt-4 border-t border-border">
                              <span className="text-sm text-muted-foreground">
                                {topic.questions} Questions
                              </span>
                              <div className="flex items-center text-sm text-primary group-hover:translate-x-1 transition-transform">
                                Start Practice <Play className="h-4 w-4 ml-1" />
                              </div>
                            </div>
                          </GlassCard>
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
