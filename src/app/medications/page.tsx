import type { Metadata } from "next";

import { MedicationsBlisterPack } from "@/components/medications/medications-blister-pack";

export const metadata: Metadata = {
  title: "Medications — Aman",
  description: "Track your scheduled doses with a visual blister pack.",
};

export default function MedicationsPage() {
  return <MedicationsBlisterPack />;
}
