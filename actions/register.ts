'use server'

import { RegisterSchema } from "@/schemas"
import { z } from "zod"
import bcryptjs from "bcryptjs";
import { prisma } from "@/prisma";
import { getUserByEmail } from "@/data/user";


export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values);

    if(!validatedFields.success) {
        return { error: "Invalid fields." }
    }

    const { email, password, username } = validatedFields.data;
    const hashedPassword = await bcryptjs.hash(password, 10);

    const existingUser = await getUserByEmail(email);

    if(existingUser) {
        return { error: "Email already in use!" }
    }

    await prisma.user.create({
        data: { email, username, password: hashedPassword }
    });

    return { success: "Account created!" }



}