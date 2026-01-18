import { ShaderAnimation } from "@/components/UI/shader-animation";
import { useEffect, useState } from "react";

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Simulate loading time or wait for assets
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 1000); // Wait for fade out animation (matches duration-1000)
    }, 3000); // Show for 3 seconds

    return () => clearTimeout(timer);
  }, [onComplete]);

// if (!isVisible) return null; // Removed to allow fade-out animation

  return (
    <div 
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
    >
      <div className="absolute inset-0">
        <ShaderAnimation />
      </div>
      <span className="absolute pointer-events-none z-10 text-center text-5xl md:text-7xl leading-none font-semibold tracking-tighter whitespace-pre-wrap text-white mix-blend-difference">
        COMET<br/>
        <span className="text-2xl md:text-3xl tracking-widest font-normal opacity-80">SYSTEM EXPLORER</span>
      </span>
    </div>
  );
}
