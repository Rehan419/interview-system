"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import {
  Code,
  Server,
  Layers,
  Cloud,
  Database,
  Smartphone,
  GitBranch,
  Users,
  ArrowRight,
  ArrowLeft,
  Brain,
  Shield,
  Globe,
  MessageSquare,
  CheckCircle,
} from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { GlassCard } from "@/components/ui/glass-card";
import { useInterview, type InterviewCategory } from "@/context/InterviewContext";

// Map course IDs to interview categories
const courseToCategory: Record<string, InterviewCategory> = {
  behavioral: "behavioral",
  communication: "communication",
  softskills: "behavioral",
  salary: "behavioral",
  dsa: "data-science",
  os: "system-design",
  dbms: "database",
  cn: "security",
  oops: "backend",
  coding: "frontend",
  systemdesign: "system-design",
  webdev: "web",
  security: "security",
  ai: "data-science",
};

const categories = [
  {
    id: "frontend" as InterviewCategory,
    title: "Frontend Development",
    description: "React, Vue, Angular, CSS, JavaScript, TypeScript, and modern UI frameworks.",
    icon: Code,
    color: "from-blue-500 to-cyan-500",
    topics: ["React", "CSS", "JavaScript", "TypeScript"],
  },
  {
    id: "backend" as InterviewCategory,
    title: "Backend Development",
    description: "Node.js, Python, Java, APIs, databases, and server-side architecture.",
    icon: Server,
    color: "from-emerald-500 to-teal-500",
    topics: ["Node.js", "APIs", "Databases", "Security"],
  },
  {
    id: "fullstack" as InterviewCategory,
    title: "Full Stack",
    description: "End-to-end development combining frontend and backend expertise.",
    icon: Layers,
    color: "from-indigo-500 to-blue-500",
    topics: ["Full Stack", "Architecture", "Integration"],
  },
  {
    id: "devops" as InterviewCategory,
    title: "DevOps & Cloud",
    description: "CI/CD, Docker, Kubernetes, AWS, Azure, and cloud infrastructure.",
    icon: Cloud,
    color: "from-orange-500 to-amber-500",
    topics: ["Docker", "Kubernetes", "CI/CD", "AWS"],
  },
  {
    id: "data-science" as InterviewCategory,
    title: "Data Science & ML",
    description: "Machine learning, statistics, Python, SQL, and data analysis.",
    icon: Brain,
    color: "from-violet-500 to-purple-500",
    topics: ["ML", "Python", "SQL", "Statistics"],
  },
  {
    id: "mobile" as InterviewCategory,
    title: "Mobile Development",
    description: "iOS, Android, React Native, Flutter, and cross-platform development.",
    icon: Smartphone,
    color: "from-teal-500 to-cyan-500",
    topics: ["React Native", "iOS", "Android", "Flutter"],
  },
  {
    id: "system-design" as InterviewCategory,
    title: "System Design",
    description: "Scalability, distributed systems, microservices, and architecture patterns.",
    icon: GitBranch,
    color: "from-rose-500 to-pink-500",
    topics: ["Scalability", "Architecture", "Distributed"],
  },
  {
    id: "behavioral" as InterviewCategory,
    title: "HR & Behavioral",
    description: "Leadership, teamwork, communication, and professional soft skills.",
    icon: Users,
    color: "from-amber-500 to-yellow-500",
    topics: ["Leadership", "Teamwork", "Communication"],
  },
  {
    id: "security" as InterviewCategory,
    title: "Security & Networking",
    description: "Cybersecurity, network protocols, encryption, and secure coding.",
    icon: Shield,
    color: "from-red-500 to-rose-500",
    topics: ["Security", "Networks", "Encryption", "OWASP"],
  },
  {
    id: "web" as InterviewCategory,
    title: "Web Technologies",
    description: "HTTP, REST APIs, GraphQL, WebSockets, and web standards.",
    icon: Globe,
    color: "from-sky-500 to-blue-500",
    topics: ["REST", "GraphQL", "HTTP", "WebSockets"],
  },
  {
    id: "database" as InterviewCategory,
    title: "Database & SQL",
    description: "SQL, NoSQL, database design, optimization, and transactions.",
    icon: Database,
    color: "from-green-500 to-emerald-500",
    topics: ["SQL", "NoSQL", "Design", "Optimization"],
  },
  {
    id: "communication" as InterviewCategory,
    title: "Communication Skills",
    description: "Professional communication, presentation, and interview techniques.",
    icon: MessageSquare,
    color: "from-pink-500 to-fuchsia-500",
    topics: ["Presentation", "Articulation", "Body Language"],
  },
];

function CategorySelectionContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { updateSetup } = useInterview();
  const categoryParam = searchParams.get("category");
  const fromCourses = searchParams.get("from") === "courses";

  // If coming from courses with a category, auto-select and proceed
  useEffect(() => {
    if (categoryParam && fromCourses) {
      const mappedCategory = courseToCategory[categoryParam] || categoryParam;
      if (categories.some((c) => c.id === mappedCategory)) {
        updateSetup({ category: mappedCategory as InterviewCategory });
        router.push("/interview/difficulty");
      }
    }
  }, [categoryParam, fromCourses, updateSetup, router]);

  const handleSelectCategory = (categoryId: InterviewCategory) => {
    updateSetup({ category: categoryId });
    router.push("/interview/difficulty");
  };

  // Highlight recommended category based on course selection
  const recommendedCategory = categoryParam
    ? courseToCategory[categoryParam]
    : null;

  return (
    <div className="min-h-screen">
      <AnimatedBackground />
      <Navbar />

      <main className="pt-28 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Back button */}
          <Link
            href={fromCourses ? "/courses" : "/dashboard"}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to {fromCourses ? "Courses" : "Dashboard"}
          </Link>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Choose Your <span className="text-gradient">Interview Category</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Select the type of interview you want to practice. Our AI will generate
              relevant questions based on your choice.
            </p>
          </motion.div>

          {/* Categories Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.map((category, index) => {
              const Icon = category.icon;
              const isRecommended = recommendedCategory === category.id;
              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                >
                  <GlassCard
                    className={`h-full cursor-pointer group relative overflow-hidden ${
                      isRecommended ? "ring-2 ring-primary" : ""
                    }`}
                    onClick={() => handleSelectCategory(category.id)}
                    whileHover={{ scale: 1.02, y: -5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Background gradient */}
                    <div
                      className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity bg-gradient-to-br ${category.color}`}
                    />

                    {/* Recommended badge */}
                    {isRecommended && (
                      <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                        <CheckCircle className="h-3 w-3" />
                        Recommended
                      </div>
                    )}

                    <div className="relative z-10">
                      {/* Icon */}
                      <div
                        className={`p-3 rounded-xl bg-gradient-to-br ${category.color} w-fit mb-4 group-hover:shadow-lg transition-shadow`}
                      >
                        <Icon className="h-6 w-6 text-white" />
                      </div>

                      {/* Content */}
                      <h3 className="text-lg font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
                        {category.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                        {category.description}
                      </p>

                      {/* Topics */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {category.topics.map((topic) => (
                          <span
                            key={topic}
                            className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>

                      {/* Action */}
                      <div className="flex items-center text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                        Select <ArrowRight className="h-4 w-4 ml-1" />
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}

export default function CategorySelectionPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <CategorySelectionContent />
    </Suspense>
  );
}
