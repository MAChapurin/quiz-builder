import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { SessionEntity, UserEntity, userToSession } from "../domain";
import { left, right } from "@/shared/lib/either";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { routes } from "@/shared/config";

const secretKey = process.env.SESSION_SECRET;

if (!secretKey) throw new Error("SESSION_SECRET is not set");

const encodedKey = new TextEncoder().encode(secretKey);

async function encrypt(payload: SessionEntity) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

async function decrypt(session?: string) {
  if (!session) return left("No session token" as const);

  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return right(payload as SessionEntity);
  } catch (error) {
    return left(error);
  }
}

async function addSession(user: UserEntity) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const sessionData = userToSession(user, expiresAt.toISOString());
  const session = await encrypt(sessionData);

  const cookiesStore = await cookies();
  cookiesStore.set("session", session, {
    httpOnly: true,
    // secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}

const getSessionCookie = async () => {
  const c = await cookies();
  return c.get("session")?.value;
};

async function verifySession() {
  const cookie = await getSessionCookie();
  const session = await decrypt(cookie);

  if (session.type === "left") {
    redirect(routes.LOGIN);
  }

  return { isAuth: true, session: session.value };
}

export const sessionService = {
  addSession,
  deleteSession,
  verifySession,
};
