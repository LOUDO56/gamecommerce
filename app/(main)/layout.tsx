import NavbarUser from '@/components/ui/navbar-user'
import { CartContextProvider } from '@/hooks/use-cart'
import React, { Suspense } from 'react'

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <CartContextProvider>
      <Suspense>
        <NavbarUser />
      </Suspense>
      {children}
    </CartContextProvider>
  )
}

export default MainLayout   