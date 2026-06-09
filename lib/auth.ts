// lib/auth.ts
import { SignJWT, jwtVerify } from "jose";
import { NextRequest } from "next/server";

const SECRET = process.env.JWT_SECRET || "dev-secret-change-me";
const SECRET_KEY = new TextEncoder().encode(SECRET);

export type JwtPayload = {
  sub: string;          // user id
  role: "admin" | "user";
};

export async function signToken(payload: JwtPayload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(SECRET_KEY);
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);
    return payload as JwtPayload;
  } catch {
    return null;
  }
}

export function getTokenFromRequest(req: NextRequest) {
  return req.cookies.get("admin_token")?.value || null;
}