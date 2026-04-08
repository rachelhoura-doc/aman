"use client";

import { ArrowLeft, ArrowRight, AudioLines, Square } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { LocaleToggle } from "@/components/dashboard/locale-toggle";
import { useLocale } from "@/components/providers/locale-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { educationMessages } from "@/lib/i18n/education";
import { messages } from "@/lib/i18n/messages";
import { cn } from "@/lib/utils";

export function EducationVisualCards() {
  const { locale, dir } = useLocale();
  const t = educationMessages[locale];
  const nav = messages[locale];
  const BackIcon = dir === "rtl" ? ArrowRight : ArrowLeft;
  const [speaking, setSpeaking] = useState(false);

  useEffect(() => {
    return () => {
      if (typeof window !== "undefined") {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  function handleListen() {
    if (typeof window === "undefined") return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(t.listenTextAr);
    utterance.lang = "ar-SA";
    utterance.rate = 0.92;
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    setSpeaking(true);
    window.speechSynthesis.speak(utterance);
  }

  function handleStop() {
    if (typeof window === "undefined") return;
    window.speechSynthesis.cancel();
    setSpeaking(false);
  }

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
        <div className="space-y-1 text-start">
          <h1 className="text-start text-2xl font-semibold tracking-tight text-foreground">
            {t.pageTitle}
          </h1>
          <p className="text-start text-base leading-relaxed text-muted-foreground">
            {t.pageDescription}
          </p>
        </div>
        <div className={cn("flex gap-3", dir === "rtl" && "flex-row-reverse")}>
          <Button type="button" className="gap-2" onClick={handleListen}>
            <AudioLines className="size-4" aria-hidden />
            {t.listen}
          </Button>
          <Button
            type="button"
            variant="outline"
            className="gap-2"
            onClick={handleStop}
            disabled={!speaking}
          >
            <Square className="size-4" aria-hidden />
            {t.stop}
          </Button>
        </div>
        <section className="grid gap-4">
          {t.cards.map((card, idx) => (
            <div
              key={card.title}
              className="aman-fade-up"
              style={{ animationDelay: `${idx * 80}ms` }}
            >
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="h-28 bg-gradient-to-br from-primary/15 to-accent/50">
                    <Illustration index={idx} />
                  </div>
                  <div className="space-y-2 p-4 text-start">
                    <h2 className="text-start text-base font-semibold text-foreground">
                      {card.title}
                    </h2>
                    <p className="text-start text-sm leading-relaxed text-muted-foreground">
                      {card.body}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </section>
        <section className="space-y-3 text-start">
          <h2 className="text-start text-xl font-semibold text-foreground">
            {t.nutritionTitle}
          </h2>
          <p className="text-start text-sm leading-relaxed text-muted-foreground">
            {t.nutritionSubtitle}
          </p>
          <div className="grid gap-3">
            {t.nutritionRecipes.map((recipe, idx) => (
              <div key={recipe.name} className="aman-fade-up" style={{ animationDelay: `${idx * 70}ms` }}>
                <Card>
                  <CardContent className="space-y-2 p-4 text-start">
                    <h3 className="text-start text-base font-semibold text-foreground">
                      {recipe.name}
                    </h3>
                    <p className="text-start text-sm leading-relaxed text-muted-foreground">
                      {recipe.benefit}
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

function Illustration({ index }: { index: number }) {
  if (index === 0) {
    return (
      <div className="flex h-full items-center justify-center gap-3">
        <div className="h-12 w-12 rounded-full border-4 border-primary/30 bg-white/80" />
        <div className="h-8 w-14 rounded-md bg-primary/30" />
      </div>
    );
  }
  if (index === 1) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="h-14 w-14 rounded-full bg-amber-200/80" />
      </div>
    );
  }
  return (
    <div className="flex h-full items-center justify-center">
      <div className="grid grid-cols-2 gap-2">
        <span className="h-5 w-5 rounded-sm bg-primary/40" />
        <span className="h-5 w-5 rounded-sm bg-primary/60" />
        <span className="h-5 w-5 rounded-sm bg-primary/60" />
        <span className="h-5 w-5 rounded-sm bg-primary/40" />
      </div>
    </div>
  );
}
