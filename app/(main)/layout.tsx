import NavbarUser from '@/components/ui/navbar-user'
import { CartContextProvider } from '@/hooks/use-cart'
import React from 'react'

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <CartContextProvider>
      <NavbarUser />
      {children}
    </CartContextProvider>
  )
}

export default MainLayout   