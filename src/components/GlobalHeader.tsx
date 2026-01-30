import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, User, LogOut, Menu } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/UI/button';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/UI/sheet";
import { toast } from 'sonner';
import { SESSION_START_TIME } from '@/utils/sessionTime';
import { useIsMobile } from '@/hooks/use-mobile';

const GlobalHeader = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, signOut } = useAuth();
    const isMobile = useIsMobile();

    const [missionTime, setMissionTime] = useState('00:00:00');
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const updateTime = () => {
            const now = Date.now();
            const diff = now - SESSION_START_TIME;
            const hours = Math.floor(diff / 3600000);
            const minutes = Math.floor((diff % 3600000) / 60000);
            const seconds = Math.floor((diff % 60000) / 1000);
            setMissionTime(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
        };

        const timer = setInterval(updateTime, 1000);
        updateTime(); // Initial call

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleSignOut = async () => {
        try {
            await signOut();
            toast.success('Signed out successfully');
            navigate('/login');
        } catch (error) {
            console.error('Sign out error:', error);
            toast.error('Failed to sign out');
        }
    };

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 flex md:grid md:grid-cols-3 justify-between items-center px-4 md:px-8 py-2 md:py-4 transition-all duration-300 ${isScrolled
                    ? 'bg-[#050510]/80 backdrop-blur-md border-b border-white/10 h-16 md:h-24'
                    : 'bg-transparent border-transparent h-20 md:h-28'
                }`}
        >
            {/* Left: Back Button (with spacing for HBTU Logo) */}
            <div className="flex items-center ml-16 md:ml-24">
                {location.pathname !== '/' && (
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center gap-2 px-3 md:px-4 py-2 text-xs font-semibold tracking-wider text-gray-300 uppercase transition-all border rounded hover:text-white border-white/20 hover:border-accent-cyan hover:bg-accent-cyan/10"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span className="hidden md:inline">Back</span>
                    </button>
                )}
            </div>

            {/* Center: COMET Logo */}
            <div className="flex justify-center items-center">
                <span
                    style={{
                        fontFamily: 'Okaluera, sans-serif',
                        // Responsive font size logic moved to class or keeping inline style with dynamic value if needed
                        fontSize: isMobile ? '1.8rem' : '3rem',
                        color: 'rgba(255, 255, 255, 0.9)',
                        letterSpacing: '0.05em',
                        lineHeight: 1,
                        paddingTop: '0.2em'
                    }}
                    className="transition-all duration-300"
                >
                    COMET
                </span>
            </div>

            {/* Right: Actions (Desktop) / Menu (Mobile) */}
            <div className="flex items-center justify-end gap-6">

                {/* Mobile Menu Trigger */}
                <div className="md:hidden">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                                <Menu className="w-6 h-6" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[300px] border-white/20 bg-[#050510]/95 backdrop-blur-xl text-white">
                            <SheetHeader className="mb-8 border-b border-white/10 pb-4">
                                <SheetTitle className="text-left font-display text-2xl text-white">MISSION CONTROL</SheetTitle>
                            </SheetHeader>

                            <div className="flex flex-col gap-6">
                                {/* Mission Time Mobile */}
                                <div className="space-y-2">
                                    <p className="text-[10px] text-gray-400 font-display tracking-widest uppercase">Mission Time</p>
                                    <p className="text-3xl font-display text-cyan-400 font-bold tracking-widest tabular-nums drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]">
                                        {missionTime}
                                    </p>
                                </div>

                                {/* User Section Mobile */}
                                {user ? (
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3 p-3 rounded-lg border border-white/10 bg-white/5">
                                            <div className="w-10 h-10 rounded-full overflow-hidden border border-white/20 bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                                                {user.photoURL ? (
                                                    <img src={user.photoURL} alt={user.displayName || 'User'} className="w-full h-full object-cover" />
                                                ) : (
                                                    <User className="w-5 h-5 text-white" />
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm font-bold text-white truncate">{user.displayName || 'Astronaut'}</p>
                                                <p className="text-xs text-gray-400 truncate">{user.email}</p>
                                            </div>
                                        </div>

                                        <Button
                                            onClick={handleSignOut}
                                            variant="destructive"
                                            className="w-full justify-start gap-2"
                                        >
                                            <LogOut className="w-4 h-4" />
                                            Sign Out
                                        </Button>
                                    </div>
                                ) : (
                                    <Button onClick={() => navigate('/login')} className="w-full">
                                        Sign In
                                    </Button>
                                )}

                                <div className="mt-auto pt-8">
                                    <div className="w-full p-4 rounded border border-white/20 bg-black/50 text-center">
                                        <span className="text-xs font-bold text-gray-500">ORG ACCESS</span>
                                    </div>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>

                {/* Desktop Content */}
                <div className="hidden md:flex items-center justify-end gap-6">
                    <div className="text-right block">
                        <p className="text-[10px] text-gray-400 font-display tracking-widest uppercase">Mission Time</p>
                        <p className="text-xl font-display text-cyan-400 font-bold tracking-widest tabular-nums drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]">
                            {missionTime}
                        </p>
                    </div>

                    {user && (
                        <div className="flex items-center gap-3">
                            {/* User Avatar/Info */}
                            <div className="w-10 h-10 rounded-full overflow-hidden border border-white/20 bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                                {user.photoURL ? (
                                    <img src={user.photoURL} alt={user.displayName || 'User'} className="w-full h-full object-cover" />
                                ) : (
                                    <User className="w-5 h-5 text-white" />
                                )}
                            </div>

                            {/* Sign Out Button - Styled consistently */}
                            <button
                                onClick={handleSignOut}
                                className="p-2 transition-colors rounded-full hover:bg-white/10 text-gray-300 hover:text-white border border-white/10"
                                title="Sign Out"
                            >
                                <LogOut className="w-5 h-5" />
                            </button>
                        </div>
                    )}

                    <div className="w-10 h-10 overflow-hidden border rounded border-white/20 bg-black/50 hidden sm:block">
                        <div className="w-full h-full flex items-center justify-center text-xs font-bold text-gray-500">ORG</div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default GlobalHeader;
