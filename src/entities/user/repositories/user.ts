import { prisma } from "@/shared/lib/db";
import { UserEntity } from "../domain";
import { User } from "@prisma/client";

export function saveUser(user: UserEntity): Promise<UserEntity> {
  return prisma.user.upsert({
    where: {
      id: user.id,
    },
    create: user,
    update: user,
  });
}

// export function getUser(where: Prisma.UserWhereInput) {
//   return prisma.user.findFirst({ where });
// }

export function getUser(where: Partial<Pick<User, "email" | "id">>) {
  return prisma.user.findFirst({ where });
}

export const userRepository = {
  saveUser,
  getUser,
};
