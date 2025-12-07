import { left, right } from "@/shared/lib/either";
import { userRepository } from "../repositories/user";
import cuid from "cuid";
import { passwordService } from "./password";

export const createUser = async ({
  password,
  email,
  name,
}: {
  password: string;
  email: string;
  name: string;
}) => {
  const userWithEmail = await userRepository.getUser({ email });

  if (userWithEmail) {
    return left("user-login-exists" as const);
  }

  const { hash, salt } = await passwordService.hashPassword(password);

  const user = await userRepository.saveUser({
    id: cuid(),
    passwordHash: hash,
    salt,
    email,
    name,
  });

  return right(user);
};
