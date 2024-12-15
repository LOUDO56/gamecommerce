import NavbarUser from '@/components/navbar-user'
import React from 'react'

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NavbarUser />
      {children}
    </>
  )
}

export default MainLayout   