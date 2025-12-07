import { left, right } from "@/shared/lib/either";
import { userRepository } from "../repositories/user";
import { passwordService } from "./password";
import { UserEntity } from "../domain";

type VerifyUserInput = { email: string; password: string };

export async function verifyUserPassword({ email, password }: VerifyUserInput) {
  const user = await userRepository.getUser({ email });

  if (!user) {
    return left("wrong-login-or-password" as const);
  }

  const isValid = await passwordService.comparePasswords({
    hash: user.passwordHash,
    salt: user.salt,
    password,
  });

  if (!isValid) {
    return left("wrong-login-or-password" as const);
  }

  const userEntity: UserEntity = {
    id: user.id,
    email: user.email,
    passwordHash: user.passwordHash,
    salt: user.salt,
    name: user.name ?? "",
  };

  return right(userEntity);
}
