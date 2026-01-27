import { useLocation } from 'react-router-dom';

export const CometLogo = () => {
    const location = useLocation();

    // Do not show on landing page
    if (location.pathname === '/') return null;

    return (
        <div className="fixed top-4 left-4 z-[2000] w-32 md:w-40 opacity-90 hover:opacity-100 transition-opacity pointer-events-none mix-blend-screen">
            <img
                src="/comet-logo.png"
                alt="COMET"
                className="w-full h-auto"
            />
        </div>
    );
};
