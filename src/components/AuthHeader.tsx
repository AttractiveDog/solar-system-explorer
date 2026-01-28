import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/UI/button';
import { LogOut, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const AuthHeader = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

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
    <div className="fixed top-0 right-16 md:right-28 z-[2001] p-4 flex items-center gap-3">
      {user ? (
        <>
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
            <div className="w-8 h-8 rounded-full overflow-hidden bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName || 'User'}
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-4 h-4 text-white" />
              )}
            </div>
            <span className="text-white text-sm font-medium hidden sm:inline">
              {user.displayName || user.email}
            </span>
          </div>
          <Button
            onClick={handleSignOut}
            variant="ghost"
            size="icon"
            className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white rounded-full border border-white/20"
            title="Sign out"
          >
            <LogOut className="w-4 h-4" />
          </Button>
        </>
      ) : (
        <Button
          onClick={() => navigate('/login')}
          className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white rounded-full border border-white/20 px-6"
        >
          Sign In
        </Button>
      )}
    </div>
  );
};

export default AuthHeader;
