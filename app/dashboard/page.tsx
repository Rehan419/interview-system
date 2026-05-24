"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Play,
  History,
  TrendingUp,
  Target,
  Calendar,
  Clock,
  Award,
  ArrowRight,
  Brain,
  Sparkles,
} from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Sidebar } from "@/components/layout/sidebar";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { GlassCard } from "@/components/ui/glass-card";
import { GradientButton } from "@/components/ui/gradient-button";
import { ProgressCircle } from "@/components/ui/progress-circle";
import { useAuth } from "@/context/AuthContext";
import { useInterview } from "@/context/InterviewContext";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const performanceData = [
  { date: "Mon", score: 72 },
  { date: "Tue", score: 78 },
  { date: "Wed", score: 75 },
  { date: "Thu", score: 82 },
  { date: "Fri", score: 85 },
  { date: "Sat", score: 88 },
  { date: "Sun", score: 90 },
];

const quickStats = [
  {
    label: "Total Interviews",
    value: "24",
    change: "+4 this week",
    icon: Play,
    color: "text-primary",
  },
  {
    label: "Average Score",
    value: "85%",
    change: "+5% improvement",
    icon: TrendingUp,
    color: "text-green-500",
  },
  {
    label: "Practice Hours",
    value: "12.5",
    change: "2.5 hrs this week",
    icon: Clock,
    color: "text-secondary",
  },
  {
    label: "Badges Earned",
    value: "8",
    change: "2 new badges",
    icon: Award,
    color: "text-amber-500",
  },
];

const aiRecommendations = [
  {
    title: "Practice System Design",
    description: "Your system design scores can be improved. Try a few sessions focused on this area.",
    icon: Brain,
    action: "Start Practice",
    href: "/interview/category",
  },
  {
    title: "Review Behavioral Questions",
    description: "Great progress on technical! Now focus on behavioral interview skills.",
    icon: Sparkles,
    action: "Review Tips",
    href: "/interview/category",
  },
];

export default function DashboardPage() {
  const { user } = useAuth();
  const { interviewHistory } = useInterview();

  const recentInterviews = interviewHistory.slice(0, 3);

  return (
    <div className="min-h-screen">
      <AnimatedBackground />
      <Navbar />

      <div className="pt-28 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-6">
            <Sidebar />

            <main className="flex-1 space-y-6">
              {/* Welcome Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
                    Welcome back, <span className="text-gradient">{user?.name || "User"}</span>
                  </h1>
                  <p className="text-muted-foreground mt-1">
                    Ready to ace your next interview? Let&apos;s practice!
                  </p>
                </div>
                <Link href="/interview/category">
                  <GradientButton size="lg">
                    <Play className="h-5 w-5" />
                    Start Interview
                  </GradientButton>
                </Link>
              </motion.div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {quickStats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <GlassCard className="relative overflow-hidden">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground">{stat.label}</p>
                            <p className="text-2xl sm:text-3xl font-bold mt-1 text-foreground">
                              {stat.value}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
                          </div>
                          <div className={`p-2 rounded-xl bg-primary/10 ${stat.color}`}>
                            <Icon className="h-5 w-5" />
                          </div>
                        </div>
                      </GlassCard>
                    </motion.div>
                  );
                })}
              </div>

              {/* Main Grid */}
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Performance Chart */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="lg:col-span-2"
                >
                  <GlassCard className="h-full">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">Performance Trend</h3>
                        <p className="text-sm text-muted-foreground">Your interview scores this week</p>
                      </div>
                      <select className="px-3 py-2 rounded-lg bg-input border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20">
                        <option>This Week</option>
                        <option>This Month</option>
                        <option>This Year</option>
                      </select>
                    </div>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={performanceData}>
                          <defs>
                            <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.3} />
                              <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <XAxis
                            dataKey="date"
                            stroke="var(--muted-foreground)"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                          />
                          <YAxis
                            stroke="var(--muted-foreground)"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            domain={[60, 100]}
                          />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "var(--card)",
                              border: "1px solid var(--border)",
                              borderRadius: "0.75rem",
                            }}
                            labelStyle={{ color: "var(--foreground)" }}
                          />
                          <Area
                            type="monotone"
                            dataKey="score"
                            stroke="var(--primary)"
                            strokeWidth={2}
                            fill="url(#scoreGradient)"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </GlassCard>
                </motion.div>

                {/* Skills Overview */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <GlassCard className="h-full">
                    <h3 className="text-lg font-semibold mb-6 text-foreground">Skills Overview</h3>
                    <div className="flex flex-col items-center gap-6">
                      <ProgressCircle value={85} size={140} label="Overall Score" />
                      <div className="w-full space-y-4">
                        {[
                          { label: "Technical", value: 88 },
                          { label: "Communication", value: 82 },
                          { label: "Problem Solving", value: 90 },
                        ].map((skill) => (
                          <div key={skill.label}>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-muted-foreground">{skill.label}</span>
                              <span className="font-medium text-foreground">{skill.value}%</span>
                            </div>
                            <div className="h-2 rounded-full bg-muted overflow-hidden">
                              <motion.div
                                className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                                initial={{ width: 0 }}
                                animate={{ width: `${skill.value}%` }}
                                transition={{ duration: 1, delay: 0.5 }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              </div>

              {/* Recent Interviews & AI Recommendations */}
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Recent Interviews */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <GlassCard>
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold text-foreground">Recent Interviews</h3>
                      <Link
                        href="/history"
                        className="text-sm text-primary hover:text-primary/80 flex items-center gap-1"
                      >
                        View All <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                    <div className="space-y-4">
                      {recentInterviews.length > 0 ? (
                        recentInterviews.map((interview, index) => (
                          <motion.div
                            key={interview.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 + index * 0.1 }}
                            className="flex items-center justify-between p-4 rounded-xl bg-primary/5 border border-border"
                          >
                            <div className="flex items-center gap-4">
                              <div className="p-2 rounded-lg bg-primary/10">
                                <Target className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <p className="font-medium capitalize text-foreground">
                                  {interview.category.replace("-", " ")} Interview
                                </p>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <Calendar className="h-3 w-3" />
                                  {interview.date}
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-primary">{interview.scores.overall}%</p>
                              <p className="text-xs text-muted-foreground capitalize">
                                {interview.difficulty}
                              </p>
                            </div>
                          </motion.div>
                        ))
                      ) : (
                        <div className="text-center py-8 text-muted-foreground">
                          <History className="h-12 w-12 mx-auto mb-2 opacity-50" />
                          <p>No interviews yet. Start practicing!</p>
                        </div>
                      )}
                    </div>
                  </GlassCard>
                </motion.div>

                {/* AI Recommendations */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <GlassCard>
                    <div className="flex items-center gap-2 mb-6">
                      <Sparkles className="h-5 w-5 text-primary" />
                      <h3 className="text-lg font-semibold text-foreground">AI Recommendations</h3>
                    </div>
                    <div className="space-y-4">
                      {aiRecommendations.map((rec, index) => {
                        const Icon = rec.icon;
                        return (
                          <motion.div
                            key={rec.title}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 + index * 0.1 }}
                            className="p-4 rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10 border border-border"
                          >
                            <div className="flex items-start gap-3">
                              <div className="p-2 rounded-lg bg-primary/20">
                                <Icon className="h-5 w-5 text-primary" />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-medium text-foreground">{rec.title}</h4>
                                <p className="text-sm text-muted-foreground mt-1">
                                  {rec.description}
                                </p>
                                <Link
                                  href={rec.href}
                                  className="inline-flex items-center gap-1 text-sm text-primary mt-2 hover:gap-2 transition-all"
                                >
                                  {rec.action} <ArrowRight className="h-3 w-3" />
                                </Link>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </GlassCard>
                </motion.div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
