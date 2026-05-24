"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Trophy,
  MessageSquare,
  Code,
  TrendingUp,
  Target,
  ArrowRight,
  Download,
  Share2,
  RotateCcw,
  CheckCircle,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { GlassCard } from "@/components/ui/glass-card";
import { GradientButton } from "@/components/ui/gradient-button";
import { ProgressCircle } from "@/components/ui/progress-circle";
import { useInterview } from "@/context/InterviewContext";

const scoreCategories = [
  { key: "communication", label: "Communication", icon: MessageSquare, color: "from-blue-500 to-cyan-500" },
  { key: "technical", label: "Technical", icon: Code, color: "from-purple-500 to-pink-500" },
  { key: "confidence", label: "Confidence", icon: TrendingUp, color: "from-amber-500 to-orange-500" },
] as const;

export default function ResultsPage() {
  const { interviewHistory, setup } = useInterview();

  // Get the most recent result
  const result = interviewHistory[0] || {
    scores: { communication: 85, technical: 78, confidence: 82, overall: 82 },
    feedback: [
      "Great explanation of technical concepts",
      "Consider using more specific examples",
      "Good problem-solving approach",
      "Work on time management for complex questions",
    ],
  };

  const overallScore = result.scores.overall;
  const scoreLevel = overallScore >= 90 ? "Excellent" : overallScore >= 75 ? "Good" : overallScore >= 60 ? "Fair" : "Needs Improvement";
  const scoreColor = overallScore >= 90 ? "text-green-500" : overallScore >= 75 ? "text-primary" : overallScore >= 60 ? "text-amber-500" : "text-destructive";

  return (
    <div className="min-h-screen">
      <AnimatedBackground />
      <Navbar />

      <main className="pt-28 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="inline-flex items-center justify-center p-4 rounded-full bg-gradient-to-br from-primary to-secondary mb-6"
            >
              <Trophy className="h-12 w-12 text-white" />
            </motion.div>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
              Interview <span className="text-gradient">Complete!</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Here&apos;s your performance breakdown and AI-powered feedback
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Overall Score */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-1"
            >
              <GlassCard className="text-center h-full" glow>
                <h3 className="text-lg font-semibold text-foreground mb-6">Overall Score</h3>
                <ProgressCircle value={overallScore} size={180} strokeWidth={12} />
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="mt-6"
                >
                  <span className={`text-xl font-bold ${scoreColor}`}>{scoreLevel}</span>
                  <p className="text-sm text-muted-foreground mt-1">
                    {overallScore >= 75
                      ? "Great job! You're well prepared."
                      : "Keep practicing to improve your skills."}
                  </p>
                </motion.div>
              </GlassCard>
            </motion.div>

            {/* Score Breakdown */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2"
            >
              <GlassCard className="h-full">
                <h3 className="text-lg font-semibold text-foreground mb-6">Score Breakdown</h3>
                <div className="grid gap-6">
                  {scoreCategories.map((category, index) => {
                    const Icon = category.icon;
                    const score = result.scores[category.key];
                    return (
                      <motion.div
                        key={category.key}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg bg-gradient-to-br ${category.color}`}>
                              <Icon className="h-4 w-4 text-white" />
                            </div>
                            <span className="font-medium text-foreground">{category.label}</span>
                          </div>
                          <span className="font-bold text-foreground">{score}%</span>
                        </div>
                        <div className="h-3 rounded-full bg-muted overflow-hidden">
                          <motion.div
                            className={`h-full rounded-full bg-gradient-to-r ${category.color}`}
                            initial={{ width: 0 }}
                            animate={{ width: `${score}%` }}
                            transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                          />
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Interview Details */}
                <div className="mt-8 pt-6 border-t border-border">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Target className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Category:</span>
                      <span className="text-foreground capitalize">{setup.category?.replace("-", " ") || "General"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Difficulty:</span>
                      <span className="text-foreground capitalize">{setup.difficulty || "Intermediate"}</span>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </div>

          {/* AI Feedback */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-6"
          >
            <GlassCard>
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold text-foreground">AI Feedback & Suggestions</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {result.feedback.map((item, index) => {
                  const isPositive = index < 2;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className={`p-4 rounded-xl border ${isPositive
                        ? "bg-green-500/5 border-green-500/20"
                        : "bg-amber-500/5 border-amber-500/20"
                        }`}
                    >
                      <div className="flex gap-3">
                        {isPositive ? (
                          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                        ) : (
                          <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0" />
                        )}
                        <span className="text-foreground">{item}</span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </GlassCard>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/interview/category">
              <GradientButton size="lg">
                <RotateCcw className="h-5 w-5" />
                Practice Again
              </GradientButton>
            </Link>

            <Link href="/dashboard">
              <GradientButton variant="outline" size="lg" glow={false}>
                <ArrowRight className="h-5 w-5" />
                Go to Dashboard
              </GradientButton>
            </Link>

            {/* Download Report */}
            <GradientButton
              onClick={() => window.print()}
              variant="outline"
              size="lg"
              glow={false}
              className="w-full sm:w-auto"
            >
              <Download className="h-5 w-5" />
              Download Report
            </GradientButton>

            {/* Share GitHub */}
            <GradientButton
              onClick={() => {
                const report = `My Interview Result: ${scoreLevel} (${overallScore}%)

Scores:
- Communication: ${result.scores.communication}%
- Technical: ${result.scores.technical}%
- Confidence: ${result.scores.confidence}%

Feedback:
${result.feedback.join("\n")}`;

                window.open(
                  `https://gist.github.com/?description=Interview%20Result&file=result.md&content=${encodeURIComponent(report)}`,
                  "_blank"
                );
              }}
              variant="outline"
              size="lg"
              glow={false}
              className="w-full sm:w-auto"
            >
              <Code className="h-5 w-5" />
              Share GitHub
            </GradientButton>

            {/* Share Email */}
            <GradientButton
              onClick={() => {
                const report = `My Interview Result: ${scoreLevel} (${overallScore}%)

Scores:
- Communication: ${result.scores.communication}%
- Technical: ${result.scores.technical}%
- Confidence: ${result.scores.confidence}%

Feedback:
${result.feedback.join("\n")}`;

                window.open(
                  `mailto:?subject=My Interview Results&body=${encodeURIComponent(report)}`,
                  "_blank"
                );
              }}
              variant="outline"
              size="lg"
              glow={false}
              className="w-full sm:w-auto"
            >
              <MessageSquare className="h-5 w-5" />
              Share Email
            </GradientButton>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
