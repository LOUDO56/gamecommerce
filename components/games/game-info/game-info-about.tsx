import React from 'react'

const GameInfoAbout = ({
    title,
    description
}: {
    title: string | undefined
    description: string | undefined
}) => {
  return (
    <div className='space-y-3'>
        <h2 className='text-3xl font-bold'>About {title}</h2>
        <p className='text-sm'>
            {description}
        </p>
    </div>
  )
}

export default GameInfoAbout