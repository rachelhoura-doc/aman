"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
} from "react";

import { type Locale, isLocale } from "@/lib/i18n/messages";

const STORAGE_KEY = "aman-locale";
const COOKIE_KEY = "aman-locale";

type Dir = "ltr" | "rtl";

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  dir: Dir;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

function emitLocaleChange() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("aman-locale-change"));
  }
}

function subscribe(onStoreChange: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }
  window.addEventListener("storage", onStoreChange);
  window.addEventListener("aman-locale-change", onStoreChange);
  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener("aman-locale-change", onStoreChange);
  };
}

function readLocale(): Locale {
  if (typeof window === "undefined") return "en";
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored && isLocale(stored)) return stored;
  return "en";
}

function getServerLocale(): Locale {
  return "en";
}

function getTimeTheme(): "day" | "night" {
  const hour = new Date().getHours();
  return hour >= 19 || hour < 6 ? "night" : "day";
}

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const locale = useSyncExternalStore(subscribe, readLocale, getServerLocale);

  const setLocale = useCallback((next: Locale) => {
    localStorage.setItem(STORAGE_KEY, next);
    document.cookie = `${COOKIE_KEY}=${next}; path=/; max-age=31536000; samesite=lax`;
    emitLocaleChange();
  }, []);

  const dir: Dir = locale === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    const root = document.documentElement;
    root.lang = locale === "ar" ? "ar" : "en";
    root.dir = dir;
    root.dataset.locale = locale;
  }, [locale, dir]);

  useEffect(() => {
    const root = document.documentElement;
    const applyTheme = () => {
      root.dataset.timeTheme = getTimeTheme();
    };

    applyTheme();
    const interval = window.setInterval(applyTheme, 5 * 60 * 1000);
    return () => window.clearInterval(interval);
  }, []);

  const value = useMemo(
    () => ({ locale, setLocale, dir }),
    [locale, setLocale, dir]
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useLocale must be used within LocaleProvider");
  }
  return ctx;
}
