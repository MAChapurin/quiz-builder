import { pbkdf2, randomBytes } from "node:crypto";

const ITERATIONS = 1000;
const KEY_LENGTH = 64;
const DIGEST = "sha512";

export async function hashPassword(password: string, salt?: string) {
  const actualSalt = salt ?? randomBytes(16).toString("hex");

  const hash = await new Promise<string>((resolve, reject) => {
    pbkdf2(
      password,
      actualSalt,
      ITERATIONS,
      KEY_LENGTH,
      DIGEST,
      (err, derivedKey) => {
        if (err) return reject(err);
        resolve(derivedKey.toString("hex"));
      },
    );
  });

  return { hash, salt: actualSalt };
}

export async function comparePasswords({
  hash,
  password,
  salt,
}: {
  hash: string;
  password: string;
  salt: string;
}) {
  const { hash: computedHash } = await hashPassword(password, salt);
  return computedHash === hash;
}

export const passwordService = { hashPassword, comparePasswords };
