
import BackUrl from '@/components/ui/back-url'
import React from 'react'

const FormAdminContainer = ({ 
    title,
    children,
}: { 
    title: string, 
    children: React.ReactNode
}) => {

  return (
    <div className="h-full flex justify-center items-center">
        <div className="w-[500px] flex flex-col gap-3 m-5 relative">
            <BackUrl />
            <h1 className="text-3xl text-center font-bold">{title}</h1>
            <div className='mt-10'>
              {children}
            </div>
        </div>
    </div>
  )
}

export default FormAdminContainer