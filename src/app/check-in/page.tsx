import type { Metadata } from "next";

import { SymptomCheckInForm } from "@/components/check-in/symptom-check-in-form";

export const metadata: Metadata = {
  title: "Daily check-in — Aman",
  description:
    "Log fever, cough, and nausea during home recovery. Aman supports Arabic and English.",
};

export default function CheckInPage() {
  return <SymptomCheckInForm />;
}
