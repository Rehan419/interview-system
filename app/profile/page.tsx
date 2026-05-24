"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Camera,
  Edit3,
  Save,
  X,
  Award,
  TrendingUp,
  Target,
  Calendar,
  Code,
  MessageSquare,
  Briefcase,
} from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Sidebar } from "@/components/layout/sidebar";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { GlassCard } from "@/components/ui/glass-card";
import { GradientButton } from "@/components/ui/gradient-button";
import { ProgressCircle } from "@/components/ui/progress-circle";
import { useAuth } from "@/context/AuthContext";
import { useInterview } from "@/context/InterviewContext";

const skills = [
  { name: "JavaScript/TypeScript", level: 85 },
  { name: "React & Frontend", level: 90 },
  { name: "Node.js & Backend", level: 75 },
  { name: "System Design", level: 70 },
  { name: "Data Structures", level: 80 },
  { name: "Communication", level: 85 },
];

const badges = [
  { name: "First Interview", icon: Award, earned: true },
  { name: "10 Interviews", icon: Target, earned: true },
  { name: "High Scorer", icon: TrendingUp, earned: true },
  { name: "Code Master", icon: Code, earned: false },
  { name: "Communicator", icon: MessageSquare, earned: true },
  { name: "Professional", icon: Briefcase, earned: false },
];

export default function ProfilePage() {
  const { user } = useAuth();
  const { interviewHistory } = useInterview();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "John Doe",
    email: user?.email || "john@example.com",
    title: "Software Engineer",
    company: "Tech Company",
    location: "San Francisco, CA",
    bio: "Passionate software engineer with 5+ years of experience in building scalable web applications.",
  });

  const totalInterviews = interviewHistory.length;
  const averageScore = totalInterviews > 0
    ? Math.round(interviewHistory.reduce((acc, i) => acc + i.scores.overall, 0) / totalInterviews)
    : 0;

  const handleSave = () => {
    setIsEditing(false);
    // Save logic would go here
  };

  return (
    <div className="min-h-screen">
      <AnimatedBackground />
      <Navbar />

      <div className="pt-28 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-6">
            <Sidebar />

            <main className="flex-1 space-y-6">
              {/* Profile Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <GlassCard className="relative overflow-hidden">
                  {/* Cover gradient */}
                  <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-r from-primary via-secondary to-primary opacity-20" />
                  
                  <div className="relative pt-20 pb-6 px-6">
                    <div className="flex flex-col sm:flex-row sm:items-end gap-6">
                      {/* Avatar */}
                      <div className="relative -mt-16 sm:-mt-20">
                        <div className="h-28 w-28 sm:h-36 sm:w-36 rounded-full bg-gradient-to-br from-primary to-secondary p-1">
                          <div className="h-full w-full rounded-full bg-background flex items-center justify-center">
                            <span className="text-4xl sm:text-5xl font-bold text-gradient">
                              {formData.name.charAt(0)}
                            </span>
                          </div>
                        </div>
                        <button className="absolute bottom-2 right-2 p-2 rounded-full bg-primary text-primary-foreground hover:opacity-90 transition-opacity">
                          <Camera className="h-4 w-4" />
                        </button>
                      </div>

                      {/* Info */}
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div>
                            <h1 className="text-2xl font-bold text-foreground">{formData.name}</h1>
                            <p className="text-muted-foreground">{formData.title} at {formData.company}</p>
                            <p className="text-sm text-muted-foreground mt-1">{formData.location}</p>
                          </div>
                          <GradientButton
                            variant={isEditing ? "primary" : "outline"}
                            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                          >
                            {isEditing ? (
                              <>
                                <Save className="h-4 w-4" />
                                Save Changes
                              </>
                            ) : (
                              <>
                                <Edit3 className="h-4 w-4" />
                                Edit Profile
                              </>
                            )}
                          </GradientButton>
                        </div>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>

              <div className="grid lg:grid-cols-3 gap-6">
                {/* Left Column */}
                <div className="lg:col-span-2 space-y-6">
                  {/* About / Edit Form */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <GlassCard>
                      <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-semibold text-foreground">About</h2>
                        {isEditing && (
                          <button
                            onClick={() => setIsEditing(false)}
                            className="p-1 hover:bg-muted rounded-lg transition-colors"
                          >
                            <X className="h-5 w-5 text-muted-foreground" />
                          </button>
                        )}
                      </div>

                      {isEditing ? (
                        <div className="space-y-4">
                          <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-foreground mb-2">
                                Full Name
                              </label>
                              <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <input
                                  type="text"
                                  value={formData.name}
                                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-input border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-foreground"
                                />
                              </div>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-foreground mb-2">
                                Email
                              </label>
                              <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <input
                                  type="email"
                                  value={formData.email}
                                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-input border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-foreground"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-foreground mb-2">
                                Job Title
                              </label>
                              <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="w-full px-4 py-2.5 rounded-xl bg-input border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-foreground"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-foreground mb-2">
                                Company
                              </label>
                              <input
                                type="text"
                                value={formData.company}
                                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                className="w-full px-4 py-2.5 rounded-xl bg-input border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-foreground"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                              Bio
                            </label>
                            <textarea
                              value={formData.bio}
                              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                              rows={3}
                              className="w-full px-4 py-2.5 rounded-xl bg-input border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-foreground resize-none"
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <p className="text-muted-foreground">{formData.bio}</p>
                          <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t border-border">
                            <div className="flex items-center gap-3">
                              <Mail className="h-5 w-5 text-muted-foreground" />
                              <span className="text-foreground">{formData.email}</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <Calendar className="h-5 w-5 text-muted-foreground" />
                              <span className="text-foreground">Member since Jan 2024</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </GlassCard>
                  </motion.div>

                  {/* Skills */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <GlassCard>
                      <h2 className="text-lg font-semibold text-foreground mb-6">Skills Progress</h2>
                      <div className="space-y-5">
                        {skills.map((skill, index) => (
                          <div key={skill.name}>
                            <div className="flex justify-between text-sm mb-2">
                              <span className="text-foreground">{skill.name}</span>
                              <span className="font-medium text-primary">{skill.level}%</span>
                            </div>
                            <div className="h-2.5 rounded-full bg-muted overflow-hidden">
                              <motion.div
                                className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                                initial={{ width: 0 }}
                                animate={{ width: `${skill.level}%` }}
                                transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </GlassCard>
                  </motion.div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* Quick Stats */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                  >
                    <GlassCard className="text-center">
                      <h2 className="text-lg font-semibold text-foreground mb-6">Performance</h2>
                      <ProgressCircle value={averageScore || 85} size={140} label="Average Score" />
                      <div className="grid grid-cols-2 gap-4 mt-6">
                        <div className="p-3 rounded-xl bg-primary/5">
                          <p className="text-2xl font-bold text-primary">{totalInterviews || 24}</p>
                          <p className="text-xs text-muted-foreground">Interviews</p>
                        </div>
                        <div className="p-3 rounded-xl bg-secondary/5">
                          <p className="text-2xl font-bold text-secondary">12.5h</p>
                          <p className="text-xs text-muted-foreground">Practice Time</p>
                        </div>
                      </div>
                    </GlassCard>
                  </motion.div>

                  {/* Badges */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                  >
                    <GlassCard>
                      <h2 className="text-lg font-semibold text-foreground mb-4">Badges</h2>
                      <div className="grid grid-cols-3 gap-3">
                        {badges.map((badge, index) => {
                          const Icon = badge.icon;
                          return (
                            <motion.div
                              key={badge.name}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.3 + index * 0.05 }}
                              className={`flex flex-col items-center p-3 rounded-xl transition-colors ${
                                badge.earned
                                  ? "bg-primary/10"
                                  : "bg-muted/50 opacity-50"
                              }`}
                            >
                              <div className={`p-2 rounded-lg ${
                                badge.earned
                                  ? "bg-gradient-to-br from-primary to-secondary"
                                  : "bg-muted"
                              }`}>
                                <Icon className={`h-5 w-5 ${
                                  badge.earned ? "text-white" : "text-muted-foreground"
                                }`} />
                              </div>
                              <span className="text-xs text-center mt-2 text-foreground">{badge.name}</span>
                            </motion.div>
                          );
                        })}
                      </div>
                    </GlassCard>
                  </motion.div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
