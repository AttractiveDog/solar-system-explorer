import { Toaster } from "@/components/UI/toaster";
import { Toaster as Sonner } from "@/components/UI/sonner";
import { TooltipProvider } from "@/components/UI/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import AuthHeader from "@/components/AuthHeader";
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
import { CometLogo } from "@/components/UI/CometLogo";

const queryClient = new QueryClient();

const NavbarWrapper = () => {
  const location = useLocation();
  const hideNavbarPaths = ["/", "/stratathon"];

  if (hideNavbarPaths.includes(location.pathname)) {
    return null;
  }

  return <AuthHeader />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />

        {/* University Logo - Fixed in top right */}
        <div className="fixed top-2 right-2 md:top-4 md:right-4 z-[2000] w-14 md:w-20 lg:w-28 opacity-90 hover:opacity-100 transition-opacity pointer-events-none mix-blend-screen">
          <img
            src="/hbtu-logo.png"
            alt="HBTU Logo"
            className="w-full h-auto filter invert"
          />
        </div>

        <BrowserRouter>
          <NavbarWrapper />
          <CometLogo />
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
