import type { Metadata } from "next";
import { Geist, Geist_Mono, Outfit, Orbitron } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HGW Legend Vault",
  description: "The definitive archive ranking the greatest legends of sport and culture.",
  keywords: ["Legends", "Sports", "Culture", "Archive", "Rankings"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html 
      lang="en" 
      className={`${geistSans.variable} ${geistMono.variable} ${outfit.variable} ${orbitron.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col bg-white text-black dark:bg-[#0D0E12] dark:text-white">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
