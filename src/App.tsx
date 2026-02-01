import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
// import AuthHeader from "@/components/AuthHeader"; // Replaced by GlobalHeader
import GlobalHeader from "@/components/GlobalHeader";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import EventLogs from "./pages/EventLogs";
import EventDetail from "./pages/EventDetail";
import Team from "./pages/Team";
import Leaderboard from "./pages/Leaderboard";
import Stratathon from "./pages/Stratathon";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const NavbarWrapper = () => {
  const location = useLocation();
  // Hide only on Stratathon page
  const hideNavbarPaths = ["/stratathon", "/"];

  if (hideNavbarPaths.includes(location.pathname)) {
    return null;
  }

  return <GlobalHeader />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />

        {/* University Logo - Moved to top left */}
        <div className="fixed top-3 left-3 md:top-4 md:left-6 z-[2000] w-14 md:w-16 opacity-90 hover:opacity-100 transition-opacity pointer-events-none mix-blend-screen">
          <img
            src="/hbtu-logo.png"
            alt="HBTU Logo"
            className="w-full h-full object-contain filter invert"
          />
        </div>

        <BrowserRouter>
          <NavbarWrapper />
          {/* <CometLogo /> - Removed as requested to place in center of dashboard */}
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/events" element={<EventLogs />} />
            <Route path="/events/:eventId" element={<EventDetail />} />
            <Route path="/team" element={<Team />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/stratathon" element={<Stratathon />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
