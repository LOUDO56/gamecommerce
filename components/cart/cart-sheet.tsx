'use client'

import { CartContext } from '@/hooks/use-cart'
import React, { useContext } from 'react'
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import CartIcon from './cart-icon'
import { Button } from '../ui/button'

const CartSheet = () => {
  const { carts } = useContext(CartContext)

  return (
    <Sheet>
      <SheetTrigger>
        <CartIcon />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Your carts</SheetTitle>
          <SheetDescription>
            Double check before confirming. Once confirmed, you'll be redirected to the Stripe page.
          </SheetDescription>
        </SheetHeader>
        <div>
          {carts.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <ul>
              {carts.map((item, index) => (
                <li key={index}>{item.title} {item.quantity} {item.id}</li>
              ))}
            </ul>
          )}
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default CartSheet

