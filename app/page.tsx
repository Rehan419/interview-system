"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Bot,
  Sparkles,
  Brain,
  Target,
  Zap,
  Users,
  Award,
  ArrowRight,
  Play,
  Star,
  CheckCircle,
  TrendingUp,
  MessageSquare,
  Code,
  Briefcase,
} from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { GlassCard } from "@/components/ui/glass-card";
import { GradientButton } from "@/components/ui/gradient-button";
import { AIAvatar } from "@/components/ui/ai-avatar";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Questions",
    description: "Dynamic questions generated based on your skill level and target role.",
  },
  {
    icon: MessageSquare,
    title: "Real-time Feedback",
    description: "Get instant analysis of your responses with actionable improvements.",
  },
  {
    icon: Target,
    title: "Personalized Coaching",
    description: "AI adapts to your weaknesses and helps you improve faster.",
  },
  {
    icon: Code,
    title: "Coding Challenges",
    description: "Practice coding interviews with an integrated IDE and test cases.",
  },
  {
    icon: TrendingUp,
    title: "Progress Tracking",
    description: "Monitor your improvement over time with detailed analytics.",
  },
  {
    icon: Briefcase,
    title: "Industry Specific",
    description: "Tailored interviews for tech, finance, consulting, and more.",
  },
];

const stats = [
  { value: "10K+", label: "Interviews Conducted" },
  { value: "95%", label: "Success Rate" },
  { value: "500+", label: "Companies Covered" },
  { value: "4.9", label: "User Rating" },
];

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Software Engineer at Google",
    content: "InterviewAI helped me land my dream job. The AI feedback was incredibly accurate and helped me identify my weak points.",
    rating: 5,
  },
  {
    name: "Michael Roberts",
    role: "Product Manager at Meta",
    content: "The behavioral interview practice was game-changing. I felt so much more confident walking into my actual interviews.",
    rating: 5,
  },
  {
    name: "Emily Johnson",
    role: "Data Scientist at Netflix",
    content: "The coding interview simulator is as close to the real thing as you can get. Highly recommend for any tech role.",
    rating: 5,
  },
];

const categories = [
  "Frontend Development",
  "Backend Development",
  "System Design",
  "Data Science",
  "Product Management",
  "Behavioral",
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <AnimatedBackground />
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center lg:text-left"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
                >
                  <Sparkles className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-primary">AI-Powered Interview Prep</span>
                </motion.div>
                
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                  <span className="text-balance">Master Your </span>
                  <span className="text-gradient">Interviews</span>
                  <br />
                  <span className="text-balance">with AI Coaching</span>
                </h1>
                
                <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0 text-pretty">
                  Practice with our advanced AI interviewer, get real-time feedback, and boost your confidence. 
                  Land your dream job with personalized coaching.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Link href="/interview/category">
                    <GradientButton size="lg" className="w-full sm:w-auto">
                      <Play className="h-5 w-5" />
                      Start Practice
                    </GradientButton>
                  </Link>
                  <Link href="/signup">
                    <GradientButton variant="outline" size="lg" glow={false} className="w-full sm:w-auto">
                      Create Account
                      <ArrowRight className="h-5 w-5" />
                    </GradientButton>
                  </Link>
                </div>

                {/* Trust badges */}
                <div className="mt-10 flex flex-wrap gap-6 justify-center lg:justify-start">
                  {categories.slice(0, 3).map((category) => (
                    <div key={category} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      {category}
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Right Content - AI Avatar */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="relative flex justify-center"
              >
                <div className="relative">
                  {/* Decorative elements */}
                  <motion.div
                    className="absolute -top-10 -left-10 h-20 w-20 rounded-full bg-gradient-to-br from-primary to-secondary opacity-20 blur-xl"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />
                  <motion.div
                    className="absolute -bottom-5 -right-5 h-16 w-16 rounded-full bg-gradient-to-br from-secondary to-primary opacity-20 blur-xl"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 5, repeat: Infinity }}
                  />
                  
                  {/* Main AI display */}
                  <GlassCard className="p-8 relative" hover={false}>
                    <div className="flex flex-col items-center">
                      <AIAvatar isActive isSpeaking size="xl" />
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="mt-6 text-center"
                      >
                        <h3 className="text-xl font-semibold text-foreground mb-2">AI Interviewer</h3>
                        <p className="text-sm text-muted-foreground">Ready to help you practice</p>
                      </motion.div>
                      
                      {/* Sample question bubble */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.2 }}
                        className="mt-6 p-4 rounded-xl bg-primary/10 border border-primary/20 max-w-xs"
                      >
                        <p className="text-sm text-foreground">
                          &quot;Tell me about a challenging project you&apos;ve worked on...&quot;
                        </p>
                      </motion.div>
                    </div>
                  </GlassCard>
                  
                  {/* Floating elements */}
                  <motion.div
                    className="absolute -right-8 top-1/4 p-3 rounded-xl glass"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <Brain className="h-6 w-6 text-primary" />
                  </motion.div>
                  <motion.div
                    className="absolute -left-8 bottom-1/3 p-3 rounded-xl glass"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    <Zap className="h-6 w-6 text-secondary" />
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <GlassCard className="text-center py-8" glow>
                    <motion.span
                      className="text-4xl lg:text-5xl font-bold text-gradient"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
                    >
                      {stat.value}
                    </motion.span>
                    <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Everything You Need to <span className="text-gradient">Succeed</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
                Our AI-powered platform provides comprehensive interview preparation tools
                designed to help you land your dream job.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <GlassCard className="h-full group">
                      <div className="p-3 rounded-xl bg-primary/10 w-fit mb-4 group-hover:glow-sm transition-shadow">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2 text-foreground">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </GlassCard>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent via-primary/5 to-transparent">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                How It <span className="text-gradient">Works</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Get started in minutes and begin improving your interview skills today.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: "01",
                  title: "Choose Your Path",
                  description: "Select your target role and difficulty level to get personalized questions.",
                  icon: Target,
                },
                {
                  step: "02",
                  title: "Practice with AI",
                  description: "Engage in realistic mock interviews with our advanced AI interviewer.",
                  icon: Bot,
                },
                {
                  step: "03",
                  title: "Get Feedback",
                  description: "Receive detailed analysis and actionable tips to improve your performance.",
                  icon: Award,
                },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.step}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                    className="relative"
                  >
                    <GlassCard className="text-center relative overflow-hidden">
                      <span className="absolute top-4 right-4 text-6xl font-bold text-primary/10">
                        {item.step}
                      </span>
                      <div className="relative z-10">
                        <div className="p-4 rounded-full bg-primary/10 w-fit mx-auto mb-6">
                          <Icon className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="text-xl font-semibold mb-3 text-foreground">{item.title}</h3>
                        <p className="text-muted-foreground">{item.description}</p>
                      </div>
                    </GlassCard>
                    {index < 2 && (
                      <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary to-secondary" />
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Loved by <span className="text-gradient">Thousands</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Join thousands of professionals who have transformed their interview skills.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <GlassCard className="h-full">
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-primary fill-primary" />
                      ))}
                    </div>
                    <p className="text-foreground mb-6">&quot;{testimonial.content}&quot;</p>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground font-semibold">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <GlassCard className="text-center py-12 px-6 relative overflow-hidden" glow>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{ duration: 10, repeat: Infinity }}
                  style={{ backgroundSize: "200% 200%" }}
                />
                <div className="relative z-10">
                  <Users className="h-12 w-12 text-primary mx-auto mb-6" />
                  <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-foreground">
                    Ready to Ace Your Interview?
                  </h2>
                  <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
                    Start practicing today and join thousands of successful candidates who landed their dream jobs.
                  </p>
                  <Link href="/signup">
                    <GradientButton size="lg">
                      Get Started Free
                      <ArrowRight className="h-5 w-5" />
                    </GradientButton>
                  </Link>
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
