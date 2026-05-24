"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Zap, Target, Flame, ArrowLeft, Clock, HelpCircle, Star } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { GlassCard } from "@/components/ui/glass-card";
import { useInterview, type Difficulty } from "@/context/InterviewContext";

const difficulties = [
  {
    id: "beginner" as Difficulty,
    title: "Beginner",
    subtitle: "Just starting out",
    description: "Perfect for those new to interviews or refreshing basics. Foundational questions with helpful hints.",
    icon: Zap,
    color: "from-green-500 to-emerald-500",
    duration: "15-20 min",
    questions: "5 questions",
    features: ["Basic concepts", "Guided hints", "Encouraging feedback"],
    recommended: false,
  },
  {
    id: "intermediate" as Difficulty,
    title: "Intermediate",
    subtitle: "Building experience",
    description: "For candidates with some experience. Balanced mix of concepts with moderate complexity.",
    icon: Target,
    color: "from-blue-500 to-cyan-500",
    duration: "25-30 min",
    questions: "8 questions",
    features: ["Mixed difficulty", "Real scenarios", "Detailed feedback"],
    recommended: true,
  },
  {
    id: "advanced" as Difficulty,
    title: "Advanced",
    subtitle: "Expert level",
    description: "Challenging questions for experienced professionals. System design and complex problem-solving.",
    icon: Flame,
    color: "from-orange-500 to-red-500",
    duration: "40-45 min",
    questions: "10 questions",
    features: ["Complex problems", "Time pressure", "In-depth analysis"],
    recommended: false,
  },
];

export default function DifficultySelectionPage() {
  const router = useRouter();
  const { setup, updateSetup } = useInterview();

  const handleSelectDifficulty = (difficultyId: Difficulty) => {
    updateSetup({ difficulty: difficultyId });
    router.push("/interview/setup");
  };

  return (
    <div className="min-h-screen">
      <AnimatedBackground />
      <Navbar />

      <main className="pt-28 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Back button */}
          <Link
            href="/interview/category"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Categories
          </Link>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <span className="text-sm text-primary capitalize">
                {setup.category?.replace("-", " ") || "Interview"} Selected
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Select <span className="text-gradient">Difficulty Level</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose a difficulty that matches your experience level for the most effective practice.
            </p>
          </motion.div>

          {/* Difficulty Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {difficulties.map((difficulty, index) => {
              const Icon = difficulty.icon;
              return (
                <motion.div
                  key={difficulty.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  {difficulty.recommended && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute -top-3 left-1/2 -translate-x-1/2 z-10"
                    >
                      <span className="px-3 py-1 rounded-full bg-gradient-to-r from-primary to-secondary text-primary-foreground text-xs font-medium flex items-center gap-1">
                        <Star className="h-3 w-3" /> Recommended
                      </span>
                    </motion.div>
                  )}
                  
                  <GlassCard
                    className={`h-full cursor-pointer group relative overflow-hidden ${
                      difficulty.recommended ? "ring-2 ring-primary" : ""
                    }`}
                    onClick={() => handleSelectDifficulty(difficulty.id)}
                    whileHover={{ scale: 1.02, y: -5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Background gradient */}
                    <div
                      className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity bg-gradient-to-br ${difficulty.color}`}
                    />

                    <div className="relative z-10 text-center">
                      {/* Icon */}
                      <div
                        className={`p-4 rounded-2xl bg-gradient-to-br ${difficulty.color} w-fit mx-auto mb-4 group-hover:glow transition-shadow`}
                      >
                        <Icon className="h-8 w-8 text-white" />
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-foreground mb-1">
                        {difficulty.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {difficulty.subtitle}
                      </p>

                      {/* Description */}
                      <p className="text-sm text-muted-foreground mb-6">
                        {difficulty.description}
                      </p>

                      {/* Stats */}
                      <div className="flex justify-center gap-4 mb-6">
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          {difficulty.duration}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <HelpCircle className="h-4 w-4" />
                          {difficulty.questions}
                        </div>
                      </div>

                      {/* Features */}
                      <div className="space-y-2">
                        {difficulty.features.map((feature) => (
                          <div
                            key={feature}
                            className="flex items-center justify-center gap-2 text-sm text-foreground"
                          >
                            <div className={`h-1.5 w-1.5 rounded-full bg-gradient-to-r ${difficulty.color}`} />
                            {feature}
                          </div>
                        ))}
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
