import { Scene } from '@/components/SolarSystem/Scene';
import { HUD } from '@/components/UI/HUD';

const Index = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-background">
      {/* 3D Solar System Scene */}
      <Scene />
      
      {/* HUD Overlay */}
      <HUD />
    </div>
  );
};

export default Index;
