"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Search,
  Filter,
  Calendar,
  Target,
  TrendingUp,
  ArrowUpDown,
  ChevronRight,
  History,
  Play,
} from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Sidebar } from "@/components/layout/sidebar";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { GlassCard } from "@/components/ui/glass-card";
import { GradientButton } from "@/components/ui/gradient-button";
import { useInterview, type InterviewCategory, type Difficulty } from "@/context/InterviewContext";

const categoryOptions: { value: InterviewCategory | "all"; label: string }[] = [
  { value: "all", label: "All Categories" },
  { value: "frontend", label: "Frontend" },
  { value: "backend", label: "Backend" },
  { value: "fullstack", label: "Full Stack" },
  { value: "devops", label: "DevOps" },
  { value: "data-science", label: "Data Science" },
  { value: "mobile", label: "Mobile" },
  { value: "system-design", label: "System Design" },
  { value: "behavioral", label: "Behavioral" },
];

const difficultyOptions: { value: Difficulty | "all"; label: string }[] = [
  { value: "all", label: "All Difficulties" },
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
];

export default function HistoryPage() {
  const { interviewHistory } = useInterview();
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<InterviewCategory | "all">("all");
  const [difficultyFilter, setDifficultyFilter] = useState<Difficulty | "all">("all");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest" | "highest" | "lowest">("newest");

  const filteredHistory = interviewHistory
    .filter((interview) => {
      if (categoryFilter !== "all" && interview.category !== categoryFilter) return false;
      if (difficultyFilter !== "all" && interview.difficulty !== difficultyFilter) return false;
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          interview.category.toLowerCase().includes(query) ||
          interview.difficulty.toLowerCase().includes(query)
        );
      }
      return true;
    })
    .sort((a, b) => {
      switch (sortOrder) {
        case "newest":
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case "oldest":
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case "highest":
          return b.scores.overall - a.scores.overall;
        case "lowest":
          return a.scores.overall - b.scores.overall;
        default:
          return 0;
      }
    });

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-500";
    if (score >= 75) return "text-primary";
    if (score >= 60) return "text-amber-500";
    return "text-destructive";
  };

  return (
    <div className="min-h-screen">
      <AnimatedBackground />
      <Navbar />

      <div className="pt-28 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-6">
            <Sidebar />

            <main className="flex-1">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8"
              >
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
                    Interview <span className="text-gradient">History</span>
                  </h1>
                  <p className="text-muted-foreground mt-1">
                    Review your past interviews and track your progress
                  </p>
                </div>
                <Link href="/interview/category">
                  <GradientButton>
                    <Play className="h-4 w-4" />
                    New Interview
                  </GradientButton>
                </Link>
              </motion.div>

              {/* Filters */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <GlassCard className="mb-6">
                  <div className="flex flex-col lg:flex-row gap-4">
                    {/* Search */}
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <input
                        type="text"
                        placeholder="Search interviews..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-input border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-foreground placeholder:text-muted-foreground"
                      />
                    </div>

                    {/* Filters */}
                    <div className="flex flex-wrap gap-3">
                      <div className="relative">
                        <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <select
                          value={categoryFilter}
                          onChange={(e) => setCategoryFilter(e.target.value as InterviewCategory | "all")}
                          className="pl-9 pr-4 py-2.5 rounded-xl bg-input border border-border focus:border-primary outline-none text-foreground appearance-none cursor-pointer min-w-[150px]"
                        >
                          {categoryOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <select
                        value={difficultyFilter}
                        onChange={(e) => setDifficultyFilter(e.target.value as Difficulty | "all")}
                        className="px-4 py-2.5 rounded-xl bg-input border border-border focus:border-primary outline-none text-foreground appearance-none cursor-pointer min-w-[150px]"
                      >
                        {difficultyOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>

                      <button
                        onClick={() => {
                          const orders: typeof sortOrder[] = ["newest", "oldest", "highest", "lowest"];
                          const currentIndex = orders.indexOf(sortOrder);
                          setSortOrder(orders[(currentIndex + 1) % orders.length]);
                        }}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-input border border-border hover:border-primary transition-colors text-foreground"
                      >
                        <ArrowUpDown className="h-4 w-4" />
                        <span className="text-sm capitalize">{sortOrder}</span>
                      </button>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>

              {/* Interview List */}
              {filteredHistory.length > 0 ? (
                <div className="space-y-4">
                  {filteredHistory.map((interview, index) => (
                    <motion.div
                      key={interview.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + index * 0.05 }}
                    >
                      <GlassCard className="group cursor-pointer hover:border-primary/50 transition-colors">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="flex items-start sm:items-center gap-4">
                            <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-secondary">
                              <Target className="h-6 w-6 text-white" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-foreground capitalize">
                                {interview.category.replace("-", " ")} Interview
                              </h3>
                              <div className="flex flex-wrap items-center gap-3 mt-1 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  {interview.date}
                                </span>
                                <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs capitalize">
                                  {interview.difficulty}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-6">
                            {/* Scores */}
                            <div className="hidden md:flex items-center gap-4 text-sm">
                              <div className="text-center">
                                <p className="text-muted-foreground">Communication</p>
                                <p className={`font-bold ${getScoreColor(interview.scores.communication)}`}>
                                  {interview.scores.communication}%
                                </p>
                              </div>
                              <div className="text-center">
                                <p className="text-muted-foreground">Technical</p>
                                <p className={`font-bold ${getScoreColor(interview.scores.technical)}`}>
                                  {interview.scores.technical}%
                                </p>
                              </div>
                              <div className="text-center">
                                <p className="text-muted-foreground">Confidence</p>
                                <p className={`font-bold ${getScoreColor(interview.scores.confidence)}`}>
                                  {interview.scores.confidence}%
                                </p>
                              </div>
                            </div>

                            {/* Overall Score */}
                            <div className="flex items-center gap-3">
                              <div className="text-right">
                                <p className="text-sm text-muted-foreground">Overall</p>
                                <p className={`text-2xl font-bold ${getScoreColor(interview.scores.overall)}`}>
                                  {interview.scores.overall}%
                                </p>
                              </div>
                              <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                            </div>
                          </div>
                        </div>
                      </GlassCard>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <GlassCard className="text-center py-16">
                    <History className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-foreground mb-2">No Interviews Found</h3>
                    <p className="text-muted-foreground mb-6">
                      {searchQuery || categoryFilter !== "all" || difficultyFilter !== "all"
                        ? "Try adjusting your filters to see more results."
                        : "Start practicing to build your interview history."}
                    </p>
                    <Link href="/interview/category">
                      <GradientButton>
                        <Play className="h-4 w-4" />
                        Start Your First Interview
                      </GradientButton>
                    </Link>
                  </GlassCard>
                </motion.div>
              )}

              {/* Stats Summary */}
              {interviewHistory.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-8"
                >
                  <GlassCard>
                    <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-primary" />
                      Quick Stats
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      <div className="text-center p-4 rounded-xl bg-primary/5">
                        <p className="text-3xl font-bold text-primary">{interviewHistory.length}</p>
                        <p className="text-sm text-muted-foreground">Total Interviews</p>
                      </div>
                      <div className="text-center p-4 rounded-xl bg-green-500/5">
                        <p className="text-3xl font-bold text-green-500">
                          {Math.round(
                            interviewHistory.reduce((acc, i) => acc + i.scores.overall, 0) /
                              interviewHistory.length
                          )}%
                        </p>
                        <p className="text-sm text-muted-foreground">Average Score</p>
                      </div>
                      <div className="text-center p-4 rounded-xl bg-secondary/5">
                        <p className="text-3xl font-bold text-secondary">
                          {Math.max(...interviewHistory.map((i) => i.scores.overall))}%
                        </p>
                        <p className="text-sm text-muted-foreground">Best Score</p>
                      </div>
                      <div className="text-center p-4 rounded-xl bg-amber-500/5">
                        <p className="text-3xl font-bold text-amber-500">
                          {interviewHistory.filter((i) => i.scores.overall >= 80).length}
                        </p>
                        <p className="text-sm text-muted-foreground">High Scores</p>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              )}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
