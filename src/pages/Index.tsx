import { useState } from 'react';
import { SolarSystem2D } from '@/components/SolarSystem2D/SolarSystem2D';
import { HUD } from '@/components/UI/HUD';
import { Preloader } from '@/components/Preloader';

const Index = () => {
  const [loading, setLoading] = useState(true);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-background">
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      
      <div className="relative w-full h-full">
        {/* 2D Solar System */}
        <SolarSystem2D />
        
        {/* HUD Overlay */}
        <HUD />
      </div>
    </div>
  );
};

export default Index;
