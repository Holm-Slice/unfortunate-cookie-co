"use client";

import { useState } from "react";
import { Fortune } from "@/types";

export function FortuneCookie() {
  const [fortune, setFortune] = useState<Fortune | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLightMode, setIsLightMode] =
    useState(false); /* Default: dark/unfortunate */
  const [rotation, setRotation] = useState(0); /* Track total rotation */

  /* Toggle between light/dark mode */
  function toggleMode() {
    if (isAnimating) return;

    setIsAnimating(true);
    setFortune(null); /* Clear current fortune when switching */

    /* Subtract 180 degrees for counter-clockwise rotation */
    setRotation((prev) => prev - 180);

    setTimeout(() => {
      setIsLightMode(!isLightMode);
      setIsAnimating(false);
    }, 1000);
  }
  /* Get fortune based on current mode */
  async function getFortune() {
    if (isAnimating || isLoading) return;

    setIsLoading(true);

    try {
      const type = isLightMode ? "fortunate" : "unfortunate";
      const response = await fetch(`/api/fortune?type=${type}`);
      const data = await response.json();
      setFortune(data);
    } catch (error) {
      console.error("Failed to fetch fortune", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div
      className={`min-h-screen w-full flex flex-col items-center justify-center transition-colors duration-1000 ${
        isLightMode ? "bg-white" : "bg-black"
      }`}
    >
      {/* Title */}
      <h1
        className={`text-4xl md:text-5xl font-bold mb-4 transition-colors duration-1000 ${
          isLightMode ? "text-black" : "text-white"
        }`}
        style={{ fontFamily: "Japanese" }}
      >
        🥠 {isLightMode ? "Fortunate" : "Unfortunate"} Cookie Co.
      </h1>

      <p
        className={`mb-8 transition-colors duration-1000 ${
          isLightMode ? "text-gray-700" : "text-gray-400"
        }`}
        style={{ fontFamily: "Japanese" }}
      >
        {isLightMode ? "Feeling lucky today!" : "Embrace the darkness..."}
      </p>

      {/* YIN YANG CIRCLE CONTAINER */}
      <div
        className="relative w-[70vmin] h-[70vmin] rounded-full overflow-hidden transition-all duration-1000 ease-in-out"
        style={{
          transform: `rotate(${rotation}deg)`,
          transformOrigin: "center center",
          boxShadow: isLightMode
            ? "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
            : "0 25px 50px -12px rgba(255, 255, 255, 0.3)",
        }}
      >
        {/* White Half (Right Side) */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-white" />
        {/* Black Half (Left Side) */}
        <div className="absolute top-0 left-0 w-1/2 h-full bg-black" />
        {/* White Bulge (Top) - curves into black side */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[35vmin] h-[35vmin] rounded-full bg-white" />
        {/* Black Bulge (Bottom) - curves into white side */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[35vmin] h-[35vmin] rounded-full bg-black" />

        {/* Black Dot (in white section - top) - SWITCHES TO DARK/UNFORTUNATE */}
        <button
          onClick={() => {
            if (!isLightMode) return; /* Only works in light mode */
            toggleMode();
          }}
          disabled={isAnimating}
          className={`absolute top-[8vmin] left-1/2 w-[8vmin] h-[8vmin] rounded-full bg-black z-10 transition-transform duration-200 ${
            isLightMode ? "cursor-pointer" : "cursor-default"
          }`}
          style={{
            transform: `translateX(-50%) rotate(${-rotation}deg)`,
          }}
          onMouseEnter={(e) => {
            if (isLightMode) {
              e.currentTarget.style.transform = `translateX(-50%) rotate(${-rotation}deg) scale(1.2)`;
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = `translateX(-50%) rotate(${-rotation}deg)`;
          }}
          aria-label="Switch to unfortunate mode"
        />
        {/* White Dot (in black section - bottom) - SWITCHES TO LIGHT/FORTUNATE */}
        <button
          onClick={() => {
            if (isLightMode) return; /* Only works in dark mode */
            toggleMode();
          }}
          disabled={isAnimating}
          className={`absolute bottom-[8vmin] left-1/2 w-[8vmin] h-[8vmin] rounded-full bg-white z-10 transition-transform duration-200 ${
            !isLightMode ? "cursor-pointer" : "cursor-default"
          }`}
          style={{
            transform: `translateX(-50%) rotate(${-rotation}deg)`,
          }}
          onMouseEnter={(e) => {
            if (!isLightMode) {
              e.currentTarget.style.transform = `translateX(-50%) rotate(${-rotation}deg) scale(1.2)`;
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = `translateX(-50%) rotate(${-rotation}deg)`;
          }}
          aria-label="Switch to fortunate mode"
        />
      </div>

      {/* BUTTONS - Only Get Fortune button now */}
      <div className="flex gap-4 mt-8">
        {/* Get Fortune Button */}
        <button
          onClick={getFortune}
          disabled={isAnimating || isLoading}
          className={`px-6 py-3 rounded-full text-lg font-bold transition-all duration-300 hover:scale-105 disabled:opacity-50 ${
            isLightMode
              ? "bg-amber-400 text-black hover:bg-amber-300"
              : "bg-gray-700 text-white hover:bg-gray-600"
          }`}
        >
          {isLoading ? "🔮..." : isLightMode ? "☀️ FAFO" : "🌑 FAFO"}
        </button>
      </div>

      {/* Fortune Display */}
      {fortune && !isAnimating && (
        <div
          className={`max-w-md p-6 rounded-lg text-center mt-8 transition-colors duration-1000 ${
            isLightMode
              ? "bg-amber-100 text-black border border-amber-300"
              : "bg-gray-800 text-white border border-gray-700"
          }`}
        >
          <p className="text-xl italic mb-2">&quot;{fortune.text}&quot;</p>
          <div className="flex justify-center gap-4 text-sm opacity-70">
            <span>Category: {fortune.category}</span>
            <span>•</span>
            <span>
              {fortune.type === "fortunate" ? "☀️ Fortunate" : "🌑 Unfortunate"}
            </span>
          </div>
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <p
          className={`mt-8 transition-colors duration-1000 ${
            isLightMode ? "text-gray-700" : "text-gray-400"
          }`}
        >
          The universe is deciding...
        </p>
      )}
    </div>
  );
}
