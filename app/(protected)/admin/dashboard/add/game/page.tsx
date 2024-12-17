import FormAdminContainer from '@/components/admin/form/form-admin-container'
import FormGame from '@/components/admin/form/form-game'
import React from 'react'

const AddGame = () => {
  return (
    <FormAdminContainer title='Add a game'>
      <FormGame mode='add'/>
    </FormAdminContainer>
  )
}

export default AddGame