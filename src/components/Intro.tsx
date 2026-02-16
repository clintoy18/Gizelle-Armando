import { useEffect, useState } from "react";

interface IntroProps {
  onComplete: () => void;
}

export function Intro({ onComplete }: IntroProps) {
  const [isExiting, setIsExiting] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Lora:wght@400;500&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const handleStart = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
      onComplete();
    }, 1200);
  };

  if (!isVisible) return null;

  const colors = {
    paper: "#FBFBF9",
    ink: "#2D2926",
    gold: "#BFAF80",
  };

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-between py-16 px-6 cursor-pointer transition-all duration-1000 ease-in-out
        ${isExiting ? "translate-y-[-100%] opacity-0" : "translate-y-0 opacity-100"}`}
      style={{ backgroundColor: colors.paper }}
      onClick={handleStart}
    >
      {/* 1. Top Detail (Floating Anchor) */}
      <div className="w-full text-center">
        <p
          className="text-[12px] sm:text-sm tracking-[0.4em] uppercase opacity-60"
          style={{ fontFamily: "'Lora', serif", color: colors.ink }}
        >
          Est. April 2026
        </p>
      </div>

      {/* 2. Main Content (Centered) */}
      <div className="relative z-10 w-full text-center flex flex-col items-center justify-center">
        {/* Name 1 - Large, Bold, Command Presence */}
        <h1
          className="text-[clamp(5rem,20vw,14rem)] font-semibold leading-[0.9] tracking-tight animate-fade-in-up"
          style={{
            fontFamily: "'Playfair Display', serif",
            color: colors.ink,
          }}
        >
          Armando
        </h1>

        {/* Separator - Elegant Italic Ampersand */}
        <div className="py-2 md:py-4 animate-fade-in opacity-40">
          <span
            className="text-[clamp(4rem,12vw,7rem)] italic"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: colors.gold,
            }}
          >
            &  
          </span>
        </div>

        {/* Name 2 - Matching Scale */}
        <h1
          className="text-[clamp(5rem,20vw,14rem)] font-semibold leading-[0.9] tracking-tight animate-fade-in-up delay-200"
          style={{
            fontFamily: "'Playfair Display', serif",
            color: colors.ink,
          }}
        >
          Gee
        </h1>

        {/* Entry Prompt - Large enough to be the clear instruction */}
        <div className="mt-16 md:mt-24">
          <p
            className="text-[clamp(1.5rem,5vw,2rem)] tracking-[0.3em] uppercase opacity-60 animate-pulse"
            style={{
              fontFamily: "'Lora', serif",
              color: colors.ink,
            }}
          >
            Tap to enter
          </p>
        </div>
      </div>

      {/* 3. Footer (Interaction area) */}
      <div className="w-full text-center space-y-8">
        <div className="space-y-2">
          <p
            className="text-[12px] sm:text-sm tracking-[0.3em] uppercase"
            style={{ fontFamily: "'Lora', serif", color: colors.gold }}
          >
            The Celebration Begins
          </p>
        </div>

        <div className="flex flex-col items-center gap-3">
          <span
            className="text-[11px] tracking-[0.5em] uppercase opacity-40 animate-pulse"
            style={{ color: colors.ink }}
          >
            Tap to Open
          </span>
          {/* Minimalist divider line that grows */}
          <div className="h-16 w-[1px] bg-gradient-to-b from-[#BFAF80] to-transparent" />
        </div>
      </div>

      {/* Luxury Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
    </div>
  );
}