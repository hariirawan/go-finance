import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  (await cookies()).set("token", "", { path: "/", maxAge: 0 });

  return NextResponse.json({ success: true });
}
