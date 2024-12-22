import { auth, signOut } from '@/auth'
import { UserRound } from 'lucide-react'
import React from 'react'
import { DropdownMenuContent, DropdownMenu, DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem  } from './dropdown-menu';
import Link from 'next/link';
import { Button } from './button';

const User = async () => {

  const session = await auth();
  const user = session?.user;


  return (
    <DropdownMenu>
      <DropdownMenuTrigger><UserRound size={32} /></DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{user !== undefined ? (
          <span>Hello, <span className='font-bold'>{user?.name}</span></span>
        ) : (
          <span>Not signed in, <Link href="/auth/login" className='text-blue-500 underline'>login</Link>.</span>
        )}</DropdownMenuLabel>
        {user && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <form action={async () => {
                "use server"
                await signOut()
              }}>
                <Button type='submit' variant="link">Sign out</Button>
              </form>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default User