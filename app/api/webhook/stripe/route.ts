import { clearItemsInCart } from "@/actions/cart";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/prisma";
import { headers } from "next/headers";
import Stripe from "stripe";

export const POST = async (req: Request) => {

    const body = await req.text();
    const headersList = await headers();
    const sig = headersList.get('Stripe-Signature') as string;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET as string
        ) 
    } catch (error : unknown) {
        return new Response('Error stripe webhook', { status: 400 })
    }

    const session = event.data.object as Stripe.Checkout.Session

    console.log(event.type)

    switch(event.type) {
        case "checkout.session.completed": {
            const user = await prisma.user.findUnique({
                where: { stripeCustomerId: session.customer as string }
            })
            await prisma.cartItem.deleteMany({
                where: { userId: user?.id }
            })
            await prisma.order.update({
                data: {
                    status: "paid"
                },
                where: {
                    stripeSessionId: session.id
                }
            })
            break;
        }
        default: {
            return new Response('Invalid event type', { status: 400 })
        }
    }
}