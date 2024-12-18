import GameList from '@/components/games/game-list'
import GameListContainer from '@/components/games/game-list-container'
import React from 'react'

const EditGameDashboard = async () => {

  return (
    <div>
        <GameListContainer customClass='m-14' mode='admin' />
    </div>
  )
}

export default EditGameDashboard