'use server'

import { prisma } from "@/prisma"
import { Platform } from "@prisma/client";

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

export const fetchGames = async (
    platform?: Platform,
    filter?: "cheaper" | "expensive" | "recent" | "older",
    fromPrice?: number,
    toPrice?: number,
    page?: number,
    pageSize?: number
) => {
    try {

        if(!page) page = 1;
        if(!pageSize) pageSize = 14;
        
        const where: any = {};
        
        if(platform) {
            where.platforms = {
                has: platform
            }
        }

        if(fromPrice && toPrice) {
            where.price = {}
            where.price.gte = fromPrice;
            where.price.lte = toPrice;
        }

        let orderBy: any = {};
        if(filter) {
            switch (filter) {
                case "cheaper":
                    orderBy = { price: "asc" };
                    break;
                case "expensive":
                    orderBy = { price: "desc" };
                    break;
                case "recent":
                    orderBy = { createdAt: "asc" };
                    break;
                case "older":
                    orderBy = { createdAt: "desc" }
            }
        }

        const fetchedGames = await prisma.game.findMany({
            where,
            orderBy,
            skip: (page - 1) * pageSize,
            take: pageSize
        })

        const totalCountGames = await prisma.game.count({
            where,
        });

        return { fetchedGames, totalCountGames };
    } catch (error) {
        console.error("Error fetching games:", error);
        throw new Error("Failed to fetch games.");
    }
}


export const fetchGameInfo = async (id: string) => {
    const gameInfo = await prisma.game.findUnique(
        { 
            where: { id } 
        }
    );

    return gameInfo;
}