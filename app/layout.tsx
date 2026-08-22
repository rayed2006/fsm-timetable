import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

export const metadata: Metadata = {
  title: "FSM Timetable | FAST School of Management",
  description: "FAST School of Management Course Schedule Directory",
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased text-black bg-[#fafafa] dark:bg-black min-h-screen">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
