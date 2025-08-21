import SignupForm from "@/components/SignUpForm";
import { Link } from "react-router-dom";
import SignInOauthButton from "@/components/OAuthSignInButton";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getSession } from "@/lib/auth-client";

const SignupPage = () => {
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
              Create Account
            </h1>
            <p className="text-gray-600 mt-2 text-sm sm:text-base lg:text-lg">
              Join FitKeep to start your fitness journey
            </p>
          </div>
          <SignupForm />
          <div className="text-center mt-3 sm:mt-4 space-y-2 sm:space-y-3">
            <p className="text-sm sm:text-base text-gray-600">
              Already have an account?{" "}
              <Link to="/signin">
                <span className="text-[#FF6600] font-semibold hover:text-[#FF6600]/70 underline transition-colors">
                  Sign In
                </span>
              </Link>
            </p>
          </div>
          {/* Divider */}
          <div className="my-4 sm:my-5 lg:my-6">
            <hr className="border-gray-300" />
            <div className="relative -top-2.5 sm:-top-3 text-center">
              <span className="bg-white px-3 sm:px-4 text-gray-500 text-xs sm:text-sm lg:text-base">
                Or continue with
              </span>
            </div>
          </div>

          {/* OAuth Buttons */}
          <div className="w-full space-y-3 sm:space-y-4">
            <SignInOauthButton
              signUp
              provider="google"
              logo="/google-logo.png"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
