import React from 'react'
import { FaCheck } from "react-icons/fa6";

const FormSuccess = ({ message }: { message: string | undefined }) => {

  if(!message) return null;

  return (
    <div className='flex items-center gap-3 rounded-lg border-2 border-emerald-300 bg-emerald-200 w-full text-emerald-700 py-4 px-3 mt-3 text-sm'>
        <FaCheck className='w-4 h-4' />
        <span>{message}</span>
    </div>
  )
}

export default FormSuccess