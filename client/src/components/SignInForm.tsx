import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SigninSkeleton from "./skeletons/SignInSkeleton";
import { useForm } from "react-hook-form";
import { signIn } from "@/lib/auth-client";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useLocation } from "react-router-dom";

interface FormData {
  email: string;
  password: string;
}

const SignInForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const destination =
    (location.state as { from?: { pathname: string } })?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    mode: "all", // Validates on every change
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    await signIn.email(
      {
        email: data.email,
        password: data.password,
      },
      {
        onRequest: () => {},
        onSuccess: () => {
          toast.success("Signed in successfully!");
          // Give a moment for the session to be established
          setTimeout(() => {
            setIsLoading(false);
            navigate(destination, { replace: true });
          }, 100);
        },
        onError: (ctx) => {
          toast.error(ctx?.error?.message || "Sign in failed");
          setIsLoading(false);
        },
      }
    );
  };
  if (isLoading) {
    return <SigninSkeleton />;
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md w-full space-y-4"
    >
      {/* Email */}
      <div className="space-y-3">
        <Label htmlFor="email" className="text-lg font-medium">
          Email
        </Label>
        <Input
          id="email"
          placeholder="example@gmail.com"
          className="h-10 text-lg px-4"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email format",
            },
          })}
        />
        {errors.email && (
          <p className="text-red-500 text-base">
            {String(errors.email?.message)}
          </p>
        )}
      </div>

      {/* Password */}
      <div className="space-y-3">
        <Label htmlFor="password" className="text-lg font-medium">
          Password
        </Label>
        <Input
          id="password"
          type="password"
          placeholder="********"
          className="h-10 text-lg px-4"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
            pattern: {
              value:
                /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-={}[\]|;:'",.<>?/]).{8,}$/,
              message: "Must contain uppercase, number, and special character",
            },
          })}
        />
        {errors.password && (
          <p className="text-red-500 text-base">
            {String(errors.password?.message)}
          </p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full bg-[#FF6600] hover:bg-[#FF6600]/70 h-10 text-lg font-medium cursor-pointer"
      >
        Sign In
      </Button>
    </form>
  );
};

export default SignInForm;
