export type Locale = "en" | "ar";

export type DashboardMessages = {
  appName: string;
  tagline: string;
  language: string;
  navHome: string;
  greeting: string;
  greetingSub: string;
  cardSymptomsTitle: string;
  cardSymptomsDesc: string;
  cardMedsTitle: string;
  cardMedsDesc: string;
  cardLearnTitle: string;
  cardLearnDesc: string;
  open: string;
  feverBannerTitle: string;
  feverBannerBody: string;
  dailyProgressTitle: string;
  dailyProgressSubtitle: string;
  footerNote: string;
};

export const messages: Record<Locale, DashboardMessages> = {
  en: {
    appName: "Aman",
    tagline: "Calm support for recovery at home",
    language: "Language",
    navHome: "Home",
    greeting: "Hello",
    greetingSub: "Here is your care overview for today.",
    cardSymptomsTitle: "Symptom check-in",
    cardSymptomsDesc: "Log fever, cough, and nausea in seconds.",
    cardMedsTitle: "Medications",
    cardMedsDesc: "See today’s doses and mark them as taken.",
    cardLearnTitle: "Education hub",
    cardLearnDesc: "Understand your treatment with clear visuals.",
    open: "Open",
    feverBannerTitle: "High fever?",
    feverBannerBody:
      "If your temperature is above 38°C, contact your care team right away.",
    dailyProgressTitle: "Daily progress",
    dailyProgressSubtitle: "Meds and check-ins completed today",
    footerNote: "This app supports your care—it does not replace medical advice.",
  },
  ar: {
    appName: "أمان",
    tagline: "دعم هادئ للتعافي في المنزل",
    language: "اللغة",
    navHome: "الرئيسية",
    greeting: "مرحبًا",
    greetingSub: "إليك نظرة على رعايتك لهذا اليوم.",
    cardSymptomsTitle: "متابعة الأعراض",
    cardSymptomsDesc: "سجّل الحمى والسعال والغثيان بسرعة.",
    cardMedsTitle: "الأدوية",
    cardMedsDesc: "اطّلع على جرعات اليوم وعلّم ما تم تناوله.",
    cardLearnTitle: "التثقيف الصحي",
    cardLearnDesc: "افهم علاجك من خلال شرح بسيط ورسوم واضحة.",
    open: "فتح",
    feverBannerTitle: "حمى مرتفعة؟",
    feverBannerBody:
      "إذا كانت درجة حرارتك أعلى من ٣٨°م، تواصل مع فريق الرعاية فورًا.",
    dailyProgressTitle: "تقدّم اليوم",
    dailyProgressSubtitle: "إنجازات الأدوية والتسجيل اليومي",
    footerNote: "هذا التطبيق يدعم رعايتك ولا يغني عن استشارة الطبيب.",
  },
};

export function isLocale(value: string): value is Locale {
  return value === "en" || value === "ar";
}
