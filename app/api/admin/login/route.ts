import { NextResponse } from "next/server";
import { createAdminSession, validateAdminCredentials } from "@/lib/adminAuth";

export async function POST(request: Request) {
  const body = (await request.json()) as { username?: string; password?: string };
  const username = body.username?.trim() ?? "";
  const password = body.password?.trim() ?? "";

  if (!validateAdminCredentials(username, password)) {
    return NextResponse.json(
      { error: "Geçersiz kullanıcı adı veya şifre." },
      { status: 401 }
    );
  }

  await createAdminSession();
  return NextResponse.json({ success: true });
}
