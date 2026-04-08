"use client";

import { Button } from "@/components/ui/button";
import { useLocale } from "@/components/providers/locale-provider";
import type { Locale } from "@/lib/i18n/messages";
import { cn } from "@/lib/utils";

const options: { value: Locale; label: string }[] = [
  { value: "en", label: "English" },
  { value: "ar", label: "العربية" },
];

export function LocaleToggle({ className }: { className?: string }) {
  const { locale, setLocale } = useLocale();

  return (
    <div
      className={cn(
        "inline-flex rounded-lg border border-border bg-muted/50 p-1",
        className
      )}
      role="group"
      aria-label="Language"
    >
      {options.map((opt) => (
        <Button
          key={opt.value}
          type="button"
          variant={locale === opt.value ? "secondary" : "ghost"}
          size="sm"
          className={cn(
            "rounded-md px-3 text-xs font-medium",
            locale === opt.value && "shadow-sm"
          )}
          onClick={() => setLocale(opt.value)}
          aria-pressed={locale === opt.value}
        >
          {opt.label}
        </Button>
      ))}
    </div>
  );
}
