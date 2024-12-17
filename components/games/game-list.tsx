import { fetchGames } from '@/data/game'
import { Game, Platform } from '@prisma/client';
import React, { useEffect, useState } from 'react'
import GameCard from './game-card';
import GameSkeleton from './game-skeleton';

interface GameListProps {
  platform?: Platform,
  filter?: "cheaper" | "expensive" | "recent" | "older",
  fromPrice?: number,
  toPrice?: number
}

const GameList = ({
  platform,
  filter,
  fromPrice,
  toPrice
}: GameListProps) => {

  const [games, setGames] = useState<Array<Game>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const skeletonGameList = Array(25).fill(<GameSkeleton />)

  useEffect(() => {
    const loadGames = async () => {
      try {
        setIsLoading(true);
        setGames([]);
        const fetchedGames = await fetchGames(platform, filter, fromPrice, toPrice)
        setGames(fetchedGames);
      } catch (error) {
        console.log("Error while fetching games: " + error)
      } finally {
        setIsLoading(false)
      }
    }
    loadGames();
  }, [platform, filter, fromPrice, toPrice])

  return (
    <>
      {isLoading && (
        skeletonGameList.map((skeleton, index) => (
          <div key={index}>
            {skeleton}
          </div>
        ))
      )}
      {games.map((game) => (
        <GameCard 
          key={game.id}
          imageUrl={game.imageUrl}
          title={game.title}
          price={game.price}
        />
      ))}
      {(games.length === 0 && !isLoading) && (
        <h1 className='text-3xl font-bold text-center w-full'>Aucun résultat.</h1>
      )}
    </>
  )
}

export default GameList