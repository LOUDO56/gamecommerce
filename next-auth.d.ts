import { UserRole } from "@prisma/client"
import { DefaultSession } from "next-auth"
import { JWT } from "next-auth/jwt"

export type ExtendedUser = DefaultSession['user'] & {
  id: string | undefined;
  role: UserRole | undefined;
  name: string | null;
}

declare module "next-auth" {
  interface Session {
    user: ExtendedUser
  }
}
   
declare module "next-auth/jwt" {
  interface JWT {
    role: UserRole
    name: string | null;
  }
}