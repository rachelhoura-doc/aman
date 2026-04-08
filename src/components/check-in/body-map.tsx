"use client";

import { cn } from "@/lib/utils";

export type BodyZone = "head" | "chest" | "stomach" | "throat";

const zones: Array<{ id: BodyZone; cx: number; cy: number; r: number }> = [
  { id: "head", cx: 60, cy: 24, r: 10 },
  { id: "throat", cx: 60, cy: 43, r: 8 },
  { id: "chest", cx: 60, cy: 62, r: 14 },
  { id: "stomach", cx: 60, cy: 88, r: 13 },
];

export function BodyMap({
  selected,
  labels,
  onToggle,
}: {
  selected: BodyZone[];
  labels: Record<BodyZone, string>;
  onToggle: (zone: BodyZone) => void;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] sm:items-center">
      <svg viewBox="0 0 120 130" className="mx-auto h-44 w-40 text-muted-foreground">
        <path
          d="M60 10c-10 0-18 8-18 18 0 7 4 13 10 16v7h16v-7c6-3 10-9 10-16 0-10-8-18-18-18Z"
          fill="currentColor"
          opacity="0.14"
        />
        <rect x="44" y="50" width="32" height="52" rx="16" fill="currentColor" opacity="0.1" />
        <rect x="30" y="56" width="12" height="38" rx="6" fill="currentColor" opacity="0.08" />
        <rect x="78" y="56" width="12" height="38" rx="6" fill="currentColor" opacity="0.08" />
        <rect x="48" y="102" width="10" height="20" rx="5" fill="currentColor" opacity="0.08" />
        <rect x="62" y="102" width="10" height="20" rx="5" fill="currentColor" opacity="0.08" />
        {zones.map((zone) => {
          const active = selected.includes(zone.id);
          return (
            <circle
              key={zone.id}
              cx={zone.cx}
              cy={zone.cy}
              r={zone.r}
              className={cn(
                "cursor-pointer stroke-primary transition-colors",
                active ? "aman-zone-pulse fill-primary/45" : "fill-primary/15"
              )}
              strokeWidth={active ? 2.5 : 1.5}
              onClick={() => onToggle(zone.id)}
              role="button"
              tabIndex={0}
              aria-label={labels[zone.id]}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onToggle(zone.id);
                }
              }}
            />
          );
        })}
      </svg>
      <div className="grid grid-cols-2 gap-2">
        {zones.map((zone) => {
          const active = selected.includes(zone.id);
          return (
            <button
              key={zone.id}
              type="button"
              onClick={() => onToggle(zone.id)}
              className={cn(
                "rounded-md border px-3 py-2 text-xs transition-colors",
                active
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-background text-muted-foreground"
              )}
            >
              {labels[zone.id]}
            </button>
          );
        })}
      </div>
    </div>
  );
}
