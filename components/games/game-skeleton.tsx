import React from 'react'
import { Skeleton } from '../ui/skeleton'

const GameSkeleton = () => {
  return (
    <div className='flex flex-col gap-2'>
        <Skeleton className="w-[200px] h-[255px]" />
        <div className="flex flex-col items-start gap-2">
            <Skeleton className="w-[150px] h-[15px]" />
            <Skeleton className="w-[80px] h-[15px]" />
        </div>
    </div>
  )
}

export default GameSkeleton