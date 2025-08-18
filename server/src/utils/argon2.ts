import { hash, verify, type Options } from "argon2";

const opts: Options = {
  memoryCost: 19456,
  timeCost: 2,
  parallelism: 1,
  hashLength: 32,
};

export async function hashPassword(password: string) {
  const hashedPassword = await hash(password, opts);
  return hashedPassword;
}

export async function verifyPassword(data: { password: string; hash: string }) {
  const { password, hash } = data;
  const isVerified = await verify(hash, password, opts);
  return isVerified;
}
