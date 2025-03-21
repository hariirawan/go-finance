"use client";
import AuthWrapper from "@/components/auth-wrapper";
import { useRegister } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { IAuthCredentials } from "@/types/auth";
import { IconLock, IconMail, IconUser } from "@tabler/icons-react";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAuthCredentials & { fullname: string }>();

  const { handleRegister, isLoading } = useRegister();

  return (
    <AuthWrapper>
      <div className="grid gap-10">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold">Hallo Again!</h1>
          <p>Welcome Back</p>
        </div>
        <form className="grid gap-4" onSubmit={handleSubmit(handleRegister)}>
          <div
            className={cn(
              "flex flex-row border border-gray-200 rounded-full w-full px-6 py-4",
              errors.fullname && "border-red-500"
            )}
          >
            <IconUser size={21} color="#333333" />
            <input
              type="text"
              placeholder="Full Name"
              className="flex-1 w-full ml-2 outline-none "
              {...register("fullname", { required: true })}
              disabled={isLoading}
            />
          </div>
          <div
            className={cn(
              "flex flex-row border border-gray-200 rounded-full w-full px-6 py-4",
              errors.email && "border-red-500"
            )}
          >
            <IconMail size={21} color="#333333" />
            <input
              type="text"
              placeholder="Email Address"
              className="flex-1 w-full ml-2 outline-none "
              autoComplete="off"
              {...register("email", { required: true })}
              disabled={isLoading}
            />
          </div>
          <div
            className={cn(
              "flex flex-row border border-gray-200 rounded-full w-full px-6 py-4",
              errors.email && "border-red-500"
            )}
          >
            <IconLock size={21} color="#333333" />
            <input
              type="password"
              placeholder="Password"
              className="flex-1 ml-2 outline-none "
              {...register("password", { required: true })}
              disabled={isLoading}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 rounded-full text-white w-full cursor-pointer focus:bg-blue-600 py-4 disabled:bg-gray-200 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            Register
          </button>
          <span className="text-center mt-4">
            Do you have an account?{" "}
            <Link href="/login" className="font-bold text-blue-600">
              Login
            </Link>
          </span>
        </form>
      </div>
    </AuthWrapper>
  );
}
