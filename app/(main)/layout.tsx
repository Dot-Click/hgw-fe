import React from "react";
import { Metadata } from "next";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";

export const metadata: Metadata = {
  title: {
    template: "%s",
    default: "HGW Legend Vault",
  },
  description: "The definitive archive ranking the greatest legends of sport and culture.",
};

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#0A0A0D] isolate font-sans text-slate-100 overflow-x-hidden flex flex-col relative">
      {/* Left Blue Shade - Flipped horizontally */}
      <div
        className="fixed top-[10%] left-0 bottom-0 w-full max-w-[2000px] -z-10 pointer-events-none -translate-x-[55%] bg-center bg-no-repeat bg-contain scale-x-[-1] opacity-100 blur-3xl"
        style={{ backgroundImage: `url('/assets/shade-1.png')` }}
      />

      <div
        className="fixed top-0 right-0 bottom-0 w-full max-w-[1500px] -z-10 pointer-events-none translate-x-[45%] bg-center bg-no-repeat bg-contain opacity-100 blur-3xl"
        style={{ backgroundImage: `url('/assets/shade-1.png')` }}
      />
      
      {/* Decorative Vectors */}
      {/* Decorative Vector Grid - Seamless full screen coverage */}
      <div
        className="fixed inset-0 -z-20 pointer-events-none bg-repeat opacity-10 mix-blend-screen"
        style={{ backgroundImage: `url('/assets/bg-vector.png')`, backgroundSize: '700px' }}
      />

      <div className="relative z-10 flex flex-col flex-1">
        <Navbar />
        <main className="flex-1 w-full relative">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}
