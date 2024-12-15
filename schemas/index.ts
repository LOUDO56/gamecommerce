import { Platform } from "@prisma/client";
import { z } from "zod";

export const LoginSchema = z.object({
    email: z.string().email("Invalid email."),
    password: z.string().min(1, "Password is invalid."),
})

export const RegisterSchema = z.object({
    email: z.string().email("Invalid email."),
    password: z.string().min(6, "Minimum 6 characters required."),
    name: z.string().min(1, "Username is required.").max(50, "Your username is too long!")
})

export const GameSchema = z.object({
    title: z.string().min(1, "Title is required.").default(""),
    description: z.string().min(1, "Description is required.").default(""),
    price: z.coerce.number({ message: "Please put a number!" }).min(1, "Number is required.").default(0),
    platform: z.array(z.nativeEnum(Platform), { message: "At least one platform is required." }).refine((value) => value.length > 0, "At least one platform is required."),
    imageUrl: z.string().min(1, "Image link is required.").default(""),
    stock: z.coerce.number({ message: "Please put a number!" }).int("Only digits!").min(1, "Stock is required.").default(0),
})