"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import {
  Play,
  Clock,
  ChevronRight,
  XCircle,
  Terminal,
  FileCode,
  CheckCircle,
  AlertTriangle,
  Smartphone,
  Monitor,
} from "lucide-react";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { GlassCard } from "@/components/ui/glass-card";
import { GradientButton } from "@/components/ui/gradient-button";
import { useInterview } from "@/context/InterviewContext";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => (
    <div className="h-full flex items-center justify-center bg-muted/20">
      <div className="text-center">
        <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-2" />
        <p className="text-sm text-muted-foreground">Loading editor...</p>
      </div>
    </div>
  ),
});

const codingQuestions = [
  {
    id: "1",
    title: "Two Sum",
    difficulty: "Easy",
    description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]",
        explanation: "",
      },
    ],
    starterCode: `function twoSum(nums, target) {
  // Your code here
  
}`,
    testCases: [
      { input: [[2, 7, 11, 15], 9], expected: [0, 1] },
      { input: [[3, 2, 4], 6], expected: [1, 2] },
      { input: [[3, 3], 6], expected: [0, 1] },
    ],
  },
];

export default function CodingInterviewPage() {
  const router = useRouter();
  const { endInterview } = useInterview();
  const [timeLeft, setTimeLeft] = useState(45 * 60);
  const [code, setCode] = useState(codingQuestions[0].starterCode);
  const [output, setOutput] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [testResults, setTestResults] = useState<{ passed: boolean; message: string }[]>([]);
  const [showEndConfirm, setShowEndConfirm] = useState(false);
  const [isMobileWarning, setIsMobileWarning] = useState(false);

  const currentQuestion = codingQuestions[0];

  // Check for mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobileWarning(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Timer
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const runCode = async () => {
    setIsRunning(true);
    setOutput(["Running tests..."]);
    setTestResults([]);

    // Simulate code execution
    await new Promise((resolve) => setTimeout(resolve, 1500));

    try {
      // Simulated test results
      const results = currentQuestion.testCases.map((testCase, index) => {
        const passed = Math.random() > 0.3; // Simulate random pass/fail
        return {
          passed,
          message: passed
            ? `Test ${index + 1}: Passed`
            : `Test ${index + 1}: Failed - Expected ${JSON.stringify(testCase.expected)}`,
        };
      });

      setTestResults(results);
      setOutput([
        "Execution completed.",
        `${results.filter((r) => r.passed).length}/${results.length} tests passed.`,
        "",
        ...results.map((r) => r.message),
      ]);
    } catch (error) {
      setOutput([`Error: ${error instanceof Error ? error.message : "Unknown error"}`]);
    } finally {
      setIsRunning(false);
    }
  };

  const handleEndInterview = () => {
    endInterview();
    router.push("/interview/results");
  };

  // Mobile warning
  if (isMobileWarning) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <AnimatedBackground />
        <GlassCard className="max-w-md w-full text-center">
          <Smartphone className="h-16 w-16 text-amber-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Desktop Recommended
          </h2>
          <p className="text-muted-foreground mb-6">
            The coding interview experience is optimized for larger screens. 
            Please use a desktop or laptop for the best experience.
          </p>
          <div className="flex flex-col gap-3">
            <GradientButton onClick={() => setIsMobileWarning(false)}>
              <Monitor className="h-4 w-4" />
              Continue Anyway
            </GradientButton>
            <GradientButton
              variant="outline"
              onClick={() => router.push("/interview/category")}
            >
              Try Another Interview Type
            </GradientButton>
          </div>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <AnimatedBackground />

      {/* Top Bar */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 p-4"
      >
        <div className="glass-strong rounded-2xl px-4 py-3 flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <FileCode className="h-5 w-5 text-primary" />
            <span className="font-semibold text-foreground hidden sm:block">Coding Interview</span>
            <span className="px-2 py-1 rounded-full bg-green-500/20 text-green-500 text-xs">
              {currentQuestion.difficulty}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Clock className={`h-5 w-5 ${timeLeft < 300 ? "text-destructive" : "text-primary"}`} />
            <span className={`font-mono text-lg font-bold ${timeLeft < 300 ? "text-destructive" : "text-foreground"}`}>
              {formatTime(timeLeft)}
            </span>
          </div>

          <motion.button
            onClick={() => setShowEndConfirm(true)}
            className="p-2 rounded-xl hover:bg-destructive/10 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <XCircle className="h-5 w-5 text-destructive" />
          </motion.button>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="pt-24 pb-4 px-4 min-h-screen">
        <div className="max-w-7xl mx-auto h-[calc(100vh-120px)] flex flex-col lg:flex-row gap-4">
          {/* Problem Description */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:w-2/5 overflow-auto"
          >
            <GlassCard className="h-full overflow-auto">
              <h2 className="text-xl font-bold text-foreground mb-4">{currentQuestion.title}</h2>
              
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <p className="text-foreground whitespace-pre-line">{currentQuestion.description}</p>

                <h3 className="text-lg font-semibold mt-6 mb-3 text-foreground">Examples</h3>
                {currentQuestion.examples.map((example, index) => (
                  <div key={index} className="p-4 rounded-xl bg-muted/50 mb-4">
                    <p className="font-mono text-sm text-foreground">
                      <span className="text-muted-foreground">Input:</span> {example.input}
                    </p>
                    <p className="font-mono text-sm text-foreground">
                      <span className="text-muted-foreground">Output:</span> {example.output}
                    </p>
                    {example.explanation && (
                      <p className="text-sm text-muted-foreground mt-2">
                        <span className="text-foreground">Explanation:</span> {example.explanation}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>

          {/* Code Editor & Output */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:w-3/5 flex flex-col gap-4"
          >
            {/* Editor */}
            <GlassCard className="flex-1 flex flex-col p-0 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                <div className="flex items-center gap-2">
                  <FileCode className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">solution.js</span>
                </div>
                <GradientButton
                  size="sm"
                  onClick={runCode}
                  loading={isRunning}
                  disabled={isRunning}
                >
                  <Play className="h-4 w-4" />
                  Run Code
                </GradientButton>
              </div>
              <div className="flex-1">
                <MonacoEditor
                  height="100%"
                  defaultLanguage="javascript"
                  value={code}
                  onChange={(value) => setCode(value || "")}
                  theme="vs-dark"
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    padding: { top: 16 },
                    scrollBeyondLastLine: false,
                    wordWrap: "on",
                    automaticLayout: true,
                  }}
                />
              </div>
            </GlassCard>

            {/* Output Console */}
            <GlassCard className="h-48 flex flex-col p-0 overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
                <Terminal className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-foreground">Output</span>
                {testResults.length > 0 && (
                  <span className={`ml-auto text-xs px-2 py-1 rounded-full ${
                    testResults.every((r) => r.passed)
                      ? "bg-green-500/20 text-green-500"
                      : "bg-amber-500/20 text-amber-500"
                  }`}>
                    {testResults.filter((r) => r.passed).length}/{testResults.length} Passed
                  </span>
                )}
              </div>
              <div className="flex-1 overflow-auto p-4 font-mono text-sm bg-muted/20">
                {output.length === 0 ? (
                  <p className="text-muted-foreground">Click &quot;Run Code&quot; to see output...</p>
                ) : (
                  <div className="space-y-1">
                    {output.map((line, index) => (
                      <div key={index} className="flex items-start gap-2">
                        {line.includes("Passed") ? (
                          <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                        ) : line.includes("Failed") ? (
                          <AlertTriangle className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
                        ) : null}
                        <span className={
                          line.includes("Passed")
                            ? "text-green-500"
                            : line.includes("Failed")
                            ? "text-amber-500"
                            : line.includes("Error")
                            ? "text-destructive"
                            : "text-foreground"
                        }>
                          {line}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </GlassCard>

            {/* Submit */}
            <div className="flex justify-end gap-4">
              <GradientButton variant="outline" onClick={() => setShowEndConfirm(true)}>
                Skip Question
              </GradientButton>
              <GradientButton onClick={handleEndInterview}>
                Submit Solution
                <ChevronRight className="h-4 w-4" />
              </GradientButton>
            </div>
          </motion.div>
        </div>
      </main>

      {/* End Confirmation Modal */}
      <AnimatePresence>
        {showEndConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <GlassCard className="max-w-md w-full text-center">
                <XCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-2">End Coding Interview?</h3>
                <p className="text-muted-foreground mb-6">
                  Are you sure? Your current solution will be submitted for evaluation.
                </p>
                <div className="flex gap-4">
                  <GradientButton
                    variant="outline"
                    className="flex-1"
                    onClick={() => setShowEndConfirm(false)}
                  >
                    Continue Coding
                  </GradientButton>
                  <GradientButton
                    className="flex-1"
                    onClick={handleEndInterview}
                  >
                    Submit & Exit
                  </GradientButton>
                </div>
              </GlassCard>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
