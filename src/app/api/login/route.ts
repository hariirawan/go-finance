import axios from "axios";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // Kirim request ke backend Laravel atau Express
    const { data } = await axios.post("https://reqres.in/api/login", {
      email,
      password,
    });

    if (!data.token) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

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
