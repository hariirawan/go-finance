import axios from "axios";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { accounts } from "@/contants/accounts";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const { data } = await axios.post(`${API_URL}/login`, {
      email,
      password,
    });

    if (!data.token) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const userId = accounts.find((user) => user.email === email)?.id;

    if (!userId) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    (await cookies()).set("userId", `${userId}`, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

    (await cookies()).set("token", data.token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

    return NextResponse.json({ success: true, token: data.token });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error?.response
          ? error.response.data.error
          : "Something went wrong",
      },
      { status: error?.response?.status ?? 500 }
    );
  }
}
