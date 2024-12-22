'use server'

import { findGameByTitle } from "@/data/game";
import { prisma } from "@/prisma";
import { GameSchema } from "@/schemas";
import { z } from "zod";

export const editGame = async (values: z.infer<typeof GameSchema>) => {
    const validatedFields = GameSchema.safeParse(values);

    if(!validatedFields.success) {
        return { error: "Invalid fields!" }
    }

    const { id, title, description, price, platforms, imageUrl, stock } = validatedFields.data;

    try {
        await prisma.game.update({
            where: { id },
            data: { title, description, price, platforms, imageUrl, stock }
        })
    
        return { success: "The game information has been updated!" }
    } catch (error) {
        console.log("Error while updating the game: " + error)
        return { error: "Something went wrong..." }
    }
}