import { ShoppingCart } from 'lucide-react'
import React, { useContext } from 'react'
import { CartItem } from '@prisma/client';
import { CartContext } from '@/hooks/use-cart';

const CartIcon = () => {

  const { carts } = useContext(CartContext);

  return (
    <button className='relative'>
        <span className='absolute flex items-center justify-center w-5 h-5 bg-black rounded-full -top-1 -right-2 text-sm font-bold select-none'>{carts.length}</span>
        <ShoppingCart size={32} />
    </button>
  )
}

export default CartIcon