'use client'

import React from 'react'
import { Button } from './button'
import { MoveLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

const BackUrl = () => {

  const router = useRouter();
  const handleBack = () => {
    router.back();
  }

  return (
    <Button variant="outline" className='rounded-full w-[30px] h-[35px] mt-5' onClick={handleBack}><MoveLeft /></Button>
  )
}

export default BackUrl