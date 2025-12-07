import { NextRequest, NextResponse } from "next/server";
import { createUser, findUserByEmail } from "@/entities/user/model";
import { generateToken } from "@/shared/lib/jwt";

export async function POST(req: NextRequest) {
  const { email, password, name } = await req.json();

  const existingUser = await findUserByEmail(email);
  if (existingUser)
    return NextResponse.json(
      { message: "Email уже используется" },
      { status: 400 },
    );

  const user = await createUser(email, password, name);
  const token = generateToken(user.id);

  return NextResponse.json({
    token,
    user: { id: user.id, email: user.email, name: user.name },
  });
}
