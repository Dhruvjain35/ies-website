import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "International Economic Society",
  description:
    "A global network of 25+ chapters across 20+ countries, advancing economic literacy and fostering the next generation of global economic leaders.",
  keywords: [
    "economics",
    "international",
    "student organization",
    "global network",
    "economic literacy",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-obsidian text-text-primary">
        {children}
      </body>
    </html>
  );
}
