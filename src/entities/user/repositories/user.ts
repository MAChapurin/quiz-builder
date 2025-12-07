import { prisma } from "@/shared/lib/db";
import { UserEntity } from "../domain";

export function getUser(where: { email?: string; id?: string }) {
  return prisma.user.findFirst({ where });
}

export async function saveUser(user: UserEntity): Promise<UserEntity> {
  return prisma.user.upsert({
    where: { email: user.email },
    update: user,
    create: user,
  }) as unknown as UserEntity;
}

export const userRepository = {
  saveUser,
  getUser,
};
