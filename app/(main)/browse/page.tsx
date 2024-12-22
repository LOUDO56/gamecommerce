'use client'

import GameListContainer from '@/components/games/game-browse/game-list-container';
import React, { Suspense } from 'react'

const Browse = () => {
  return (
    <div className='h-full w-full flex items-center justify-center pt-20'>
      <Suspense>
        <GameListContainer customClass='w-[1200px] my-3 mx-5' mode='user' />
      </Suspense>
    </div>
  )
}

export default Browse