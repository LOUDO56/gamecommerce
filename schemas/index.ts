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
    id: z.string().optional(),
    title: z.string().min(1, "Title is required.").default(""),
    description: z.string().min(1, "Description is required.").default(""),
    price: z.coerce.number({ message: "Please put a number!" }).min(1, "Number is required.").default(0),
    platforms: z.array(z.nativeEnum(Platform), { message: "At least one platform is required." }).refine((value) => value.length > 0, "At least one platform is required."),
    imageUrl: z.string().min(1, "Image link is required.").default(""),
})

export const FilterGameSchema = z.object({
    platform: z.nativeEnum(Platform, { message: "Invalid platform." }).optional(),
    filter: z.string({ message: "Invalid filter" }).optional(),
    fromPrice: z.coerce.number().int().min(0, "Please put a valid number.").optional(),
    toPrice: z.coerce.number().int().min(0, "Please put a valid number.").optional(),
})
