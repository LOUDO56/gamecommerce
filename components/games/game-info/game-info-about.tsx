import React from 'react'

const GameInfoAbout = ({
    title,
    description
}: {
    title: string | undefined
    description: string | undefined
}) => {
  return (
    <div className='space-y-4 max-w-3xl pb-20'>
        <h2 className='text-3xl font-bold'>About {title}</h2>
        <p className='text-base leading-relaxed'>
            {description}
        </p>
    </div>
  )
}

export default GameInfoAbout

