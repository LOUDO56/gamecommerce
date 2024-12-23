import React from 'react'
import { Button } from './button'
import { X } from 'lucide-react'

const ResetButtonButton = ({ selectHandleReset }: { selectHandleReset: (selectLabel: "platform" | "filter") => void } ) => {
  return (
    <Button 
      variant="outline"
      className='absolute px-1 py-0 top-2 -right-3 rounded-full w-[30px] h-[30px]' 
      onClick={() => selectHandleReset("platform")}>
      {<X />}
    </Button>
  )
}

export default ResetButtonButton