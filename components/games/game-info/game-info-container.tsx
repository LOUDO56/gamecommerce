import React from 'react'
import { Game } from '@prisma/client'
import GameInfoCard from './game-info-card'
import GameInfoAbout from './game-info-about'

const GameInfoContainer = ({
    gameInfo
}: {
    gameInfo: Game | null
}) => {
  return (
    <div className='flex flex-col gap-8 justify-center lg:items-start items-center pt-8 px-4 md:px-6 lg:px-8 mx-auto'>
      <GameInfoCard gameInfo={gameInfo} />
      <GameInfoAbout title={gameInfo?.title} description={gameInfo?.description} />
    </div>
  )
}

export default GameInfoContainer

