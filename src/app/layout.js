import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ScrollFix from "@/components/ScrollFix";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "NMIT Hacks 2026",
  description: "Created by NMIT Hacks",
  icons: {
    icon: "/assets/Favicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}
      >
        <ScrollFix />
        {children}
      </body>
    </html>
  );
}
