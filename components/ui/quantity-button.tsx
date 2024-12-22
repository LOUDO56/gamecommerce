'use client'

import React, { useContext, useState } from 'react'
import { Button } from './button'
import { Minus, Plus } from 'lucide-react'
import { CartContext } from '@/hooks/use-cart'

const QuantityButton = ({ 
  quantity,
  handleAddCart,
  handleRemoveCart
}: { 
  quantity: number,
  handleAddCart: Function,
  handleRemoveCart: Function
}) => {


  return (
    <div className='flex justify-between items-center bg-black text-white px-4 py-2 rounded-lg'>
      <button><Minus onClick={() => handleRemoveCart()} /></button>
      <span className='font-bold text-sm'>{quantity}</span>
      <button><Plus onClick={() => handleAddCart()} /></button>
    </div>
  )
}

export default QuantityButton