import type { Locale } from "./messages";

export type EducationMessages = {
  pageTitle: string;
  pageDescription: string;
  backHome: string;
  listen: string;
  stop: string;
  cards: Array<{
    title: string;
    body: string;
  }>;
  nutritionTitle: string;
  nutritionSubtitle: string;
  nutritionRecipes: Array<{
    name: string;
    benefit: string;
  }>;
  listenTextAr: string;
};

export const educationMessages: Record<Locale, EducationMessages> = {
  en: {
    pageTitle: "Education hub",
    pageDescription: "Simple visual explainers for your treatment journey.",
    backHome: "Back to home",
    listen: "Listen in Arabic",
    stop: "Stop",
    cards: [
      {
        title: "What is Chemo?",
        body: "Chemotherapy uses special medicines to destroy cancer cells or slow their growth.",
      },
      {
        title: "Why side effects happen",
        body: "Chemo can also affect healthy fast-growing cells, which may cause tiredness, nausea, or hair changes.",
      },
      {
        title: "How Aman helps",
        body: "Track symptoms, medication, and alerts every day so you can share clearer updates with your care team.",
      },
    ],
    nutritionTitle: "Nutrition & Tradition",
    nutritionSubtitle:
      "Gentle, familiar meals can support energy and recovery after chemotherapy.",
    nutritionRecipes: [
      {
        name: "Shorbat Adas (Lentil Soup)",
        benefit:
          "Rich in plant protein, iron, and folate, helping with strength and tissue repair while being easy to digest.",
      },
      {
        name: "Yakhnet Khodar (Vegetable Stew)",
        benefit:
          "Provides hydration, vitamins, and soft fiber that may feel gentler during nausea or reduced appetite.",
      },
    ],
    listenTextAr:
      "العلاج الكيميائي هو أدوية خاصة تساعد على تدمير الخلايا السرطانية أو إبطاء نموها. بعض الآثار الجانبية ممكنة، لذلك المتابعة اليومية تساعدك أنت وفريق الرعاية.",
  },
  ar: {
    pageTitle: "التثقيف الصحي",
    pageDescription: "بطاقات بصرية بسيطة تشرح رحلة العلاج.",
    backHome: "العودة للرئيسية",
    listen: "استمع بالعربية",
    stop: "إيقاف",
    cards: [
      {
        title: "ما هو العلاج الكيميائي؟",
        body: "العلاج الكيميائي يستخدم أدوية خاصة لتدمير الخلايا السرطانية أو إبطاء نموها.",
      },
      {
        title: "لماذا تظهر آثار جانبية؟",
        body: "قد يؤثر العلاج أيضًا على خلايا سليمة سريعة النمو، لذلك قد يحدث تعب أو غثيان أو تغيّرات في الشعر.",
      },
      {
        title: "كيف يساعدك أمان؟",
        body: "يساعدك على متابعة الأعراض والأدوية والتنبيهات يوميًا لمشاركة معلومات أوضح مع فريق الرعاية.",
      },
    ],
    nutritionTitle: "التغذية والتقاليد",
    nutritionSubtitle:
      "الوجبات المألوفة والخفيفة قد تساعد على استعادة الطاقة والتعافي بعد العلاج الكيميائي.",
    nutritionRecipes: [
      {
        name: "شوربة عدس",
        benefit:
          "غنية بالبروتين النباتي والحديد والفولات، ما يدعم القوة وترميم الأنسجة مع سهولة الهضم.",
      },
      {
        name: "يخنة خضار",
        benefit:
          "توفر سوائل وفيتامينات وأليافًا لينة قد تكون ألطف عند الغثيان أو ضعف الشهية.",
      },
    ],
    listenTextAr:
      "العلاج الكيميائي هو أدوية خاصة تساعد على تدمير الخلايا السرطانية أو إبطاء نموها. بعض الآثار الجانبية ممكنة، لذلك المتابعة اليومية تساعدك أنت وفريق الرعاية.",
  },
};
