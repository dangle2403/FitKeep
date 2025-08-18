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
      callbackURL: import.meta.env.VITE_BASE_URL + "/dashboard",
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
      className="w-full bg-[#F5F5F5] hover:bg-[#F5F5F5]/70 h-10 text-black text-lg font-sm border-black border-1"
      onClick={handleOnClick}
      disabled={isPending}
    >
      <img src={logo} alt="logo" className="size-7" /> Sign {action} with{" "}
      {providerName}
    </Button>
  );
};

export default SignInOauthButton;
