import FormAdminContainer from '@/components/admin/form/form-admin-container';
import FormGame from '@/components/admin/form/form-game';
import { fetchGameInfo } from '@/data/game'
import React from 'react'

const EditGameInfo = async ({
    params
}: {
    params: { gameId: string }
}) => {

  const { gameId } = await params;
  const gameInfo = await fetchGameInfo(gameId);

  return (
    <FormAdminContainer title={`Edit ${gameInfo?.title}`}>
        <FormGame
          id={gameInfo?.id} 
          title={gameInfo?.title}
          description={gameInfo?.description}
          imageUrl={gameInfo?.imageUrl}
          platforms={gameInfo?.platforms}
          price={gameInfo?.price}
          stock={gameInfo?.stock}
          mode='edit'
        />
    </FormAdminContainer>
  )
}

export default EditGameInfo