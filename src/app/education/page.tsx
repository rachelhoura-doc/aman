import type { Metadata } from "next";

import { EducationVisualCards } from "@/components/education/education-visual-cards";

export const metadata: Metadata = {
  title: "Education hub — Aman",
  description: "Visual cards that explain chemotherapy in simple language.",
};

export default function EducationPage() {
  return <EducationVisualCards />;
}
