"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Palette,
  Bell,
  Shield,
  Globe,
  Volume2,
  Keyboard,
  Moon,
  Sun,
  Check,
  ChevronRight,
} from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Sidebar } from "@/components/layout/sidebar";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { GlassCard } from "@/components/ui/glass-card";
import { GradientButton } from "@/components/ui/gradient-button";
import { useTheme } from "@/context/ThemeContext";

interface SettingToggleProps {
  label: string;
  description: string;
  enabled: boolean;
  onChange: (enabled: boolean) => void;
}

function SettingToggle({ label, description, enabled, onChange }: SettingToggleProps) {
  return (
    <div className="flex items-center justify-between py-4 border-b border-border last:border-0">
      <div>
        <p className="font-medium text-foreground">{label}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <motion.button
        onClick={() => onChange(!enabled)}
        className={`relative w-12 h-6 rounded-full transition-colors ${
          enabled ? "bg-primary" : "bg-muted"
        }`}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-md"
          animate={{ x: enabled ? 26 : 4 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      </motion.button>
    </div>
  );
}

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  
  const [settings, setSettings] = useState({
    // Notifications
    emailNotifications: true,
    interviewReminders: true,
    progressUpdates: true,
    marketingEmails: false,
    
    // Privacy
    profilePublic: false,
    shareProgress: true,
    allowAnalytics: true,
    
    // Preferences
    soundEffects: true,
    keyboardShortcuts: true,
    autoSaveAnswers: true,
  });

  const updateSetting = (key: keyof typeof settings) => (value: boolean) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const [selectedLanguage, setSelectedLanguage] = useState("English");

  const languages = ["English", "Spanish", "French", "German", "Chinese", "Japanese", "Portuguese"];

  return (
    <div className="min-h-screen">
      <AnimatedBackground />
      <Navbar />

      <div className="pt-28 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-6">
            <Sidebar />

            <main className="flex-1 space-y-6 max-w-3xl">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
                  <span className="text-gradient">Settings</span>
                </h1>
                <p className="text-muted-foreground mt-1">
                  Customize your InterviewAI experience
                </p>
              </motion.div>

              {/* Theme Settings */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <GlassCard>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Palette className="h-5 w-5 text-primary" />
                    </div>
                    <h2 className="text-lg font-semibold text-foreground">Appearance</h2>
                  </div>

                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">Choose your preferred theme</p>
                    <div className="grid grid-cols-2 gap-4">
                      <motion.button
                        onClick={() => setTheme("light")}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          theme === "light"
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <Sun className={`h-6 w-6 ${theme === "light" ? "text-primary" : "text-muted-foreground"}`} />
                          {theme === "light" && (
                            <div className="p-1 rounded-full bg-primary">
                              <Check className="h-3 w-3 text-white" />
                            </div>
                          )}
                        </div>
                        <p className={`font-medium ${theme === "light" ? "text-primary" : "text-foreground"}`}>
                          Light Mode
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">Bright and clean interface</p>
                      </motion.button>

                      <motion.button
                        onClick={() => setTheme("dark")}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          theme === "dark"
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <Moon className={`h-6 w-6 ${theme === "dark" ? "text-primary" : "text-muted-foreground"}`} />
                          {theme === "dark" && (
                            <div className="p-1 rounded-full bg-primary">
                              <Check className="h-3 w-3 text-white" />
                            </div>
                          )}
                        </div>
                        <p className={`font-medium ${theme === "dark" ? "text-primary" : "text-foreground"}`}>
                          Dark Mode
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">Easy on the eyes</p>
                      </motion.button>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>

              {/* Notification Settings */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <GlassCard>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Bell className="h-5 w-5 text-primary" />
                    </div>
                    <h2 className="text-lg font-semibold text-foreground">Notifications</h2>
                  </div>

                  <SettingToggle
                    label="Email Notifications"
                    description="Receive email updates about your account"
                    enabled={settings.emailNotifications}
                    onChange={updateSetting("emailNotifications")}
                  />
                  <SettingToggle
                    label="Interview Reminders"
                    description="Get reminded about scheduled practice sessions"
                    enabled={settings.interviewReminders}
                    onChange={updateSetting("interviewReminders")}
                  />
                  <SettingToggle
                    label="Progress Updates"
                    description="Weekly summary of your interview progress"
                    enabled={settings.progressUpdates}
                    onChange={updateSetting("progressUpdates")}
                  />
                  <SettingToggle
                    label="Marketing Emails"
                    description="Tips, news, and product updates"
                    enabled={settings.marketingEmails}
                    onChange={updateSetting("marketingEmails")}
                  />
                </GlassCard>
              </motion.div>

              {/* Privacy Settings */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <GlassCard>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Shield className="h-5 w-5 text-primary" />
                    </div>
                    <h2 className="text-lg font-semibold text-foreground">Privacy</h2>
                  </div>

                  <SettingToggle
                    label="Public Profile"
                    description="Allow others to view your profile and achievements"
                    enabled={settings.profilePublic}
                    onChange={updateSetting("profilePublic")}
                  />
                  <SettingToggle
                    label="Share Progress"
                    description="Include your scores in anonymous leaderboards"
                    enabled={settings.shareProgress}
                    onChange={updateSetting("shareProgress")}
                  />
                  <SettingToggle
                    label="Analytics"
                    description="Help us improve by sharing usage data"
                    enabled={settings.allowAnalytics}
                    onChange={updateSetting("allowAnalytics")}
                  />
                </GlassCard>
              </motion.div>

              {/* Language Settings */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <GlassCard>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Globe className="h-5 w-5 text-primary" />
                    </div>
                    <h2 className="text-lg font-semibold text-foreground">Language</h2>
                  </div>

                  <div className="space-y-2">
                    {languages.map((language) => (
                      <motion.button
                        key={language}
                        onClick={() => setSelectedLanguage(language)}
                        className={`w-full flex items-center justify-between p-3 rounded-xl transition-colors ${
                          selectedLanguage === language
                            ? "bg-primary/10 text-primary"
                            : "hover:bg-muted/50 text-foreground"
                        }`}
                        whileHover={{ x: 4 }}
                      >
                        <span>{language}</span>
                        {selectedLanguage === language && (
                          <Check className="h-5 w-5" />
                        )}
                      </motion.button>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>

              {/* Preferences */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <GlassCard>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Volume2 className="h-5 w-5 text-primary" />
                    </div>
                    <h2 className="text-lg font-semibold text-foreground">Preferences</h2>
                  </div>

                  <SettingToggle
                    label="Sound Effects"
                    description="Play sounds during interviews"
                    enabled={settings.soundEffects}
                    onChange={updateSetting("soundEffects")}
                  />
                  <SettingToggle
                    label="Keyboard Shortcuts"
                    description="Enable keyboard shortcuts for faster navigation"
                    enabled={settings.keyboardShortcuts}
                    onChange={updateSetting("keyboardShortcuts")}
                  />
                  <SettingToggle
                    label="Auto-save Answers"
                    description="Automatically save your answers as you type"
                    enabled={settings.autoSaveAnswers}
                    onChange={updateSetting("autoSaveAnswers")}
                  />
                </GlassCard>
              </motion.div>

              {/* Keyboard Shortcuts */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <GlassCard>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Keyboard className="h-5 w-5 text-primary" />
                      </div>
                      <h2 className="text-lg font-semibold text-foreground">Keyboard Shortcuts</h2>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    View and customize keyboard shortcuts for common actions.
                  </p>
                </GlassCard>
              </motion.div>

              {/* Save Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="flex justify-end"
              >
                <GradientButton size="lg">
                  <Check className="h-5 w-5" />
                  Save All Changes
                </GradientButton>
              </motion.div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
