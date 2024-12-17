'use client'

import { fetchGames } from '@/data/game'
import { Game, Platform } from '@prisma/client';
import React, { useEffect, useState } from 'react'
import GameCard from './game-card';
import GameSkeleton from './game-skeleton';
import { useSearchParams } from 'next/navigation';
import { PaginationWithLinks } from '../ui/pagination-with-links';

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

  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get('page') || "1");
  const pageSize = parseInt(searchParams.get('pageSize') || "10");
  
  const [games, setGames] = useState<Array<Game>>([]);
  const [countGame, setCountGames] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const skeletonGameList = Array(5).fill(<GameSkeleton />)

  useEffect(() => {
    const loadGames = async () => {
      try {
        setIsLoading(true);
        setGames([]);
        const { fetchedGames, totalCountGames } = await fetchGames(platform, filter, fromPrice, toPrice, page, pageSize);
        setGames(fetchedGames);
        setCountGames(totalCountGames);
      } catch (error) {
        console.log("Error while fetching games: " + error)
      } finally {
        setIsLoading(false)
      }
    }
    loadGames();
  }, [platform, filter, fromPrice, toPrice, page, pageSize])

  return (
    <div className='flex flex-col gap-3'>
      <div className='flex flex-wrap gap-5 items-center sm:justify-start justify-center'>
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
      </div>
      <div>
        {!isLoading && <PaginationWithLinks page={page} pageSize={pageSize} totalCount={countGame} />}
      </div>
    </div>
  )
}

export default GameList