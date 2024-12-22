const CartCard = ({
    item
}: {
    item: CartItem
}) => {

  return (
    <>
      <div className="flex flex-col gap-3 text-sm">
        <span className='font-bold text-base'>{item.title}</span>
        <div className='flex gap-3'>
          <span>x{item.quantity}</span>
          <div className="flex gap-2">
            <span className='text-gray-400'>@ ${item.price}</span>
            <span className='font-bold'>${(item.price as number * item.quantity).toFixed(2)}</span>
          </div>
        </div>
      </div>
      <hr className='w-full' />
    </>
  )
}

export default CartCard