'use server'

import { RegisterSchema } from "@/schemas"
import { z } from "zod"
import bcryptjs from "bcryptjs";
import { prisma } from "@/prisma";
import { getUserByEmail } from "@/data/user";
import { stripe } from "@/lib/stripe";


export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields." };
    }

    const { email, password, name } = validatedFields.data;
    const hashedPassword = await bcryptjs.hash(password, 10);

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
        return { error: "Email already in use!" };
    }

    const newUser = await prisma.user.create({
        data: { email, name, password: hashedPassword }
    });

    const stripeCustomer = await stripe.customers.create({
        email: newUser.email as string
    });

    await prisma.user.update({
        where: { id: newUser.id },
        data: { stripeCustomerId: stripeCustomer.id }
    });

    return { success: "Account created!" };

}