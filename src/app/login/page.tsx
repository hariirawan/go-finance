import AuthWrapper from "@/components/auth-wrapper";
import { IconLock, IconMail } from "@tabler/icons-react";
import React from "react";

export default function Login() {
  return (
    <AuthWrapper>
      <div className="grid gap-10">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold">Hello!</h1>
          <p>Sign Up to Get Started</p>
        </div>
        <form className="grid gap-4">
          <div className="flex flex-row border border-gray-200 rounded-full w-full px-6 py-4">
            <IconMail size={21} color="#333333" />
            <input
              type="email"
              placeholder="Email Address"
              className="flex-1 w-full ml-2 outline-none"
            />
          </div>
          <div className="flex flex-row border border-gray-200 rounded-full w-full px-6 py-4">
            <IconLock size={21} color="#333333" />
            <input
              type="password"
              placeholder="Password"
              className="flex-1 ml-2 outline-none"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 rounded-full text-white w-full cursor-pointer focus:bg-blue-600 py-4"
          >
            Register
          </button>
          <span className="text-center mt-4">Forgot Password</span>
        </form>
      </div>
    </AuthWrapper>
  );
}
