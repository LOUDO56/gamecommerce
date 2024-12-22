'use client'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const GameCard = ({
    imageUrl,
    title,
    price,
    href
}: {
    imageUrl: string,
    title: string
    price: number,
    href: string
}) => {

  return (
    <div className='flex flex-col gap-2'>
      <Link className="w-[200px] h-[250px] shadow-md rounded-sm overflow-hidden transition duration-300 ease-out hover:scale-105" href={href}>
        <Image 
            src={imageUrl} 
            alt={`${title} game cover`} 
            className="w-full object-fill"
        />
      </Link>
      <div className="flex flex-col items-start">
        <span className="font-semibold text-sm w-[200px]">{title}</span>
        <span className="text-sm">{price} €</span>
      </div>
    </div>
  )
}

export default GameCard