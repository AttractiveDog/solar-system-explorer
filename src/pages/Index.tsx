import { SolarSystem2D } from '@/components/SolarSystem2D/SolarSystem2D';
import { HUD } from '@/components/UI/HUD';

const Index = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-background">
      {/* 2D Solar System */}
      <SolarSystem2D />
      
      {/* HUD Overlay */}
      <HUD />
    </div>
  );
};

export default Index;
