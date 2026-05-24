"use client";

import { motion } from "framer-motion";
import { Bot } from "lucide-react";
import { cn } from "@/lib/utils";

interface AIAvatarProps {
  isActive?: boolean;
  isSpeaking?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export function AIAvatar({ 
  isActive = false, 
  isSpeaking = false, 
  size = "lg",
  className 
}: AIAvatarProps) {
  const sizes = {
    sm: "h-12 w-12",
    md: "h-20 w-20",
    lg: "h-32 w-32",
    xl: "h-48 w-48",
  };

  const iconSizes = {
    sm: "h-6 w-6",
    md: "h-10 w-10",
    lg: "h-16 w-16",
    xl: "h-24 w-24",
  };

  return (
    <div className={cn("relative", className)}>
      {/* Outer glow rings */}
      {isActive && (
        <>
          <motion.div
            className={cn(
              "absolute inset-0 rounded-full bg-gradient-to-r from-primary to-secondary opacity-30",
              sizes[size]
            )}
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.3, 0.1, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className={cn(
              "absolute inset-0 rounded-full bg-gradient-to-r from-secondary to-primary opacity-20",
              sizes[size]
            )}
            animate={{
              scale: [1, 1.6, 1],
              opacity: [0.2, 0.05, 0.2],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.3,
            }}
          />
        </>
      )}

      {/* Main avatar */}
      <motion.div
        className={cn(
          "relative rounded-full bg-gradient-to-br from-primary via-secondary to-primary flex items-center justify-center",
          sizes[size],
          isActive && "glow"
        )}
        animate={
          isSpeaking
            ? {
                scale: [1, 1.05, 1],
              }
            : {}
        }
        transition={{
          duration: 0.3,
          repeat: isSpeaking ? Infinity : 0,
        }}
      >
        {/* Inner gradient ring */}
        <div className={cn(
          "absolute inset-1 rounded-full bg-background flex items-center justify-center"
        )}>
          <motion.div
            className="rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center"
            style={{ width: '90%', height: '90%' }}
            animate={isActive ? { rotate: 360 } : {}}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <Bot className={cn(iconSizes[size], "text-primary")} />
          </motion.div>
        </div>
      </motion.div>

      {/* Speaking indicator */}
      {isSpeaking && (
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-primary"
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.1,
              }}
            />
          ))}
        </div>
      )}

      {/* Status indicator */}
      <div className={cn(
        "absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-background",
        isActive ? "bg-green-500" : "bg-muted-foreground"
      )} />
    </div>
  );
}
