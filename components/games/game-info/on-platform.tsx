import { Check, Cross } from 'lucide-react'
import React from 'react'

const OnPlatform = ({
    children
}: {
    children: React.ReactNode
}) => {
  return (
    <div className='text-sm shadow shadow-slate-400 rounded-lg px-5 py-2 flex gap-2 items-center'>
        <div>
           <Check className='text-emerald-500' />
        </div>
        <div>
            {children}
        </div>
    </div>
  )
}

export default OnPlatform