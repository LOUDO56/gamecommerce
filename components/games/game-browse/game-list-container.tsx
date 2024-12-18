'use client'

import React, { useState } from 'react'
import GameFilter from './game-filter'
import GameList from './game-list'
import { Platform } from '@prisma/client'
import { useSearchParams } from 'next/navigation'


const GameListContainer = ({ customClass, mode }: { customClass?: string, mode: "user" | "admin" }) => {

  const searchParams = useSearchParams();
  
  const [platform, setPlatform] = useState<Platform>(searchParams.get('platform') as Platform || undefined);
  const [filter, setFilter] = useState<"cheaper" | "expensive" | "recent" | "older">(searchParams.get('filter') as "cheaper" | "expensive" | "recent" | "older" || "");
  const [fromPrice, setFromPrice] = useState(Number(searchParams.get('fromPrice')) || 0);
  const [toPrice, setToPrice] = useState(Number(searchParams.get('toPrice')) || 0);
  const search = searchParams.get('search') as string;

  return (
    <div className={`flex flex-col gap-10 ${customClass}`}>
      <div>
        <GameFilter 
          setPlatform={setPlatform}
          setFilter={setFilter}
          setFromPrice={setFromPrice}
          setToPrice={setToPrice}
        />
      </div>
      <div>
        <GameList 
          platform={platform}
          filter={filter}
          fromPrice={fromPrice}
          toPrice={toPrice}
          search={search}
          mode={mode}
        />
      </div>
    </div>
  )
}

export default GameListContainer