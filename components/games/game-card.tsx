import React from 'react'

const GameCard = ({
    imageUrl,
    title,
    price
}: {
    imageUrl: string,
    title: string
    price: number
}) => {
  return (
    <div className='flex flex-col gap-2'>
        <button className="w-[200px] h-[250px] shadow-md rounded-sm overflow-hidden transition duration-300 ease-out hover:scale-105">
            <img 
                src={imageUrl} 
                alt={`${title} game cover`} 
                className="w-full object-fill"
            />
        </button>
        <div className="flex flex-col items-start">
            <span className="font-semibold">{title}</span>
            <span className="text-sm">{price} €</span>
        </div>
    </div>
  )
}

export default GameCard