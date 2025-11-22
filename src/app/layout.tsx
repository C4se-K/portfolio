import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";


import Scroll from "@/components/Scroll";
import SVGPath from "@/components/SVGPath";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Smooth page transitions test",
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export default function RootLayout({ children }: { children: React.ReactNode }) {



  return (
    <html lang="en">
      <body className="moving-gradient">


        <a
          href="https://example.com"
          target="blank"
          rel="noopener noreferrer"
        >
          <button className="fixed top-16 right-16 z-50 px-8 py-4 bg-blue-600 font-semibold text-white rounded-xl shadow-xl">
            Resume
          </button>
        </a>

        {children}
      </body>
    </html>
  );
}
