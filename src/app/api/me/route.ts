import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import axios from "axios";

export async function GET() {
  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const userId = (await cookies()).get("userId")?.value;
    const { data } = await axios.get(`${API_URL}/users/${userId}`);

    return NextResponse.json({ success: true, data: data.data });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        { error: error.response?.data?.error || "Something went wrong" },
        { status: error.response?.status || 500 }
      );
    }

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
