import React from 'react'
import { Form } from './ui/form'
import { Input } from './ui/input'
import { ShoppingCart, UserRound } from 'lucide-react'
import { Button } from './ui/button'
import Link from 'next/link'

const NavbarUser = () => {
  return (
    <header>
        <nav className="flex items-center justify-between gap-3 w-full py-5 px-4 bg-orange-500 text-white">
            <p className='sm:block hidden'>GameEcommerce</p>
            <form className='flex'>
                <Input type='search' placeholder='Outer Wilds...' className='bg-white w-full sm:w-[400px] md:w-[700px] border-none rounded-r-none text-black' />
                <Button variant="default" className='font-semibold px-8 rounded-l-none'>Rechercher</Button>
            </form>
            <div className="flex gap-4 items-center">
                <Link href="/auth/register"><UserRound size={32} /></Link>
                <ShoppingCart size={32} />
            </div>

        </nav>
    </header>
  )
}

export default NavbarUser