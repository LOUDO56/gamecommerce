'use client'

import { Input } from './input'
import { Search, ShoppingCart, UserRound } from 'lucide-react'
import { Button } from './button'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { ChangeEvent } from 'react'
import { useDebouncedCallback } from 'use-debounce';
import CartIcon from '../cart/cart-icon'

const NavbarUser = () => {

  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultSearch = searchParams.get('search') || "";

  const handleChange = useDebouncedCallback((searchValue: string) => {
    const params = new URLSearchParams();
    const platform = searchParams.get('platform');
    const filter = searchParams.get('filter');
    const fromPrice = searchParams.get('fromPrice');
    const toPrice = searchParams.get('toPrice');

    if(platform) params.set('platform', platform);
    if(filter) params.set('filter', filter);
    if(fromPrice) params.set('fromPrice', fromPrice);
    if(toPrice) params.set('toPrice', toPrice);

    if(searchValue) {
      params.set('search', searchValue);
      router.push(`/browse?${params.toString()}`, { scroll: false })
    } else {
      router.push(`/browse`, { scroll: false })
    }
  }, 400)

  return (
    <header className='fixed w-full z-10'>
        <nav className="flex items-center justify-between gap-3 w-full py-5 px-7 bg-orange-500 text-white">
            <p className='sm:block hidden'>GameEcommerce</p>
            <form className='flex items-center' onSubmit={() => router.push("/browse")}>
                <Input 
                  type='search' 
                  defaultValue={defaultSearch} 
                  placeholder='Outer Wilds...' 
                  className='bg-white w-full sm:w-[400px] md:w-[700px] border-none rounded-r-none text-black' 
                  onChange={(e) => handleChange(e.currentTarget.value)} 
                />
                <div className='font-semibold px-5 py-2 rounded-md rounded-l-none bg-black'><Search size={20} /></div>
            </form>
            <div className="flex gap-4 items-center">
                <Link href="/auth/register"><UserRound size={32} /></Link>
                <CartIcon />
            </div>

        </nav>
    </header>
  )
}

export default NavbarUser