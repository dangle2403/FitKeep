import { useState } from "react";
import { Button } from "./ui/button";
import { signOut, useSession } from "@/lib/auth-client";
import { useNavigate, Link } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { data: session, isPending } = useSession();

  const handleSignOut = async () => {
    try {
      await signOut({
        fetchOptions: {
          onSuccess: () => navigate("/signin"),
        },
      });
    } catch (error) {
      console.error("Sign out failed:", error);
      navigate("/signin");
    }
  };

  const AuthButtons = () => {
    if (isPending) {
      return (
        <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
      );
    }

    if (session?.user) {
      // User is authenticated - show logout button
      return (
        <Button
          variant="ghost"
          className="font-medium text-orange-400 hover:text-orange-500 hover:bg-orange-500/10 rounded-md transition-colors duration-200"
          onClick={() => {
            setMobileOpen(false);
            handleSignOut();
          }}
        >
          Sign Out
        </Button>
      );
    }

    // User is not authenticated - show sign in and sign up buttons
    return (
      <>
        <Link to="/signin">
          <Button
            variant="ghost"
            className="text-md font-medium text-white hover:text-orange-500 hover:bg-orange-500/10 rounded-md transition-colors duration-200 border border-orange-500"
            onClick={() => setMobileOpen(false)}
          >
            Sign In
          </Button>
        </Link>
        <Link to="/signup">
          <Button
            className="text-md font-medium bg-orange-500 hover:bg-orange-600 text-white rounded-md transition-colors duration-200"
            onClick={() => setMobileOpen(false)}
          >
            Sign Up
          </Button>
        </Link>
      </>
    );
  };

  const NavLinks = () => (
    <>
      <Link
        to="/schedule"
        className="text-white hover:text-orange-500 transition-colors duration-200 font-medium"
      >
        Create Schedule
      </Link>
      <Link
        to="/progress"
        className="text-white hover:text-orange-500 transition-colors duration-200 font-medium"
      >
        Track Progress
      </Link>
      <Link
        to="/contact"
        className="text-white hover:text-orange-500 transition-colors duration-200 font-medium"
      >
        Contact Us
      </Link>
      <AuthButtons />
    </>
  );

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-md shadow-md">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <img
              src="/logo.png"
              alt="FitKeep Logo"
              className="h-12 w-auto transition-transform duration-200 group-hover:scale-105"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLinks />
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  mobileOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </Button>
        </div>

        {/* Mobile Dropdown */}
        {mobileOpen && (
          <div className="absolute right-4 mt-2 w-56 rounded-xl shadow-lg bg-black/70 backdrop-blur-md ring-1 ring-white/20 md:hidden">
            <div className="py-2 flex flex-col">
              <Link
                to="/schedule"
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-2 text-sm text-white hover:text-orange-500 hover:bg-white/10 rounded-md"
              >
                Create Schedule
              </Link>
              <Link
                to="/progress"
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-2 text-sm text-white hover:text-orange-500 hover:bg-white/10 rounded-md"
              >
                Track Progress
              </Link>
              <Link
                to="/contact"
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-2 text-sm text-white hover:text-orange-500 hover:bg-white/10 rounded-md"
              >
                Contact Us
              </Link>

              {/* Mobile Auth Buttons */}
              {isPending ? (
                <div className="flex justify-center py-2">
                  <div className="w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : session?.user ? (
                // User is authenticated - show logout button
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    handleSignOut();
                  }}
                  className="w-full text-left block px-4 py-2 text-sm text-orange-400 hover:text-orange-500 hover:bg-orange-500/10 rounded-md transition-colors duration-200"
                >
                  Sign Out
                </button>
              ) : (
                // User is not authenticated - show sign in and sign up buttons
                <>
                  <Link
                    to="/signin"
                    onClick={() => setMobileOpen(false)}
                    className="block px-4 py-2 text-sm text-white hover:text-orange-500 hover:bg-white/10 rounded-md"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setMobileOpen(false)}
                    className="block px-4 py-2 text-sm text-center bg-orange-500 hover:bg-orange-600 text-white rounded-md mx-2 transition-colors duration-200"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
