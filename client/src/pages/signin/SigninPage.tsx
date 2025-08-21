import SignInForm from "@/components/SignInForm";
import { Link } from "react-router-dom";
import SignInOauthButton from "@/components/OAuthSignInButton";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getSession } from "@/lib/auth-client";

const SigninPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const checkSession = async () => {
      try {
        const session = await getSession();

        if (session) {
          navigate("/");
        }
      } catch (err) {
        console.error("Session check failed:", err);
      }
    };

    checkSession();
  }, [navigate]);
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url(/authentication-background.jpg)" }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Main content container */}
      <div className="relative z-10 w-full max-w-sm sm:max-w-md lg:max-w-lg px-4 sm:px-6">
        {/* Form container with glass effect */}
        <div className="bg-white backdrop-blur-sm rounded-lg shadow-xl p-4 sm:p-6 lg:p-8">
          <div className="text-center mb-4 sm:mb-6">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
              Sign In
            </h1>
            <p className="text-gray-600 mt-2 text-sm sm:text-base lg:text-lg">
              Welcome back! Sign in to continue your fitness journey
            </p>
          </div>
          <SignInForm />
          <div className="text-center mt-3 sm:mt-4 space-y-2 sm:space-y-3">
            <p className="text-sm sm:text-base text-gray-600">
              Don't have an account?{" "}
              <Link to="/signup">
                <span className="text-[#FF6600] font-semibold hover:text-[#FF6600]/70 underline transition-colors">
                  Sign Up
                </span>
              </Link>
            </p>
          </div>

          {/* Divider */}
          <div className="my-5">
            <hr className="border-gray-300" />
            <div className="relative -top-3 text-center">
              <span className="bg-white px-4 text-gray-500 text-sm">
                Or continue with
              </span>
            </div>
          </div>

          {/* OAuth Buttons */}
          <div className="w-full">
            <SignInOauthButton provider="google" logo="/google-logo.png" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SigninPage;
