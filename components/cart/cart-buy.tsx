import React from 'react'
import { Button } from '../ui/button'
import { stripe } from '@/lib/stripe'
import { auth } from '@/auth'
import { prisma } from '@/prisma'
import { redirect } from 'next/navigation'
import { buyAction } from '@/actions/buy'

const CartBuy = ({
  totalPrice,
}: {
  totalPrice: number,
}) => {
  return (
    <form>
      <Button type="submit" formAction={() => buyAction(totalPrice)}>Buy</Button>
    </form>
  )
}

export default CartBuy