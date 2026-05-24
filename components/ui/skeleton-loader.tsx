"use client";

import { cn } from "@/lib/utils";

interface SkeletonLoaderProps {
  className?: string;
  variant?: "text" | "circular" | "rectangular" | "card";
}

export function SkeletonLoader({ className, variant = "rectangular" }: SkeletonLoaderProps) {
  const variants = {
    text: "h-4 w-full rounded",
    circular: "h-12 w-12 rounded-full",
    rectangular: "h-24 w-full rounded-lg",
    card: "h-48 w-full rounded-xl",
  };

  return (
    <div
      className={cn(
        "skeleton bg-muted animate-pulse",
        variants[variant],
        className
      )}
    />
  );
}

export function CardSkeleton() {
  return (
    <div className="glass rounded-xl p-6 space-y-4">
      <SkeletonLoader variant="text" className="w-1/3" />
      <SkeletonLoader variant="rectangular" className="h-32" />
      <div className="flex gap-2">
        <SkeletonLoader variant="text" className="w-1/4" />
        <SkeletonLoader variant="text" className="w-1/4" />
      </div>
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
      <SkeletonLoader variant="card" className="h-64" />
    </div>
  );
}
