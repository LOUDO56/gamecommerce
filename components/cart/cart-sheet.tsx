
'use client'

import { CartContext } from '@/hooks/use-cart'
import React, { useContext } from 'react'
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import CartIcon from './cart-icon'
import { Button } from '../ui/button'
import CartCard from './cart-card'
import CartBuy from './cart-buy'


const CartSheet = () => {
  const { carts } = useContext(CartContext)
  let totalPrice = 0;
  carts.forEach((item) => {
    totalPrice = item.price * item.quantity;
  })
  totalPrice = Math.round(totalPrice * 100);

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
        <div className='py-5'>
          {carts.length === 0 ? (
            <p>Your cart is empty :(</p>
          ) : (
            <div className='flex flex-col gap-5'>
              {carts.map((item, index) => (
                <CartCard 
                  key={index}
                  item={item}
                />
              ))}
            </div>
          )}
        </div>
        <SheetFooter>
          <SheetClose asChild>
            {carts.length > 0 && (
              <CartBuy 
                totalPrice={totalPrice}
              />
            )}
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default CartSheet

