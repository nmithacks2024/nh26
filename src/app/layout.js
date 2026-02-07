import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ScrollFix from "@/components/ScrollFix";
import Script from "next/script";

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
        
        {/* Devfolio Verification – STATIC (DO NOT MOVE / ANIMATE) */}
        <section style={{ textAlign: "center", padding: "24px 0" }}>
          <h2>Sponsors</h2>
          <a href="https://devfolio.co">
            <img src="/assets/Devfolio.png" alt="Devfolio" height="48" />
          </a>
        </section>

        <Script
          src="https://apply.devfolio.co/v2/sdk.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}


