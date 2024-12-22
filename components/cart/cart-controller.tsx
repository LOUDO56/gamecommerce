'use client'

import React, { useContext, useState } from 'react'
import { Button } from '../ui/button'
import { ShoppingCart } from 'lucide-react'
import QuantityButton from '../ui/quantity-button'
import { CartContext } from '@/hooks/use-cart'

const CartController = ({
  itemId,
  inCartParam,
  defaultQuantity = 1
}: {
  itemId: string,
  inCartParam: boolean,
  defaultQuantity: number
}) => {

  const [inCart, setInCart] = useState(inCartParam);
  const [quantity, setQuantity] = useState(defaultQuantity);

  const { cartAction } = useContext(CartContext);

  const handleAddCart = async () => {
    if(!inCart) setInCart(true);
    setQuantity(quantity + 1);
    cartAction("ADD_ITEM", itemId);
  }

  const handleRemoveCart = async () => {
    setInCart(true);
    setQuantity(quantity - 1);
    if(quantity - 1 === 0) {
      setInCart(false);
    }
    cartAction("REMOVE_ITEM", itemId);
  }

  
  return (
    <>
      {!inCart ? (
        <Button className='flex items-center gap-2 w-full' onClick={handleAddCart}>
          <ShoppingCart />
          <span>Add to cart</span>
        </Button>
      ): (
        <QuantityButton 
          quantity={quantity}
          handleAddCart={handleAddCart}
          handleRemoveCart={handleRemoveCart}
        />
      )}
    </>
  )
}

export default CartController