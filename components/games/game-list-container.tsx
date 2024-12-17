'use client'

import React, { useState } from 'react'
import GameFilter from './game-filter'
import GameList from './game-list'
import { Platform } from '@prisma/client'


const GameListContainer = ({ customClass }: { customClass?: string }) => {
  
  const [platform, setPlatform] = useState<Platform>();
  const [filter, setFilter] = useState<"cheaper" | "expensive" | "recent" | "older">();
  const [fromPrice, setFromPrice] = useState(0);
  const [toPrice, setToPrice] = useState(0);

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
        />
      </div>
    </div>
  )
}

export default GameListContainer