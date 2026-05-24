"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  Clock,
  ChevronRight,
  XCircle,
  Pause,
  Play,
  Volume2,
  MessageSquare,
  Sparkles,
  AlertCircle,
} from "lucide-react";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { GlassCard } from "@/components/ui/glass-card";
import { GradientButton } from "@/components/ui/gradient-button";
import { AIAvatar } from "@/components/ui/ai-avatar";
import { useInterview } from "@/context/InterviewContext";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost/backend/api";

export default function LiveInterviewPage() {
  const router = useRouter();
  const { setup, currentQuestion, questionIndex, questions, nextQuestion, endInterview, submitAnswer, interviewId } = useInterview();
  
  const [timeLeft, setTimeLeft] = useState(setup.duration * 60);
  const [isPaused, setIsPaused] = useState(false);
  const [isMicOn, setIsMicOn] = useState(setup.micEnabled);
  const [isCameraOn, setIsCameraOn] = useState(setup.cameraEnabled);
  const [aiStatus, setAiStatus] = useState<"listening" | "thinking" | "speaking">("speaking");
  const [showEndConfirm, setShowEndConfirm] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [feedback, setFeedback] = useState<{show: boolean, text: string, isGood: boolean} | null>(null);

  // Hardware Refs
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recognitionRef = useRef<any>(null);

  // Initialize Camera & Mic Stream
  useEffect(() => {
    const initMedia = async () => {
      if (!isCameraOn && !isMicOn) {
        stopMediaTracks();
        return;
      }
      
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: isCameraOn,
          audio: true, // We request audio upfront to allow muting/unmuting without recreating the stream
        });
        mediaStreamRef.current = stream;
        
        if (videoRef.current && isCameraOn) {
          videoRef.current.srcObject = stream;
        }

        // Setup Media Recorder for audio
        const audioStream = new MediaStream(stream.getAudioTracks());
        mediaRecorderRef.current = new MediaRecorder(audioStream, { mimeType: 'audio/webm' });
        
        mediaRecorderRef.current.ondataavailable = (e) => {
          if (e.data.size > 0) {
            audioChunksRef.current.push(e.data);
          }
        };

        // Setup Speech Recognition
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        if (SpeechRecognition) {
          recognitionRef.current = new SpeechRecognition();
          recognitionRef.current.continuous = true;
          recognitionRef.current.interimResults = true;
          
          recognitionRef.current.onresult = (event: any) => {
            let finalTranscript = '';
            for (let i = event.resultIndex; i < event.results.length; ++i) {
              if (event.results[i].isFinal) {
                finalTranscript += event.results[i][0].transcript + ' ';
              }
            }
            if (finalTranscript) {
              setUserAnswer(prev => prev + ' ' + finalTranscript.trim());
            }
          };
        }

        if (isMicOn) {
          startRecording();
        }

      } catch (err: any) {
        console.warn("Media access denied:", err.message);
        alert("Camera/Microphone access was denied. You can continue the interview using text.");
        setIsCameraOn(false);
        setIsMicOn(false);
      }
    };

    initMedia();

    return () => {
      stopMediaTracks();
    };
  }, [isCameraOn]);

  const stopMediaTracks = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
    }
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  const startRecording = () => {
    audioChunksRef.current = [];
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "inactive") {
      mediaRecorderRef.current.start(1000); // chunk every second
    }
    if (recognitionRef.current) {
      try { recognitionRef.current.start(); } catch (e) {} // ignore if already started
    }
  };

  const stopRecordingAndGetBlob = (): Promise<Blob | null> => {
    return new Promise((resolve) => {
      if (!mediaRecorderRef.current || mediaRecorderRef.current.state === "inactive") {
        resolve(null);
        return;
      }
      
      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        resolve(blob);
      };
      mediaRecorderRef.current.stop();
      if (recognitionRef.current) recognitionRef.current.stop();
    });
  };

  // Toggle Mic
  useEffect(() => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getAudioTracks().forEach(track => {
        track.enabled = isMicOn;
      });
      if (isMicOn) {
        startRecording();
      } else {
        if (recognitionRef.current) recognitionRef.current.stop();
      }
    }
  }, [isMicOn]);

  // Timer countdown
  useEffect(() => {
    if (isPaused || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isPaused, timeLeft]);

  // Simulate AI status changes
  useEffect(() => {
    const statusCycle = () => {
      setAiStatus("speaking");
      setTimeout(() => setAiStatus("listening"), 3000);
    };
    statusCycle();
    const interval = setInterval(statusCycle, 10000);
    return () => clearInterval(interval);
  }, [questionIndex]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const uploadAudioBlob = async (blob: Blob): Promise<string | undefined> => {
    const formData = new FormData();
    formData.append("audio", blob, `answer_${interviewId}_${currentQuestion?.id}.webm`);
    formData.append("interview_id", interviewId || "");

    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${API_URL}/media/upload.php`, {
        method: "POST",
        headers: {
          ...(token ? { "Authorization": `Bearer ${token}` } : {})
        },
        body: formData
      });
      const data = await res.json();
      if (res.ok) {
        return data.path; // e.g. /backend/uploads/...
      }
    } catch (err) {
      console.error("Audio upload failed:", err);
    }
    return undefined;
  };

  const handleNextQuestion = async () => {
    if (feedback?.show) {
      // User clicked continue after reading feedback
      setFeedback(null);
      setUserAnswer("");
      if (isMicOn) startRecording();
      if (questionIndex < questions.length - 1) {
        nextQuestion();
      } else {
        handleEndInterview();
      }
      return;
    }

    // Phase 1: Submit and generate feedback
    setIsSubmitting(true);
    let audioPath = undefined;
    
    if (isMicOn) {
      const blob = await stopRecordingAndGetBlob();
      if (blob && blob.size > 0) {
        audioPath = await uploadAudioBlob(blob);
      }
    }

    await submitAnswer(userAnswer, audioPath);
    setIsSubmitting(false);

    // Criteria Checking
    if (userAnswer.trim().length < 20) {
      setFeedback({ show: true, text: "You can do better than this. Try to provide more detailed explanations with examples.", isGood: false });
    } else if (userAnswer.trim().length > 100) {
      setFeedback({ show: true, text: "Excellent answer! Very detailed and well-explained.", isGood: true });
    } else {
      setFeedback({ show: true, text: "Good answer, but you could elaborate a bit more on the concepts.", isGood: true });
    }
  };

  const handleEndInterview = async () => {
    stopMediaTracks();
    await endInterview();
    router.push("/interview/results");
  };

  const progress = ((questionIndex + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />

      {/* Top Bar */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 p-4"
      >
        <div className="glass-strong rounded-2xl px-4 py-3 flex items-center justify-between max-w-7xl mx-auto">
          {/* Progress */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Question</span>
              <span className="font-bold text-primary">
                {questionIndex + 1}/{questions.length}
              </span>
            </div>
            <div className="w-32 sm:w-48 h-2 rounded-full bg-muted overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-secondary"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          {/* Timer */}
          <div className="flex items-center gap-2">
            <Clock className={`h-5 w-5 ${timeLeft < 60 ? "text-destructive" : "text-primary"}`} />
            <span className={`font-mono text-lg font-bold ${timeLeft < 60 ? "text-destructive" : "text-foreground"}`}>
              {formatTime(timeLeft)}
            </span>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            <motion.button
              onClick={() => setIsPaused(!isPaused)}
              className="p-2 rounded-xl hover:bg-primary/10 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isPaused ? (
                <Play className="h-5 w-5 text-primary" />
              ) : (
                <Pause className="h-5 w-5 text-muted-foreground" />
              )}
            </motion.button>
            <motion.button
              onClick={() => setShowEndConfirm(true)}
              className="p-2 rounded-xl hover:bg-destructive/10 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <XCircle className="h-5 w-5 text-destructive" />
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="pt-24 pb-8 px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col">
        <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col lg:flex-row gap-6">
          {/* AI Interviewer Panel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:w-2/3 flex flex-col"
          >
            <GlassCard className="flex-1 flex flex-col relative overflow-hidden" glow>
              {/* AI Status Indicator */}
              <div className="absolute top-4 right-4 flex items-center gap-2">
                <motion.div
                  className={`h-2 w-2 rounded-full ${
                    aiStatus === "speaking"
                      ? "bg-green-500"
                      : aiStatus === "thinking"
                      ? "bg-amber-500"
                      : "bg-blue-500"
                  }`}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
                <span className="text-xs text-muted-foreground capitalize">{aiStatus}</span>
              </div>

              {/* AI Avatar Section */}
              <div className="flex-1 flex flex-col items-center justify-center py-8">
                <AIAvatar
                  isActive
                  isSpeaking={aiStatus === "speaking"}
                  size="xl"
                  className="mb-8"
                />

                {/* Voice Waveform */}
                {aiStatus === "speaking" && (
                  <div className="flex items-center gap-1 mb-6">
                    {[...Array(7)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-1 rounded-full bg-primary"
                        animate={{
                          height: [12, 28, 12],
                        }}
                        transition={{
                          duration: 0.5,
                          repeat: Infinity,
                          delay: i * 0.1,
                        }}
                      />
                    ))}
                  </div>
                )}

                {/* Current Question */}
                <motion.div
                  key={questionIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="max-w-2xl w-full"
                >
                  <GlassCard className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <MessageSquare className="h-5 w-5 text-primary" />
                      <span className="text-sm text-muted-foreground">Current Question</span>
                    </div>
                    <p className="text-lg sm:text-xl font-medium text-foreground leading-relaxed">
                      {currentQuestion?.question || "Loading question..."}
                    </p>
                    <div className="mt-4 flex items-center justify-center gap-2">
                      <span className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs capitalize">
                        {currentQuestion?.type || "technical"}
                      </span>
                      <span className="px-2 py-1 rounded-full bg-secondary/10 text-secondary text-xs capitalize">
                        {currentQuestion?.difficulty || "intermediate"}
                      </span>
                    </div>
                  </GlassCard>
                </motion.div>
              </div>

              {/* Answer Input */}
              <div className="p-4 border-t border-border">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <textarea
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      placeholder="Type your answer here or use voice..."
                      className="w-full px-4 py-3 rounded-xl bg-input border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-foreground placeholder:text-muted-foreground resize-none h-20"
                      disabled={isSubmitting}
                    />
                    <div className="absolute bottom-3 right-3 flex gap-2">
                      <motion.button
                        onClick={() => setIsMicOn(!isMicOn)}
                        className={`p-2 rounded-lg transition-colors ${
                          isMicOn ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                        }`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        {isMicOn ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
                      </motion.button>
                    </div>
                  </div>
                  <GradientButton onClick={handleNextQuestion} className="sm:self-end" disabled={isSubmitting}>
                    {isSubmitting ? "Saving..." : questionIndex < questions.length - 1 ? (
                      <>
                        Next <ChevronRight className="h-4 w-4" />
                      </>
                    ) : (
                      "Finish Interview"
                    )}
                  </GradientButton>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Right Panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:w-1/3 flex flex-col gap-4"
          >
            {/* Camera Preview */}
            <GlassCard className="aspect-video relative overflow-hidden bg-black flex items-center justify-center">
              {isCameraOn ? (
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
                  <div className="text-center">
                    <VideoOff className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Camera Off</p>
                  </div>
                </div>
              )}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                <motion.button
                  onClick={() => setIsCameraOn(!isCameraOn)}
                  className={`p-2 rounded-lg ${
                    isCameraOn ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {isCameraOn ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
                </motion.button>
                <motion.button
                  onClick={() => setIsMicOn(!isMicOn)}
                  className={`p-2 rounded-lg ${
                    isMicOn ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {isMicOn ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
                </motion.button>
              </div>
            </GlassCard>

            {/* AI Tips */}
            <GlassCard>
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="h-5 w-5 text-primary" />
                <h3 className="font-semibold text-foreground">AI Tips</h3>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex gap-2">
                  <Volume2 className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <p className="text-muted-foreground">Speak clearly and at a moderate pace</p>
                </div>
                <div className="flex gap-2">
                  <AlertCircle className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <p className="text-muted-foreground">Use specific examples from your experience</p>
                </div>
                <div className="flex gap-2">
                  <MessageSquare className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <p className="text-muted-foreground">Structure your answer: situation, action, result</p>
                </div>
              </div>
            </GlassCard>

            {/* Question List */}
            <GlassCard className="flex-1 overflow-y-auto max-h-[300px]">
              <h3 className="font-semibold text-foreground mb-4">Questions Overview</h3>
              <div className="space-y-2">
                {questions.map((q, i) => (
                  <div
                    key={q.id}
                    className={`p-2 rounded-lg text-sm flex items-center gap-2 ${
                      i === questionIndex
                        ? "bg-primary/10 text-primary"
                        : i < questionIndex
                        ? "text-muted-foreground line-through"
                        : "text-muted-foreground"
                    }`}
                  >
                    <span className="font-mono">{i + 1}.</span>
                    <span className="truncate">{q.question.substring(0, 40)}...</span>
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </main>

      {/* End Interview Confirmation Modal */}
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
                <h3 className="text-xl font-bold text-foreground mb-2">End Interview?</h3>
                <p className="text-muted-foreground mb-6">
                  Are you sure you want to end the interview? Your progress will be saved and you&apos;ll receive your results.
                </p>
                <div className="flex gap-4">
                  <GradientButton
                    variant="outline"
                    className="flex-1"
                    onClick={() => setShowEndConfirm(false)}
                  >
                    Continue
                  </GradientButton>
                  <GradientButton
                    className="flex-1 !bg-destructive"
                    glow={false}
                    onClick={handleEndInterview}
                  >
                    End Interview
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
