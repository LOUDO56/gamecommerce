'use server'

import { auth } from "@/auth";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/prisma";
import { redirect } from "next/navigation";

export const buyAction = async (totalPrice: number) => {

    const baseUrl = process.env.NODE_ENV === "development" ? 'http://localhost:3000' : process.env.BASE_URL 

    const sessionUser = await auth();
    if(!sessionUser) redirect('/auth/login');
    const userId = sessionUser.user.id as string;
    const user = await prisma.user.findUnique({
        where: {
            id: sessionUser?.user.id
        },
        select: {
            stripeCustomerId: true
        }
    })
    const stripeCustomerId = user?.stripeCustomerId ?? undefined;

    const product = await stripe.products.create({
        name: 'GameEcommerce games',
        description: 'Buy the games you ordered.',
    })
    const price = await stripe.prices.create({
        unit_amount: totalPrice,
        currency: 'eur',
        product: product.id,
        
    })
    const session = await stripe.checkout.sessions.create({
        customer: stripeCustomerId,
        mode: "payment",
        payment_method_types: ["card", "link"],
        line_items: [
        {
            price: price.id,
            quantity: 1
        }
        ],
        success_url: baseUrl + "/buy/success",
        cancel_url: baseUrl + "/buy/error"
    })

    const items = await prisma.cartItem.findMany({
        where: { userId }
    })

    const orderItems = items.map((item) => {
        return {
            gameId: item.gameId,
            quantity: item.quantity,
        }
    });
    

    await prisma.order.create({
        data: {
            stripeSessionId: session.id,
            status: "waiting",
            totalAmount: totalPrice,
            userId: userId,
            items: {
                create: orderItems
            }
        }
    })

    if(!session.url) {
        throw new Error("Session URL is missing")
    }
    redirect(session.url);
}