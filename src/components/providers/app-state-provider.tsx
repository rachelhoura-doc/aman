"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
} from "react";

const STORAGE_KEY = "aman-app-state";

type AppState = {
  dosesTaken: boolean[];
  checkInCompleted: boolean;
};

type AppStateContextValue = {
  state: AppState;
  setDoseTaken: (index: number, taken: boolean) => void;
  setCheckInCompleted: (completed: boolean) => void;
};

const DEFAULT_DOSE_COUNT = 8;

const defaultState: AppState = {
  dosesTaken: Array.from({ length: DEFAULT_DOSE_COUNT }, () => false),
  checkInCompleted: false,
};

const AppStateContext = createContext<AppStateContextValue | null>(null);

function emitAppStateChange() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("aman-app-state-change"));
  }
}

function subscribe(onStoreChange: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }
  window.addEventListener("storage", onStoreChange);
  window.addEventListener("aman-app-state-change", onStoreChange);
  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener("aman-app-state-change", onStoreChange);
  };
}

function parseState(raw: string | null): AppState {
  if (!raw) return defaultState;
  try {
    const parsed = JSON.parse(raw) as Partial<AppState>;
    const dosesTaken = Array.isArray(parsed.dosesTaken)
      ? parsed.dosesTaken.slice(0, DEFAULT_DOSE_COUNT).map(Boolean)
      : defaultState.dosesTaken;
    while (dosesTaken.length < DEFAULT_DOSE_COUNT) {
      dosesTaken.push(false);
    }
    return {
      dosesTaken,
      checkInCompleted: Boolean(parsed.checkInCompleted),
    };
  } catch {
    return defaultState;
  }
}

function readState(): AppState {
  if (typeof window === "undefined") return defaultState;
  return parseState(localStorage.getItem(STORAGE_KEY));
}

function getServerState(): AppState {
  return defaultState;
}

function writeState(next: AppState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  emitAppStateChange();
}

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const state = useSyncExternalStore(subscribe, readState, getServerState);

  const setDoseTaken = useCallback(
    (index: number, taken: boolean) => {
      const next = {
        ...state,
        dosesTaken: state.dosesTaken.map((current, i) =>
          i === index ? taken : current
        ),
      };
      writeState(next);
    },
    [state]
  );

  const setCheckInCompleted = useCallback(
    (completed: boolean) => {
      writeState({
        ...state,
        checkInCompleted: completed,
      });
    },
    [state]
  );

  const value = useMemo(
    () => ({ state, setDoseTaken, setCheckInCompleted }),
    [state, setDoseTaken, setCheckInCompleted]
  );

  return (
    <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>
  );
}

export function useAppState() {
  const ctx = useContext(AppStateContext);
  if (!ctx) {
    throw new Error("useAppState must be used within AppStateProvider");
  }
  return ctx;
}
