import GameInfoContainer from '@/components/games/game-info/game-info-container';
import { fetchGameInfo } from '@/data/game'
import React from 'react'

const GamePage = async ({
  params
}: {
  params: { gameId: string }
}) => {

  const { gameId } = await params;
  let gameInfo = null;
  try {
    gameInfo = await fetchGameInfo(gameId);
  } catch (error) {
    console.log('Error while fetching game info: ' + error)
  }

  return (
    <GameInfoContainer gameInfo={gameInfo} />
  )
}

export default GamePage