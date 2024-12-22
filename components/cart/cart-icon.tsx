'use client'

import { ShoppingCart } from 'lucide-react'
import React, { useContext } from 'react'
import { CartContext } from '@/hooks/use-cart';

const CartIcon = () => {

  const { carts } = useContext(CartContext);

  return (
    <div className='relative'>
      {carts.length > 0 && (
        <span className='absolute flex items-center justify-center w-5 h-5 bg-black rounded-full -top-1 -right-2 text-sm font-bold select-none'>{carts.length}</span>
      )}
      <ShoppingCart size={32} />
    </div>
  )
}

export default CartIcon