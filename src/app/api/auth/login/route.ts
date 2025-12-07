import { NextRequest, NextResponse } from "next/server";
import { findUserByEmail, verifyPassword } from "@/entities/user/model";
import { generateToken } from "@/shared/lib/jwt";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  const user = await findUserByEmail(email);
  if (!user)
    return NextResponse.json({ message: "Неверные данные" }, { status: 401 });

  const valid = await verifyPassword(password, user.passwordHash);
  if (!valid)
    return NextResponse.json({ message: "Неверные данные" }, { status: 401 });

  const token = generateToken(user.id);

  return NextResponse.json({
    token,
    user: { id: user.id, email: user.email, name: user.name },
  });
}
