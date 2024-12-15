import { prisma } from "@/prisma"

export const findGameByTitle = async (title: string) => {
    try {
        const game = await prisma.game.findUnique({
            where: { title }
        })

        return game;
    } catch (error) {
        return null;
    }
}

export const findGameById = async (id: string) => {
    try {
        const game = await prisma.game.findUnique({
            where: { id }
        })

        return game;
    } catch (error) {
        return null;
    }
}