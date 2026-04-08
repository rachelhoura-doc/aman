"use client";

import { AlertTriangle, ArrowLeft, ArrowRight, Pill } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { useAppState } from "@/components/providers/app-state-provider";
import { useLocale } from "@/components/providers/locale-provider";
import { LocaleToggle } from "@/components/dashboard/locale-toggle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { medicationsMessages } from "@/lib/i18n/medications";
import { messages } from "@/lib/i18n/messages";
import { cn } from "@/lib/utils";

const doseScheduleHours = [8, 10, 12, 14, 16, 18, 20, 22];

export function MedicationsBlisterPack() {
  const { locale, dir } = useLocale();
  const { state, setDoseTaken } = useAppState();
  const t = medicationsMessages[locale];
  const nav = messages[locale];
  const BackIcon = dir === "rtl" ? ArrowRight : ArrowLeft;

  const currentHour = new Date().getHours();
  const hasMissedDose = state.dosesTaken.some((taken, idx) => {
    const dueHour = doseScheduleHours[idx];
    return !taken && currentHour >= dueHour + 2;
  });

  const [popIndex, setPopIndex] = useState<number | null>(null);
  useEffect(() => {
    if (popIndex === null) return;
    const t = window.setTimeout(() => setPopIndex(null), 380);
    return () => window.clearTimeout(t);
  }, [popIndex]);

  return (
    <div className="flex min-h-full flex-1 flex-col bg-background">
      <header className="sticky top-0 z-10 border-b border-border/80 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="mx-auto flex max-w-lg flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div
            className={cn(
              "flex flex-wrap items-center gap-3",
              dir === "rtl" && "sm:flex-row-reverse"
            )}
          >
            <Button variant="ghost" size="sm" className="-ms-2 gap-1 px-2" asChild>
              <Link href="/">
                <BackIcon className="h-4 w-4 shrink-0" aria-hidden />
                {t.backHome}
              </Link>
            </Button>
            <span className="text-muted-foreground" aria-hidden>
              ·
            </span>
            <span className="text-sm font-medium text-foreground">{nav.appName}</span>
          </div>
          <div
            className={cn(
              "flex shrink-0 items-center gap-2",
              dir === "rtl" && "sm:flex-row-reverse"
            )}
          >
            <span className="sr-only">{nav.language}</span>
            <LocaleToggle />
          </div>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-lg flex-1 flex-col gap-6 px-4 py-6">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            {t.pageTitle}
          </h1>
          <p className="text-base leading-relaxed text-muted-foreground">
            {t.pageDescription}
          </p>
        </div>

        {hasMissedDose && (
          <section
            className={cn(
              "aman-fade-up flex gap-3 rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive",
              dir === "rtl" ? "flex-row-reverse text-end" : "text-start"
            )}
            role="status"
            aria-live="polite"
          >
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden />
            <div>
              <p className="font-semibold">{t.missedDoseTitle}</p>
              <p>{t.missedDoseBody}</p>
            </div>
          </section>
        )}

        <Card>
          <CardHeader>
            <CardTitle>{t.blisterTitle}</CardTitle>
            <p className="text-sm text-muted-foreground">{t.blisterHint}</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-4 gap-3">
              {state.dosesTaken.map((taken, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => {
                    setDoseTaken(index, !taken);
                    setPopIndex(index);
                  }}
                  className={cn(
                    "relative flex aspect-square items-center justify-center rounded-full border bg-card shadow-sm transition-transform active:scale-95",
                    popIndex === index && "aman-pop",
                    taken
                      ? "border-primary/40 bg-primary/10 text-primary"
                      : "border-border text-muted-foreground"
                  )}
                  aria-pressed={taken}
                  aria-label={`Dose ${index + 1} ${taken ? t.takenLabel : t.pendingLabel}`}
                >
                  <Pill className="h-5 w-5" aria-hidden />
                  {taken && (
                    <span className="absolute inset-0 rounded-full border-2 border-primary/40" />
                  )}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground sm:grid-cols-4">
              {state.dosesTaken.map((taken, index) => (
                <p
                  key={`label-${index}`}
                  className={cn(
                    "rounded-md border border-border px-2 py-1",
                    taken && "border-primary/30 bg-primary/5 text-primary"
                  )}
                >
                  {index + 1}: {taken ? t.takenLabel : t.pendingLabel}
                </p>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
