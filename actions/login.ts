'use server'

import { signIn } from "@/auth";
import { DEFAULT_REDIRECT_URL } from "@/routes";
import { LoginSchema } from "@/schemas";
import { AuthError } from "next-auth";
import { z } from "zod";


export const login = async (values: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(values);

    if(!validatedFields.success) {
        return { error: "Invalid fields." }
    }

    const { email, password } = validatedFields.data;

    try {
        await signIn('credentials', {
            email,
            password,
            redirectTo: DEFAULT_REDIRECT_URL
        });
    } catch (error) {
        if(error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Wrong email or password." };
                default:
                    return { error: "Something went wrong." };
            }
        }

        throw error;
    }
}