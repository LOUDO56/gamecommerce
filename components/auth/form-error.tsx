import React from 'react'
import { IoInformationCircleOutline } from "react-icons/io5";

const FormError = ({ message }: { message: string | undefined }) => {

  if(!message) return null;
    
  return (
    <div className='flex items-center gap-2 rounded-lg bg-red-200 w-full text-red-600 py-4 px-3 mt-3 text-sm'>
        <IoInformationCircleOutline size={14} />
        <span>{message}</span>
    </div>
  )
}

export default FormError