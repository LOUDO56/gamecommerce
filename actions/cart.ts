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

export const removeItemFromCart = async (idItem: string) => {
    
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

    return items.map(item => ({ id: item.id, quantity: item.quantity }));
}

export const getCountOfItem = async (itemId: string) => {
    const session = await auth();
    if(!session) return 0; 
    const userId = session.user.id as string;

    const item = await prisma.cartItem.findUnique({
        where: { 
            gameId: itemId,
            userId 
        }
    })

    return item?.quantity;
}

export const isInCart = async (itemId: string) => {
    const session = await auth();
    if(!session) return false; 
    const userId = session.user.id as string;

    const item = await prisma.cartItem.findUnique({
        where: { 
            gameId: itemId,
            userId
        }
    })

    return item !== null;
}