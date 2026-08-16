import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "IMPACT OS — Youth Opportunity Intelligence Platform",
  description:
    "Find your opportunity. Make your impact. Prove it. An AI-powered platform that matches students with programs and converts verified participation into a lifelong Impact Passport.",
  keywords: [
    "youth opportunities",
    "impact passport",
    "verified credentials",
    "fellowships",
    "hackathons",
    "volunteering",
    "opportunity matching",
    "SDG",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-slate-900">
        <Navbar />
        <div className="flex-1">{children}</div>
      </body>
    </html>
  );
}
