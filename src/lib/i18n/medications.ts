import type { Locale } from "./messages";

export type MedicationsMessages = {
  pageTitle: string;
  pageDescription: string;
  backHome: string;
  blisterTitle: string;
  blisterHint: string;
  missedDoseTitle: string;
  missedDoseBody: string;
  takenLabel: string;
  pendingLabel: string;
};

export const medicationsMessages: Record<Locale, MedicationsMessages> = {
  en: {
    pageTitle: "Medications",
    pageDescription: "Tap each pill once you take it.",
    backHome: "Back to home",
    blisterTitle: "Blister pack",
    blisterHint: "Pills pop when marked as taken.",
    missedDoseTitle: "Missed dose alert",
    missedDoseBody: "One or more scheduled doses look overdue. Contact care team if unsure.",
    takenLabel: "Taken",
    pendingLabel: "Pending",
  },
  ar: {
    pageTitle: "الأدوية",
    pageDescription: "اضغط على الحبة بعد تناولها.",
    backHome: "العودة للرئيسية",
    blisterTitle: "شريط الدواء",
    blisterHint: "تتحرك الحبة عند تحديدها كمأخوذة.",
    missedDoseTitle: "تنبيه جرعة فائتة",
    missedDoseBody:
      "تبدو جرعة واحدة أو أكثر متأخرة عن موعدها. تواصل مع فريق الرعاية عند الحاجة.",
    takenLabel: "تم تناولها",
    pendingLabel: "قيد الانتظار",
  },
};
