import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import { env } from "./env";

export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
}

export async function comparePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(plainPassword, hashedPassword);
}

export function generateJWT(payload: object): string {
  return jwt.sign(payload, env.SECRET_KEY, { expiresIn: '1h' });
}