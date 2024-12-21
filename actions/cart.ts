'use server'

import { auth } from "@/auth"
import { prisma } from "@/prisma"

export const addItemInCart = async (idItem: string) => {
    
    const session = await auth();
    if(!session) return;
    const userId = session.user.id as string;
    

    let existingCart = await prisma.cart.findUnique({
        where: { userId: userId }
    })

    if(!existingCart) {
        existingCart = await prisma.cart.create({
            data: { userId: userId }
        })
    }

    const existingItem = await prisma.cartItem.findUnique({
        where: { gameId: idItem }
    })

    if(!existingItem) {
        await prisma.cartItem.create({
            data: {
                quantity: 1,
                cartId: existingCart?.id,
                gameId: idItem
            }
        })
    } else {
        await prisma.cartItem.update({
            data: { quantity: { increment: 1 } },
            where: { gameId: idItem }
        })
    }
}

export const removeItemInCart = async (idItem: string) => {
    
    const session = await auth();
    if(!session) return;
    const userId = session.user.id as string;
    
    const existingItem = await prisma.cartItem.findUnique({
        where: { gameId: idItem }
    })
    
    if(!existingItem) return;
    
    const gameId = existingItem.gameId;

    if(existingItem.quantity - 1 == 0) {
        await prisma.cartItem.delete({
            where: { gameId }
        })
    } else {
        await prisma.cartItem.update({
            data: { quantity: { decrement: 1 } },
            where: { gameId }
        })
    }

    const cart = await prisma.cart.findUnique({
        where: { userId }
    })

    const itemsInCartCount = await prisma.cartItem.count({
        where: { cartId: cart?.id }
    })

    if(itemsInCartCount == 0) {
        await prisma.cart.delete({
            where: { userId }
        })
    }
}

export const clearItemsInCart = async () => {
    const session = await auth();
    if(!session) return;
    const userId = session.user.id as string;

    await prisma.cart.delete({
        where: { userId }
    })
}