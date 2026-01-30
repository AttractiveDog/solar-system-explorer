import { useState, useEffect } from 'react';
import { SESSION_START_TIME } from '@/utils/sessionTime';

export const HUD = () => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const updateTime = () => {
      const seconds = Math.floor((Date.now() - SESSION_START_TIME) / 1000);
      setTime(seconds);
    };

    const interval = setInterval(updateTime, 1000);
    updateTime(); // Initial update
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="absolute inset-0 pointer-events-none z-10">
      {/* Top header */}
      <div className="absolute top-0 left-0 right-0 p-4 md:p-6 flex justify-between items-start">
        {/* Logo moved to Sun */}
        <div></div>

        <div className="flex flex-col items-end gap-1 mr-14 md:mr-32">
          <div className="text-[0.6rem] md:text-xs text-muted-foreground tracking-widest">MISSION TIME</div>
          <div className="font-display text-base md:text-xl text-secondary tracking-wider">
            {formatTime(time)}
          </div>
        </div>
      </div>

      {/* Bottom info panel - Hidden on mobile */}
      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 hidden md:block">
        <div className="flex flex-wrap justify-between items-end gap-4">
          {/* Planet legend */}
          <div className="flex flex-col gap-3">
            <div className="text-xs text-muted-foreground tracking-widest uppercase mb-1">
              Celestial Bodies
            </div>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[hsl(210,60%,50%)] shadow-[0_0_10px_hsl(210,60%,50%)]" />
                <span className="text-sm text-foreground/80">C\odex</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[hsl(15,80%,45%)] shadow-[0_0_10px_hsl(15,80%,45%)]" />
                <span className="text-sm text-foreground/80">C\ube</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[hsl(165,80%,42%)] shadow-[0_0_10px_hsl(165,80%,42%)]" />
                <span className="text-sm text-foreground/80">F\inamics</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[hsl(270,50%,30%)] shadow-[0_0_10px_hsl(270,50%,30%)] opacity-60" />
                <span className="text-sm text-foreground/50 italic">Unknown-1</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[hsl(240,40%,15%)] shadow-[0_0_10px_hsl(240,40%,15%)] opacity-60" />
                <span className="text-sm text-foreground/50 italic">Unknown-2</span>
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="flex flex-col items-end gap-1">
            <div className="text-xs text-muted-foreground tracking-widest uppercase">Status</div>
            <div className="text-sm text-foreground/60">
              Orbiting • Active
            </div>
          </div>
        </div>
      </div>

      {/* Corner decorations - Smaller on mobile */}
      <div className="absolute top-0 left-0 w-12 h-12 md:w-20 md:h-20 border-l-2 border-t-2 border-primary/30 m-2 md:m-4" />
      <div className="absolute top-0 right-0 w-12 h-12 md:w-20 md:h-20 border-r-2 border-t-2 border-primary/30 m-2 md:m-4" />
      <div className="absolute bottom-0 left-0 w-12 h-12 md:w-20 md:h-20 border-l-2 border-b-2 border-primary/30 m-2 md:m-4" />
      <div className="absolute bottom-0 right-0 w-12 h-12 md:w-20 md:h-20 border-r-2 border-b-2 border-primary/30 m-2 md:m-4" />
    </div>
  );
};
