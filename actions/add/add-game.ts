'use server'

import { findGameByTitle } from "@/data/game";
import { prisma } from "@/prisma";
import { GameSchema } from "@/schemas";
import { z } from "zod";

export const addGame = async (values: z.infer<typeof GameSchema>) => {
    const validatedFields = GameSchema.safeParse(values);

    if(!validatedFields.success) {
        return { error: "Invalid fields!" }
    }
    
    const { title, description, price, platforms, imageUrl, stock } = validatedFields.data;

    const existingGame = await findGameByTitle(title);

    if(existingGame) return { error: "This game already exists!" }

    await prisma.game.create({
        data: { title, description, price, platforms, imageUrl, stock }
    })

    return { success: "The game has been added to the database!" }
}