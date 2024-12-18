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
    <div className='flex flex-col gap-5 w-full h-screen items-center justify-center'>
        <GameInfoCard gameInfo={gameInfo} />
        <GameInfoAbout title={gameInfo?.title} description={gameInfo?.description} />
    </div>
  )
}

export default GameInfoContainer