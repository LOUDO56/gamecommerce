import GameInfoContainer from '@/components/games/game-info/game-info-container';
import { fetchGameInfo } from '@/data/game'
import React from 'react'

const GamePage = async ({
  params
}: {
  params: Promise<{ gameId: string }>
}) => {

  const { gameId } = await params;
  let gameInfo = null;
  try {
    gameInfo = await fetchGameInfo(gameId);
  } catch (error) {
    console.log('Error while fetching game info: ' + error)
  }

  return (
    <div className="min-h-screen w-full pt-16 flex justify-center items-center">
      <GameInfoContainer gameInfo={gameInfo} />
    </div>
  )
}

export default GamePage

