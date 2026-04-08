import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Noto_Sans, Noto_Sans_Arabic } from "next/font/google";

import { AppStateProvider } from "@/components/providers/app-state-provider";
import { LocaleProvider } from "@/components/providers/locale-provider";

import "./globals.css";

const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-family-sans",
  display: "swap",
});

const notoSansArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-family-arabic",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aman — Home recovery support",
  description:
    "Calm, accessible support for oncology patients recovering at home after chemotherapy.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const locale = cookieStore.get("aman-locale")?.value;
  const isRTL = locale === "ar";

  return (
    <html
      lang={isRTL ? "ar" : "en"}
      dir={isRTL ? "rtl" : "ltr"}
      suppressHydrationWarning
      className={`${notoSans.variable} ${notoSansArabic.variable} h-full antialiased`}
    >
      <body className="min-h-full font-sans">
        <LocaleProvider>
          <AppStateProvider>{children}</AppStateProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
