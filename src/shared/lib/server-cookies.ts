"use server";
import { cookies } from "next/headers";

export async function getServerCookies() {
  const store = await cookies();
  return Object.fromEntries(store.getAll().map((c) => [c.name, c.value]));
}
