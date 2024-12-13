import React from 'react'
import { IoInformationCircleOutline } from "react-icons/io5";

const FormError = ({ message }: { message: string | undefined }) => {

  if(!message) return null;
    
  return (
    <div className='flex items-center gap-3 rounded-lg border-2 border-red-300 bg-red-200 w-full text-red-700 py-4 px-3 mt-3'>
        <IoInformationCircleOutline className='w-4 h-4' />
        <span>{message}</span>
    </div>
  )
}

export default FormError