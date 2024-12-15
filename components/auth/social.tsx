'use client'

import React from 'react'
import { Button } from '../ui/button'
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from 'react-icons/fa6';
import { signIn } from 'next-auth/react';
import { DEFAULT_REDIRECT_URL } from '@/routes';

const Social = ({ type }: { type: "signin" | "signup" }) => {
  return (
    <div className='flex flex-col gap-4 w-full'>
      <Button className='flex items-center gap-2 py-5' variant="outline" onClick={() => signIn('google', { callbackUrl: DEFAULT_REDIRECT_URL })}>
        <FcGoogle />
        <span>{ type === 'signin' ? 'Sign in' : 'Sign up' } with Google</span>
      </Button>
      <Button className='flex items-center gap-2 py-5' variant="outline" onClick={() => signIn('github', { callbackUrl: DEFAULT_REDIRECT_URL })}>
        <FaGithub />
        <span>{ type === 'signin' ? 'Sign in' : 'Sign up' } with Github</span>
      </Button>
    </div>
  )
}

export default Social