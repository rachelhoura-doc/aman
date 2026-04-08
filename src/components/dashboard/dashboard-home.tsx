"use client";

import {
  Activity,
  AlertTriangle,
  BookOpen,
  HeartHandshake,
  Pill,
} from "lucide-react";
import Link from "next/link";

import { useLocale } from "@/components/providers/locale-provider";
import { DailyProgressRing } from "@/components/dashboard/daily-progress-ring";
import { LocaleToggle } from "@/components/dashboard/locale-toggle";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { messages } from "@/lib/i18n/messages";
import { cn } from "@/lib/utils";

const featureIcons = {
  symptoms: Activity,
  meds: Pill,
  learn: BookOpen,
} as const;

export function DashboardHome() {
  const { locale, dir } = useLocale();
  const t = messages[locale];

  return (
    <div className="flex min-h-full flex-1 flex-col bg-background">
      <header className="sticky top-0 z-10 border-b border-border/80 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div
          className={cn(
            "mx-auto flex max-w-lg flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between"
          )}
        >
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <HeartHandshake className="h-6 w-6" aria-hidden />
            </div>
            <div className="min-w-0">
              <p className="text-lg font-semibold tracking-tight text-foreground">
                {t.appName}
              </p>
              <p className="text-sm text-muted-foreground">{t.tagline}</p>
            </div>
          </div>
          <div
            className={cn(
              "flex shrink-0 items-center gap-2",
              dir === "rtl" && "sm:flex-row-reverse"
            )}
          >
            <span className="sr-only">{t.language}</span>
            <LocaleToggle />
          </div>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-lg flex-1 flex-col gap-6 px-4 py-6">
        <section className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            {t.greeting}
          </h1>
          <p className="text-base leading-relaxed text-muted-foreground">
            {t.greetingSub}
          </p>
        </section>
        <DailyProgressRing
          title={t.dailyProgressTitle}
          subtitle={t.dailyProgressSubtitle}
        />

        <section
          className="rounded-xl border border-amber-200/80 bg-amber-50 p-4 text-amber-950"
          role="status"
          aria-live="polite"
        >
          <div
            className={cn(
              "flex gap-3",
              dir === "rtl" ? "flex-row-reverse" : "flex-row"
            )}
          >
            <AlertTriangle
              className="mt-0.5 h-5 w-5 shrink-0 text-amber-600"
              aria-hidden
            />
            <div className="space-y-1">
              <p className="font-semibold">{t.feverBannerTitle}</p>
              <p className="text-sm leading-relaxed opacity-95">
                {t.feverBannerBody}
              </p>
            </div>
          </div>
        </section>

        <section className="grid gap-4">
          <DashboardFeatureCard
            icon={featureIcons.symptoms}
            title={t.cardSymptomsTitle}
            description={t.cardSymptomsDesc}
            openLabel={t.open}
            href="/check-in"
          />
          <DashboardFeatureCard
            icon={featureIcons.meds}
            title={t.cardMedsTitle}
            description={t.cardMedsDesc}
            openLabel={t.open}
            href="/medications"
          />
          <DashboardFeatureCard
            icon={featureIcons.learn}
            title={t.cardLearnTitle}
            description={t.cardLearnDesc}
            openLabel={t.open}
            href="/education"
          />
        </section>

        <p className="text-center text-xs leading-relaxed text-muted-foreground">
          {t.footerNote}
        </p>
      </main>
    </div>
  );
}

function DashboardFeatureCard({
  icon: Icon,
  title,
  description,
  openLabel,
  href,
}: {
  icon: typeof Activity;
  title: string;
  description: string;
  openLabel: string;
  href: string;
}) {
  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-start gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted text-primary">
              <Icon className="h-5 w-5" aria-hidden />
            </span>
            <div className="min-w-0 space-y-1">
              <CardTitle className="text-base">{title}</CardTitle>
              <CardDescription className="text-sm leading-relaxed">
                {description}
              </CardDescription>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <Button variant="outline" size="sm" className="w-full sm:w-auto" asChild>
          <Link href={href}>{openLabel}</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
