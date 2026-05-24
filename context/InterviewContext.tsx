"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost/backend/api";

export type InterviewCategory = 
  | "frontend"
  | "backend"
  | "fullstack"
  | "devops"
  | "data-science"
  | "mobile"
  | "system-design"
  | "behavioral"
  | "security"
  | "web"
  | "database"
  | "communication";

export type Difficulty = "beginner" | "intermediate" | "advanced";

export interface InterviewSetup {
  category: InterviewCategory | null;
  difficulty: Difficulty | null;
  cameraEnabled: boolean;
  micEnabled: boolean;
  language: string;
  duration: number; // in minutes
}

export interface InterviewQuestion {
  id: string;
  question: string;
  category: InterviewCategory;
  difficulty: Difficulty;
  type: "technical" | "behavioral" | "coding" | "hr";
  expectedAnswer?: string;
}

export interface InterviewResult {
  id: string;
  date: string;
  category: InterviewCategory;
  difficulty: Difficulty;
  scores: {
    communication: number;
    technical: number;
    confidence: number;
    overall: number;
  };
  feedback: string[];
  questions: {
    question: string;
    answer: string;
    score: number;
  }[];
}

interface InterviewContextType {
  setup: InterviewSetup;
  currentQuestion: InterviewQuestion | null;
  questionIndex: number;
  questions: InterviewQuestion[];
  isInterviewActive: boolean;
  interviewHistory: InterviewResult[];
  interviewId: string | null;
  updateSetup: (updates: Partial<InterviewSetup>) => void;
  startInterview: () => Promise<boolean>;
  submitAnswer: (answer: string, audioPath?: string) => Promise<void>;
  endInterview: () => Promise<InterviewResult | null>;
  nextQuestion: () => void;
  resetSetup: () => void;
  fetchHistory: () => Promise<void>;
}

const InterviewContext = createContext<InterviewContextType | undefined>(undefined);

const defaultSetup: InterviewSetup = {
  category: null,
  difficulty: null,
  cameraEnabled: true,
  micEnabled: true,
  language: "English",
  duration: 30,
};

export function InterviewProvider({ children }: { children: ReactNode }) {
  const [setup, setSetup] = useState<InterviewSetup>(defaultSetup);
  const [questions, setQuestions] = useState<InterviewQuestion[]>([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [isInterviewActive, setIsInterviewActive] = useState(false);
  const [interviewHistory, setInterviewHistory] = useState<InterviewResult[]>([]);
  const [interviewId, setInterviewId] = useState<string | null>(null);

  const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return token ? { "Authorization": `Bearer ${token}` } : {};
  };

  const fetchHistory = async () => {
    try {
      const response = await fetch(`${API_URL}/interview/history.php`, {
        headers: { ...getAuthHeader() }
      });
      if (response.ok) {
        const data = await response.json();
        setInterviewHistory(data);
      }
    } catch (error) {
      console.error("Failed to fetch history:", error);
    }
  };

  // Fetch history on initial load if user is logged in (token exists)
  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetchHistory();
    }
  }, []);

  const updateSetup = (updates: Partial<InterviewSetup>) => {
    setSetup((prev) => ({ ...prev, ...updates }));
  };

  const startInterview = async (): Promise<boolean> => {
    try {
      // 1. Fetch questions based on setup
      const queryParams = new URLSearchParams();
      if (setup.category) queryParams.append("category", setup.category);
      if (setup.difficulty) queryParams.append("difficulty", setup.difficulty);

      const qRes = await fetch(`${API_URL}/interview/questions.php?${queryParams.toString()}`, {
        headers: { ...getAuthHeader() }
      });
      
      const qData = await qRes.json();
      
      if (!qRes.ok) {
        throw new Error(qData.message || qData.error || "Failed to fetch questions");
      }

      if (!qData || qData.length === 0) {
        throw new Error("No questions available for this category.");
      }

      setQuestions(qData);

      // 2. Start interview session on backend
      const startRes = await fetch(`${API_URL}/interview/start.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeader(),
        },
        body: JSON.stringify({
          category: setup.category,
          difficulty: setup.difficulty,
          duration: setup.duration
        })
      });
      const startData = await startRes.json();
      
      if (startRes.ok && startData.interview_id) {
        setInterviewId(startData.interview_id);
        setQuestionIndex(0);
        setIsInterviewActive(true);
        return true;
      } else {
        throw new Error(startData.message || "Failed to start interview session.");
      }
    } catch (error: any) {
      console.warn("Failed to start interview:", error);
      alert(error instanceof Error ? error.message : "Failed to start interview");
      return false;
    }
  };

  const submitAnswer = async (answer: string, audioPath?: string) => {
    if (!interviewId || questions.length === 0) return;
    
    try {
      const currentQ = questions[questionIndex];
      await fetch(`${API_URL}/interview/submit-answer.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeader(),
        },
        body: JSON.stringify({
          interview_id: interviewId,
          question_id: currentQ.id,
          user_answer: answer,
          audio_path: audioPath
        })
      });
    } catch (error) {
      console.error("Error submitting answer:", error);
    }
  };

  const endInterview = async (): Promise<InterviewResult | null> => {
    if (!interviewId) return null;

    try {
      const response = await fetch(`${API_URL}/interview/end.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeader(),
        },
        body: JSON.stringify({ interview_id: interviewId })
      });
      const data = await response.json();
      
      setIsInterviewActive(false);
      
      if (response.ok && data.result) {
        const newResult: InterviewResult = {
          id: interviewId,
          date: new Date().toISOString().split("T")[0],
          category: setup.category || "frontend",
          difficulty: setup.difficulty || "intermediate",
          scores: data.result,
          feedback: [data.result.feedback],
          questions: [], // We don't fetch individual questions back in this example
        };
        
        // Refetch history to keep it synced
        await fetchHistory();
        return newResult;
      }
    } catch (error) {
      console.error("Error ending interview:", error);
    }
    
    setIsInterviewActive(false);
    return null;
  };

  const nextQuestion = () => {
    if (questionIndex < questions.length - 1) {
      setQuestionIndex((prev) => prev + 1);
    }
  };

  const resetSetup = () => {
    setSetup(defaultSetup);
    setQuestions([]);
    setQuestionIndex(0);
    setIsInterviewActive(false);
    setInterviewId(null);
  };

  return (
    <InterviewContext.Provider
      value={{
        setup,
        currentQuestion: questions[questionIndex] || null,
        questionIndex,
        questions,
        isInterviewActive,
        interviewHistory,
        interviewId,
        updateSetup,
        startInterview,
        submitAnswer,
        endInterview,
        nextQuestion,
        resetSetup,
        fetchHistory,
      }}
    >
      {children}
    </InterviewContext.Provider>
  );
}

export function useInterview() {
  const context = useContext(InterviewContext);
  if (context === undefined) {
    throw new Error("useInterview must be used within an InterviewProvider");
  }
  return context;
}
