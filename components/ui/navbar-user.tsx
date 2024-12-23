import SearchBar from './search-bar'
import CartSheet from '../cart/cart-sheet'
import User from './user'


const NavbarUser = () => {

  return (
    <header className='fixed w-full z-10'>
        <nav className="flex items-center justify-between gap-3 w-full py-5 px-7 bg-orange-500 text-white">
            <p className='sm:block hidden'>GameEcommerce</p>
            <SearchBar />
            <div className="flex gap-4 items-center">
                <User />
                <CartSheet />
            </div>

        </nav>
    </header>
  )
}

export default NavbarUser