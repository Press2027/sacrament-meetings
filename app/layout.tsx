import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

export const metadata: Metadata = {
  title: {
    default: "Sacrament Meeting Planner",
    template: "%s | Sacrament Meeting Planner",
  },
  description:
    "Plan, organize, and manage sacrament meetings, schedules, speakers, hymns, and meeting assignments with the Sacrament Meeting Planner.",
  openGraph: {
    type: "website",
    siteName: "Sacrament Meeting Planner",
    title: "Sacrament Meeting Planner",
    description:
      "A simple tool for planning and managing sacrament meeting schedules and assignments.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sacrament Meeting Planner",
    description:
      "Plan and manage sacrament meeting schedules and assignments.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`${geist.variable} antialiased flex min-h-screen flex-col`}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
