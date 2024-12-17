'use client'

import { Button } from '@/components/ui/button'
import { MoveLeft } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React from 'react'

const FormAdminContainer = ({ 
    title,
    children,
    href
}: { 
    title: string, 
    children: React.ReactNode,
    href?: string
}) => {

  const searchParams = useSearchParams();
  const backUrl = searchParams.get('backUrl') as string;

  return (
    <div className="h-full flex justify-center items-center">
        <div className="w-[500px] flex flex-col gap-3 m-5">
            <h1 className="text-3xl text-center font-bold">{title}</h1>
            {backUrl && (
              <Link href={backUrl}>
                <Button variant="outline" className='self-start rounded-full w-[30px] h-[35px]'><MoveLeft /></Button>
              </Link>
            )}
            <div>
              {children}
            </div>
        </div>
    </div>
  )
}

export default FormAdminContainer