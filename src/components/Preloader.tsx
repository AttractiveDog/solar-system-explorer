import { ShaderAnimation } from "@/components/UI/shader-animation";
import { useEffect, useState } from "react";

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const [isVisible, setIsVisible] = useState(true);
  const [scale, setScale] = useState(0.3); // Start small

  useEffect(() => {
    // Animate scale up immediately
    const scaleTimer = setTimeout(() => {
      setScale(1); // Grow to full size
    }, 100);

    // Simulate loading time or wait for assets
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 500); // Reduced delay for quicker transition
    }, 2800); // Show for 2.8 seconds (matches scale animation)

    return () => {
      clearTimeout(timer);
      clearTimeout(scaleTimer);
    };
  }, [onComplete]);

  // if (!isVisible) return null; // Removed to allow fade-out animation

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
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
        transition: 'transform 2.5s ease-out', // Smooth, gradual easing
      }}>
        COMET
      </span>
    </div>
  );
}
