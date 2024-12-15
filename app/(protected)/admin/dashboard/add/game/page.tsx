import FormGame from '@/components/admin/form/form-game'
import React from 'react'

const AddGame = () => {
  return (
    <div className="h-full flex justify-center items-center">
        <div className="w-[500px] ">
            <h1 className="text-3xl text-center font-bold mb-10">Add a game</h1>
            <FormGame />
        </div>
    </div>
  )
}

export default AddGame