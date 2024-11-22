import { sign, verify } from 'hono/jwt'

export const createToken = async (payload: any) => {
  return sign(payload, process.env.NEXT_PUBLIC_JWT_SECRET as string, "HS256")
}

export const verifyToken = async (token: string) => {
  return verify(token, process.env.NEXT_PUBLIC_JWT_SECRET as string, "HS256")
}

