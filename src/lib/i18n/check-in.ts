import type { Locale } from "./messages";

export type CheckInMessages = {
  pageTitle: string;
  pageDescription: string;
  backHome: string;
  formTitle: string;
  formSubtitle: string;
  feverLabel: string;
  feverHint: string;
  feverUnit: string;
  coughLabel: string;
  coughYes: string;
  coughNo: string;
  nauseaLabel: string;
  nauseaScale: string;
  nauseaHint: string;
  submit: string;
  feverAlertTitle: string;
  feverAlertBody: string;
  feverAlertDismiss: string;
  feverInlineWarning: string;
  bodyMapLabel: string;
  bodyMapHint: string;
  bodyHead: string;
  bodyThroat: string;
  bodyChest: string;
  bodyStomach: string;
  saved: string;
};

export const checkInMessages: Record<Locale, CheckInMessages> = {
  en: {
    pageTitle: "Daily check-in",
    pageDescription: "Log your symptoms for today.",
    backHome: "Back to home",
    formTitle: "Symptom check-in",
    formSubtitle: "Enter your temperature in °C and answer the questions below.",
    feverLabel: "Temperature (°C)",
    feverHint: "Fever is above 38 °C (100.4 °F).",
    feverUnit: "°C",
    coughLabel: "Cough",
    coughYes: "Yes",
    coughNo: "No",
    nauseaLabel: "Nausea",
    nauseaScale: "1 = none, 5 = severe",
    nauseaHint: "Rate how nauseated you feel right now.",
    submit: "Save check-in",
    feverAlertTitle: "High Fever Detected",
    feverAlertBody:
      "Please contact your oncology team at [Placeholder Number] immediately.",
    feverAlertDismiss: "I understand",
    feverInlineWarning:
      "Your temperature is still above 38 °C. Contact your oncology team at [Placeholder Number].",
    bodyMapLabel: "Where do you feel pain or cough?",
    bodyMapHint: "Tap one or more areas on the body map.",
    bodyHead: "Head",
    bodyThroat: "Throat",
    bodyChest: "Chest",
    bodyStomach: "Stomach",
    saved: "Check-in saved.",
  },
  ar: {
    pageTitle: "تسجيل يومي",
    pageDescription: "سجّل أعراضك لهذا اليوم.",
    backHome: "العودة للرئيسية",
    formTitle: "متابعة الأعراض",
    formSubtitle:
      "أدخل درجة الحرارة بالدرجة المئوية (°م) وأجب عن الأسئلة أدناه.",
    feverLabel: "درجة الحرارة (°م)",
    feverHint: "تُعد الحمى أعلى من ٣٨°م (١٠٠٫٤°ف).",
    feverUnit: "°م",
    coughLabel: "السعال",
    coughYes: "نعم",
    coughNo: "لا",
    nauseaLabel: "الغثيان",
    nauseaScale: "١ = لا يوجد، ٥ = شديد",
    nauseaHint: "قيّم شعورك بالغثيان الآن.",
    submit: "حفظ التسجيل",
    feverAlertTitle: "تم رصد حمى مرتفعة",
    feverAlertBody:
      "يُرجى الاتصال بفريق الأورام لديك على [Placeholder Number] فورًا.",
    feverAlertDismiss: "فهمت",
    feverInlineWarning:
      "درجة حرارتك ما زالت أعلى من ٣٨°م. تواصل مع فريق الأورام على [Placeholder Number].",
    bodyMapLabel: "أين تشعر بالألم أو السعال؟",
    bodyMapHint: "اضغط على منطقة أو أكثر في خريطة الجسم.",
    bodyHead: "الرأس",
    bodyThroat: "الحلق",
    bodyChest: "الصدر",
    bodyStomach: "المعدة",
    saved: "تم حفظ التسجيل اليومي.",
  },
};
