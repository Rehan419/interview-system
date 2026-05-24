"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Camera,
  CameraOff,
  Mic,
  MicOff,
  Globe,
  Clock,
  ArrowLeft,
  Play,
  Settings,
  CheckCircle,
} from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { GlassCard } from "@/components/ui/glass-card";
import { GradientButton } from "@/components/ui/gradient-button";
import { AIAvatar } from "@/components/ui/ai-avatar";
import { useInterview } from "@/context/InterviewContext";

const languages = [
  { value: "English", label: "English" },
  { value: "Spanish", label: "Spanish" },
  { value: "French", label: "French" },
  { value: "German", label: "German" },
  { value: "Chinese", label: "Chinese" },
  { value: "Japanese", label: "Japanese" },
];

const durations = [
  { value: 15, label: "15 min", description: "Quick practice" },
  { value: 30, label: "30 min", description: "Standard session" },
  { value: 45, label: "45 min", description: "Full interview" },
  { value: 60, label: "60 min", description: "Deep dive" },
];

export default function InterviewSetupPage() {
  const router = useRouter();
  const { setup, updateSetup, startInterview } = useInterview();
  const [isLoading, setIsLoading] = useState(false);

  const handleStartInterview = async () => {
    if (!setup.category || !setup.difficulty) {
      alert("Incomplete data: Please select a category and difficulty first.");
      router.push("/interview/category");
      return;
    }
    setIsLoading(true);
    const success = await startInterview();
    if (success) {
      setTimeout(() => {
        router.push("/interview/live");
      }, 1000);
    } else {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <AnimatedBackground />
      <Navbar />

      <main className="pt-28 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Back button */}
          <Link
            href="/interview/difficulty"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Difficulty
          </Link>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm capitalize">
                {setup.category?.replace("-", " ")}
              </span>
              <span className="px-3 py-1 rounded-full bg-secondary/10 text-secondary text-sm capitalize">
                {setup.difficulty}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              <span className="text-gradient">Setup</span> Your Interview
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Configure your interview settings before starting the session.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Settings Panel */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <GlassCard className="space-y-8">
                <div className="flex items-center gap-2 pb-4 border-b border-border">
                  <Settings className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-semibold text-foreground">Interview Settings</h2>
                </div>

                {/* Camera & Mic Toggle */}
                <div className="grid grid-cols-2 gap-4">
                  <motion.button
                    onClick={() => updateSetup({ cameraEnabled: !setup.cameraEnabled })}
                    className={`p-4 rounded-xl border transition-all ${
                      setup.cameraEnabled
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/50"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex flex-col items-center gap-2">
                      {setup.cameraEnabled ? (
                        <Camera className="h-6 w-6 text-primary" />
                      ) : (
                        <CameraOff className="h-6 w-6 text-muted-foreground" />
                      )}
                      <span className={setup.cameraEnabled ? "text-primary" : "text-muted-foreground"}>
                        Camera {setup.cameraEnabled ? "On" : "Off"}
                      </span>
                    </div>
                  </motion.button>

                  <motion.button
                    onClick={() => updateSetup({ micEnabled: !setup.micEnabled })}
                    className={`p-4 rounded-xl border transition-all ${
                      setup.micEnabled
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/50"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex flex-col items-center gap-2">
                      {setup.micEnabled ? (
                        <Mic className="h-6 w-6 text-primary" />
                      ) : (
                        <MicOff className="h-6 w-6 text-muted-foreground" />
                      )}
                      <span className={setup.micEnabled ? "text-primary" : "text-muted-foreground"}>
                        Microphone {setup.micEnabled ? "On" : "Off"}
                      </span>
                    </div>
                  </motion.button>
                </div>

                {/* Language Selection */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-3">
                    <Globe className="h-4 w-4 text-primary" />
                    Interview Language
                  </label>
                  <select
                    value={setup.language}
                    onChange={(e) => updateSetup({ language: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-input border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-foreground"
                  >
                    {languages.map((lang) => (
                      <option key={lang.value} value={lang.value}>
                        {lang.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Duration Selection */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-3">
                    <Clock className="h-4 w-4 text-primary" />
                    Session Duration
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {durations.map((duration) => (
                      <motion.button
                        key={duration.value}
                        onClick={() => updateSetup({ duration: duration.value })}
                        className={`p-3 rounded-xl border transition-all text-left ${
                          setup.duration === duration.value
                            ? "border-primary bg-primary/10"
                            : "border-border hover:border-primary/50"
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className={`font-medium ${
                              setup.duration === duration.value ? "text-primary" : "text-foreground"
                            }`}>
                              {duration.label}
                            </p>
                            <p className="text-xs text-muted-foreground">{duration.description}</p>
                          </div>
                          {setup.duration === duration.value && (
                            <CheckCircle className="h-5 w-5 text-primary" />
                          )}
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </GlassCard>
            </motion.div>

            {/* Preview Panel */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <GlassCard className="h-full flex flex-col">
                <h2 className="text-xl font-semibold text-foreground mb-6">Interview Preview</h2>

                {/* AI Avatar */}
                <div className="flex-1 flex flex-col items-center justify-center py-8">
                  <AIAvatar isActive size="xl" className="mb-6" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">AI Interviewer Ready</h3>
                  <p className="text-sm text-muted-foreground text-center max-w-xs">
                    Your AI interviewer will ask questions based on your selected category and difficulty.
                  </p>
                </div>

                {/* Summary */}
                <div className="p-4 rounded-xl bg-primary/5 border border-border space-y-3">
                  <h4 className="font-medium text-foreground">Session Summary</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Category</span>
                      <span className="text-foreground capitalize">{setup.category?.replace("-", " ") || "Not selected"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Difficulty</span>
                      <span className="text-foreground capitalize">{setup.difficulty || "Not selected"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Duration</span>
                      <span className="text-foreground">{setup.duration} minutes</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Language</span>
                      <span className="text-foreground">{setup.language}</span>
                    </div>
                  </div>
                </div>

                {/* Start Button */}
                <div className="mt-6">
                  <GradientButton
                    onClick={handleStartInterview}
                    className="w-full"
                    size="lg"
                    loading={isLoading}
                    glow
                  >
                    <Play className="h-5 w-5" />
                    Start Interview
                  </GradientButton>
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
