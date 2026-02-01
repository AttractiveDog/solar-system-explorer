
import { ShaderAnimation } from "@/components/ui/shader-animation";
import { useEffect, useState } from "react";

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const [isVisible, setIsVisible] = useState(true);
  const [scale, setScale] = useState(0.3); // Start small

  useEffect(() => {
    // Animate scale up immediately
    const scaleTimer = setTimeout(() => {
      setScale(1); // Grow to full size
    }, 100);

    // Wait for scale animation to complete before fading out
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 600); // Smooth fade-out transition
    }, 3200); // 100ms delay + 2400ms animation + 700ms hold = smooth completion

    return () => {
      clearTimeout(timer);
      clearTimeout(scaleTimer);
    };
  }, [onComplete]);

  // if (!isVisible) return null; // Removed to allow fade-out animation

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
    >
      <div className="absolute inset-0">
        <ShaderAnimation />
      </div>

      <span className="absolute pointer-events-none z-10 text-center" style={{
        fontFamily: 'Okaluera, sans-serif',
        fontSize: '25vw',
        color: 'rgba(255, 255, 255, 1)',
        lineHeight: 1,
        transform: `scale(${scale})`,
        transition: 'transform 2.4s cubic-bezier(0.34, 1.56, 0.64, 1)', // Smooth easing with gentle bounce
      }}>
        COMET
      </span>
    </div>
  );
}
