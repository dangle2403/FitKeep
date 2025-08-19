import { signIn } from "@/lib/auth-client";
import { Button } from "./ui/button";
import { useState } from "react";
import toast from "react-hot-toast";

interface SignInOauthButtonProps {
  provider: string;
  logo: string;
  signUp?: boolean;
}

const SignInOauthButton = ({
  provider,
  signUp,
  logo,
}: SignInOauthButtonProps) => {
  const [isPending, setIsPending] = useState(false);
  async function handleOnClick() {
    await signIn.social({
      provider,
      callbackURL: import.meta.env.VITE_BASE_URL,
      errorCallbackURL: import.meta.env.VITE_BASE_URL + "/signin",
      fetchOptions: {
        onRequest: () => {
          setIsPending(true);
        },
        onSuccess: () => {
          setIsPending(false);
        },
        onError: () => {
          setIsPending(false);
          toast.error("Sign in failed:");
        },
      },
    });
  }
  const action = signUp ? "up" : "in";
  const providerName = provider === "google" ? "Google" : "GitHub";

  return (
    <Button
      className="w-full bg-[#F5F5F5] hover:bg-[#F5F5F5]/70 h-10 sm:h-11 lg:h-12 text-black text-sm sm:text-base lg:text-lg font-medium border border-gray-300 hover:border-gray-400 transition-all duration-200 flex items-center justify-center gap-2 sm:gap-3"
      onClick={handleOnClick}
      disabled={isPending}
    >
      <img
        src={logo}
        alt={`${providerName} logo`}
        className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7"
      />
      <span className="truncate">
        Sign {action} with {providerName}
      </span>
    </Button>
  );
};

export default SignInOauthButton;
