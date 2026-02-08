import React, { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../hooks/useAuthContext";
import { useNavigate } from "react-router";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { login, signup, signInWithGoogle, error } = useAuth();
  const navigate = useNavigate();

  const handleEmailAuth = async (e) => {
    console.log("Email:", email);
    console.log("Password:", password);
    e.preventDefault();
    if (!email && !password) {
      toast.error("All Fields must be field");
    }
    setIsLoading(true);
    try {
      if (isSignup) {
        await signup(email, password);
        toast.success("Signup Successfull");
      } else {
        login(email, password);
        toast.success("Login Successfull");
      }
      navigate("/");
    } catch (error) {
      console.error("auth error", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      await signInWithGoogle();
      console.log("Google Sign in Successfull");
      navigate("/");
    } catch (error) {
      console.error("Google sign in error", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="grid lg:grid-cols-5 md:grid-cols-2 items-center gap-y-4 h-full">
      {/* Left Section */}
      <div className="max-md:order-1 lg:col-span-3 md:h-screen w-full bg-[#21161E] md:rounded-tr-xl md:rounded-br-xl lg:p-12 p-8">
        <img
          src="https://readymadeui.com/signin-image.webp"
          className="lg:w-2/3 w-full h-full object-contain block mx-auto"
          alt="login"
        />
      </div>

      {/* Right Section */}
      <div className="lg:col-span-2 w-full p-8 max-w-lg mx-auto">
        <div className="text-center pb-5">
          <h2 className="text-3xl font-bold text-[#DB934A]">
            {isSignup ? "Create Account" : "Welcome Back"}
          </h2>
          <p className="text-[15px] mt-3 text-[#DB934A] opacity-90">
            {isSignup ? "Sign up to continue" : "Sign in to get started"}
          </p>
        </div>

        <div className="space-y-6">
          {/* Email */}
          <div>
            <label className="text-[#DB934A] text-[15px] font-medium mb-2 block">
              Email
            </label>
            <div className="relative flex items-center">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                type="text"
                required
                className="w-full text-md text-[#DB934A] bg-[#DB934A]/20 focus:bg-transparent pl-4 pr-10 py-3.5 rounded-md border border-[#DB934A] focus:border-[#FED25E] outline-none"
                placeholder="Enter email"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-[#DB934A] text-[15px] font-medium mb-2 block">
              Password
            </label>
            <div className="relative flex items-center">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                type="password"
                required
                className="w-full text-sm text-[#DB934A] bg-[#DB934A]/20 focus:bg-transparent pl-4 pr-10 py-3.5 rounded-md border border-[#DB934A] focus:border-[#FED25E] outline-none"
                placeholder="Enter password"
              />
            </div>
          </div>
        </div>
        <div className="mb-8">
          <p className="text-[15px] mt-6 text-[#DB934A]">
            {isSignup ? "Already have an account?" : "Don't have an account?"}
            <button
              onClick={() => setIsSignup(!isSignup)}
              className="text-[#FED25E] font-medium hover:underline ml-1 whitespace-nowrap"
            >
              {isSignup ? "Log In here" : "Sign Up here"}
            </button>
          </p>
        </div>

        {/* Sign In Button */}
        <div className="mt-12">
          <button
            onClick={handleEmailAuth}
            disabled={isLoading}
            type="button"
            className="w-full py-2.5 px-4 text-[15px] font-medium tracking-wide rounded-md text-[#21161E] bg-[#FED25E] hover:bg-[#DB934A] hover:text-white focus:outline-none cursor-pointer transition-all"
          >
            {isLoading ? "Loading..." : isSignup ? "Sign up" : "Sign in"}
          </button>
        </div>

        {/* Divider */}
        <div className="my-6 flex items-center gap-4">
          <hr className="w-full border-[#DB934A]" />
          <p className="text-sm text-[#DB934A] text-center">or</p>
          <hr className="w-full border-[#DB934A]" />
        </div>

        {/* Google Button */}
        <button
          onClick={handleGoogleLogin}
          disabled={isLoading}
          type="button"
          className="w-full flex items-center justify-center gap-4 py-2.5 px-6 text-[15px] font-medium tracking-wide text-[#DB934A] border border-[#DB934A] rounded-md bg-[#21161E] hover:bg-[#DB934A] hover:text-white focus:outline-none cursor-pointer transition-all"
        >
          <svg
            xmlns="http://www.w3.org"
            viewBox="0 0 48 48"
            width="24px"
            height="24px"
          >
            <path
              fill="#EA4335"
              d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.1 2.35 30.07 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C14.65 13.92 18.88 9.5 24 9.5z"
            />
            <path
              fill="#4285F4"
              d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.19h12.45c-.53 2.72-2.07 5.02-4.18 6.59l7.98 6.19c4.64-4.32 7.32-10.14 7.32-17.43z"
            />
            <path
              fill="#FBBC05"
              d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.28-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24s.92 7.54 2.55 10.78l7.98-6.19z"
            />
            <path
              fill="#34A853"
              d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.98-6.19c-2.07 1.35-4.73 2.15-7.91 2.15-5.12 0-9.44-3.44-10.94-8.08l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
            />
          </svg>
          {isLoading ? "Loading..." : "Continue with Google"}
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
