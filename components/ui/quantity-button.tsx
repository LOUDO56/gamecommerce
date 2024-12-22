'use client'

import { Minus, Plus } from 'lucide-react'

const QuantityButton = ({ 
  quantity,
  handleAddCart,
  handleRemoveCart
}: { 
  quantity: number,
  handleAddCart: () => {},
  handleRemoveCart: () => {}
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