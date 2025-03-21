"use client";

import AuthWrapper from "@/components/auth-wrapper";
import LoadingIndicator from "@/components/loading-indicator";
import { useLogin } from "@/hooks/useAuth";
import { IAuthCredentials } from "@/types/auth";
import { IconLock, IconMail } from "@tabler/icons-react";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAuthCredentials>();

  const { handleLogin, isProcessing } = useLogin();

  return (
    <AuthWrapper>
      {isProcessing && <LoadingIndicator />}
      <div className="grid gap-10">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold">Hello!</h1>
          <p>Sign Up to Get Started</p>
        </div>
        <form className="grid gap-4" onSubmit={handleSubmit(handleLogin)}>
          <div className="flex flex-row border border-gray-200 rounded-full w-full px-6 py-4">
            <IconMail size={21} color="#333333" />
            <input
              type="email"
              placeholder="Email Address"
              className="flex-1 w-full ml-2 outline-none"
              {...register("email", { required: true })}
            />
          </div>
          <div className="flex flex-row border border-gray-200 rounded-full w-full px-6 py-4">
            <IconLock size={21} color="#333333" />
            <input
              type="password"
              placeholder="Password"
              className="flex-1 ml-2 outline-none"
              {...register("password", { required: true })}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 rounded-full text-white w-full cursor-pointer focus:bg-blue-600 py-4 disabled:bg-gray-200 disabled:cursor-not-allowed"
            disabled={isProcessing}
          >
            Login
          </button>
          <span className="text-center mt-4">
            Don't have an account?{" "}
            <Link href="/register" className="font-bold text-blue-600">
              Register
            </Link>
          </span>
        </form>
      </div>
    </AuthWrapper>
  );
}
