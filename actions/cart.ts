'use server'

import { auth } from "@/auth"
import { prisma } from "@/prisma"

export const addItemInCart = async (idItem: string) => {
    
    const session = await auth();
    if(!session) return;
    const userId = session.user.id as string;
    
    const existingItem = await prisma.cartItem.findUnique({
        where: { gameId: idItem }
    });

    if(!existingItem) {
        await prisma.cartItem.create({
            data: {
                quantity: 1,
                gameId: idItem,
                userId
            }
        });
    } else {
        await prisma.cartItem.update({
            data: { quantity: { increment: 1 } },
            where: { gameId: idItem }
        });
    }
}

export const removeItemInCart = async (idItem: string) => {
    
    const session = await auth();
    if(!session) return;
    
    const existingItem = await prisma.cartItem.findUnique({
        where: { gameId: idItem }
    });
    
    if(!existingItem) return;
    
    const gameId = existingItem.gameId;

    if(existingItem.quantity - 1 == 0) {
        await prisma.cartItem.delete({
            where: { gameId }
        });
    } else {
        await prisma.cartItem.update({
            data: { quantity: { decrement: 1 } },
            where: { gameId }
        });
    }
}

export const clearItemsInCart = async () => {
    const session = await auth();
    if(!session) return;
    const userId = session.user.id as string;

    await prisma.cartItem.deleteMany({
        where: { userId }
    });
}

export const getCartItems = async () => {
    const session = await auth();
    if(!session) return;
    const userId = session.user.id as string;

    const items = await prisma.cartItem.findMany({
        where: { userId }
    });

    return items;
}