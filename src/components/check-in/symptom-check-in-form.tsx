"use client";

import { AlertTriangle, ArrowLeft, ArrowRight, Thermometer } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { BodyMap, type BodyZone } from "@/components/check-in/body-map";
import { useAppState } from "@/components/providers/app-state-provider";
import { useLocale } from "@/components/providers/locale-provider";
import { LocaleToggle } from "@/components/dashboard/locale-toggle";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { checkInMessages } from "@/lib/i18n/check-in";
import { messages } from "@/lib/i18n/messages";
import { cn } from "@/lib/utils";

const FEVER_THRESHOLD_C = 38;

export function SymptomCheckInForm() {
  const { locale, dir } = useLocale();
  const { setCheckInCompleted } = useAppState();
  const t = checkInMessages[locale];
  const nav = messages[locale];

  const [feverC, setFeverC] = useState(37);
  const [cough, setCough] = useState<"yes" | "no" | "">("");
  const [nausea, setNausea] = useState<1 | 2 | 3 | 4 | 5 | "">("");
  const [feverModalDismissed, setFeverModalDismissed] = useState(false);
  const [selectedZones, setSelectedZones] = useState<BodyZone[]>([]);
  const [saved, setSaved] = useState(false);
  const prevFeverHighRef = useRef(false);

  const feverHigh = feverC > FEVER_THRESHOLD_C;

  const showFeverModal = feverHigh && !feverModalDismissed;
  const showFeverBanner = feverHigh && feverModalDismissed;

  const BackIcon = dir === "rtl" ? ArrowRight : ArrowLeft;

  function triggerHapticAlert() {
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate([60, 40, 80]);
    }
  }

  function onFeverChange(next: number) {
    if (next > FEVER_THRESHOLD_C && !prevFeverHighRef.current) {
      setFeverModalDismissed(false);
      triggerHapticAlert();
    }
    setFeverC(next);
  }

  useEffect(() => {
    if (feverHigh && !prevFeverHighRef.current) {
      triggerHapticAlert();
    }
    prevFeverHighRef.current = feverHigh;
  }, [feverHigh]);

  const thermometerPercent = ((feverC - 35) / (41 - 35)) * 100;
  const thermometerBottom = `calc(${thermometerPercent}% - 0.5rem)`;

  function formatTemp(value: number) {
    return Number.isInteger(value) ? `${value}.0` : value.toFixed(1);
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setCheckInCompleted(true);
    setSaved(true);
  }

  function toggleZone(zone: BodyZone) {
    setSelectedZones((prev) =>
      prev.includes(zone) ? prev.filter((item) => item !== zone) : [...prev, zone]
    );
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
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            {t.pageTitle}
          </h1>
          <p className="text-base leading-relaxed text-muted-foreground">
            {t.pageDescription}
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{t.formTitle}</CardTitle>
            <CardDescription>{t.formSubtitle}</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-8" onSubmit={onSubmit} dir={dir}>
              <div className="space-y-3">
                <p className="text-sm font-medium text-foreground">{t.feverLabel}</p>
                <div
                  className={cn(
                    "flex flex-col gap-4 sm:flex-row sm:items-end",
                    dir === "rtl" && "sm:flex-row-reverse"
                  )}
                >
                  <div className="flex items-end gap-4">
                    <div className="relative flex h-44 w-14 flex-col items-center rounded-full border border-input bg-muted/40 px-3 py-3">
                      <div className="absolute inset-y-3 start-1/2 w-1 -translate-x-1/2 rounded-full bg-border" />
                      <div
                        className="pointer-events-none absolute inset-x-6 bottom-3 rounded-full bg-primary/30"
                        style={{ height: `calc(${thermometerPercent}% * 0.88)` }}
                      />
                      <input
                        aria-label={t.feverLabel}
                        type="range"
                        min={35}
                        max={41}
                        step={0.1}
                        value={feverC}
                        onChange={(e) => onFeverChange(parseFloat(e.target.value))}
                        className="aman-thermometer-slider absolute inset-0 h-full w-full"
                      />
                      <Thermometer
                        className="pointer-events-none absolute -start-7 h-4 w-4 text-primary"
                        style={{ bottom: thermometerBottom }}
                        aria-hidden
                      />
                    </div>
                    <div className="space-y-1 pb-1">
                      <p className="text-2xl font-semibold tabular-nums text-foreground">
                        {formatTemp(feverC)}
                        <span className="ms-1 text-base font-medium text-muted-foreground">
                          {t.feverUnit}
                        </span>
                      </p>
                      <p className="text-xs text-muted-foreground">35.0 - 41.0</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground sm:pb-2">
                    {t.feverHint}
                  </p>
                </div>
                {showFeverBanner && (
                  <div
                    className={cn(
                      "flex gap-3 rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive",
                      dir === "rtl" ? "flex-row-reverse text-end" : "text-start"
                    )}
                    role="status"
                    aria-live="assertive"
                  >
                    <AlertTriangle
                      className="mt-0.5 h-5 w-5 shrink-0"
                      aria-hidden
                    />
                    <span>{t.feverInlineWarning}</span>
                  </div>
                )}
              </div>

              <fieldset className="space-y-3 border-0 p-0">
                <legend className="mb-3 text-sm font-medium text-foreground">
                  {t.coughLabel}
                </legend>
                <div
                  className={cn(
                    "flex flex-wrap gap-4",
                    dir === "rtl" && "flex-row-reverse"
                  )}
                >
                  <label className="flex cursor-pointer items-center gap-2 text-sm">
                    <input
                      type="radio"
                      name="cough"
                      checked={cough === "yes"}
                      onChange={() => setCough("yes")}
                      className="size-4 accent-primary"
                    />
                    {t.coughYes}
                  </label>
                  <label className="flex cursor-pointer items-center gap-2 text-sm">
                    <input
                      type="radio"
                      name="cough"
                      checked={cough === "no"}
                      onChange={() => setCough("no")}
                      className="size-4 accent-primary"
                    />
                    {t.coughNo}
                  </label>
                </div>
              </fieldset>

              <fieldset className="space-y-3 border-0 p-0">
                <legend className="mb-1 text-sm font-medium text-foreground">
                  {t.bodyMapLabel}
                </legend>
                <p className="text-sm text-muted-foreground">{t.bodyMapHint}</p>
                <BodyMap
                  selected={selectedZones}
                  onToggle={toggleZone}
                  labels={{
                    head: t.bodyHead,
                    throat: t.bodyThroat,
                    chest: t.bodyChest,
                    stomach: t.bodyStomach,
                  }}
                />
              </fieldset>

              <fieldset className="space-y-3 border-0 p-0">
                <legend className="mb-1 text-sm font-medium text-foreground">
                  {t.nauseaLabel}
                </legend>
                <p className="text-sm text-muted-foreground">{t.nauseaHint}</p>
                <p className="text-xs text-muted-foreground">{t.nauseaScale}</p>
                <div
                  className={cn(
                    "flex flex-wrap gap-3",
                    dir === "rtl" && "flex-row-reverse"
                  )}
                >
                  {([1, 2, 3, 4, 5] as const).map((n) => (
                    <label
                      key={n}
                      className="flex min-w-[2.75rem] cursor-pointer flex-col items-center gap-1 rounded-lg border border-input bg-background px-3 py-2 text-sm has-[:checked]:border-primary has-[:checked]:bg-accent"
                    >
                      <input
                        type="radio"
                        name="nausea"
                        checked={nausea === n}
                        onChange={() => setNausea(n)}
                        className="sr-only"
                      />
                      <span className="font-medium tabular-nums">{n}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <Button type="submit" className="w-full sm:w-auto">
                {t.submit}
              </Button>
              {saved && (
                <p className="aman-fade-up text-sm text-primary">
                  {t.saved}
                </p>
              )}
            </form>
          </CardContent>
        </Card>
      </main>

      <Dialog open={showFeverModal} modal>
        <DialogContent
          hideClose
          className="border-destructive/40"
          onPointerDownOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
          onInteractOutside={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <div
              className={cn(
                "flex gap-3",
                dir === "rtl" ? "flex-row-reverse text-end" : "text-start"
              )}
            >
              <AlertTriangle
                className="mt-0.5 h-6 w-6 shrink-0 text-destructive"
                aria-hidden
              />
              <div className="space-y-2">
                <DialogTitle className="text-destructive">
                  {t.feverAlertTitle}
                </DialogTitle>
                <DialogDescription className="text-base text-foreground">
                  {t.feverAlertBody}
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
          <DialogFooter className={cn(dir === "rtl" && "sm:flex-row-reverse")}>
            <Button
              type="button"
              className="w-full sm:w-auto"
              onClick={() => setFeverModalDismissed(true)}
            >
              {t.feverAlertDismiss}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
