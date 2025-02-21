import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MSquareIcon, Settings, User } from "lucide-react";

/**
 * Navbar Component
 * 
 * Displays the main navigation bar, including:
 * - A logo linking to the homepage
 * - Navigation links to settings and profile
 * - Logout button (only visible if a user is authenticated)
 *
 * @component
 */
const Navbar = () => {
  const { logout, authUser } = useAuthStore(); // Access authentication state and logout function

  return (
    <header
      className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 
      backdrop-blur-lg bg-base-100/80"
    >
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          
          {/* Logo and branding */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
              <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                <MSquareIcon className="w-5 h-5 text-primary" />
              </div>
              <h1 className="text-lg font-bold">GomoChat</h1>
            </Link>
          </div>

          {/* Navigation buttons */}
          <div className="flex items-center gap-2">
            {/* Settings button */}
            <Link
              to="/settings"
              className="btn btn-sm gap-2 transition-colors"
              aria-label="Settings"
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </Link>

            {authUser && (
              <>
                {/* Profile button */}
                <Link to="/profile" className="btn btn-sm gap-2" aria-label="Profile">
                  <User className="size-5" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>

                {/* Logout button */}
                <button className="flex gap-2 items-center" onClick={logout} aria-label="Logout">
                  <LogOut className="size-5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
