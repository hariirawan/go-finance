import axios from "axios";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { accounts } from "@/constants/accounts";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    if (!API_URL) {
      return NextResponse.json(
        { error: "Server misconfiguration: API URL is missing" },
        { status: 500 }
      );
    }

    const { data } = await axios.post(`${API_URL}/login`, { email, password });

    if (!data?.token) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const user = accounts.find(
      (user: { email: string; id: number }) => user.email === email
    );
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 401 });
    }

    const cookieStore = await cookies();
    cookieStore.set("userId", String(user.id), {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60, // 7 hari
      path: "/",
    });

    cookieStore.set("token", data.token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60, // 7 hari
      path: "/",
    });

    return NextResponse.json({ success: true, token: data.token });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        { message: error.response?.data?.error || "Something went wrong" },
        { status: error.response?.status || 500 }
      );
    }

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
