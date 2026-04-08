"use client";

import { CheckCircle2 } from "lucide-react";

import { useAppState } from "@/components/providers/app-state-provider";

const RADIUS = 34;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function DailyProgressRing({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  const { state } = useAppState();
  const completedMeds = state.dosesTaken.filter(Boolean).length;
  const totalTasks = state.dosesTaken.length + 1;
  const completedTasks = completedMeds + (state.checkInCompleted ? 1 : 0);
  const progress = completedTasks / totalTasks;
  const offset = CIRCUMFERENCE * (1 - progress);

  return (
    <section className="rounded-xl border border-border bg-card p-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-foreground">{title}</p>
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        </div>
        <div className="relative grid size-20 place-items-center">
          <svg viewBox="0 0 80 80" className="size-20 -rotate-90">
            <circle
              cx="40"
              cy="40"
              r={RADIUS}
              stroke="currentColor"
              strokeWidth="8"
              className="text-muted"
              fill="none"
            />
            <circle
              cx="40"
              cy="40"
              r={RADIUS}
              stroke="currentColor"
              strokeWidth="8"
              className="text-primary"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={offset}
              style={{
                transition: "stroke-dashoffset 420ms cubic-bezier(.2,.9,.2,1)",
              }}
            />
          </svg>
          <span className="absolute text-xs font-semibold tabular-nums text-foreground">
            {Math.round(progress * 100)}%
          </span>
        </div>
      </div>
      <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
        <CheckCircle2 className="size-4 text-primary" aria-hidden />
        <span>
          {completedTasks} / {totalTasks}
        </span>
      </div>
    </section>
  );
}
