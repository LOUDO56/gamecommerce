import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email("Invalid email."),
    password: z.string().min(1, "Password is invalid."),
})

export const RegisterSchema = z.object({
    email: z.string().email("Invalid email."),
    password: z.string().min(6, "Minimum 6 characters required."),
    username: z.string().min(1, "Username is required.").max(50, "Your username is too long!")
})