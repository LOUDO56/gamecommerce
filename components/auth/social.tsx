'use client'

import React from 'react'
import { Button } from '../ui/button'
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from 'react-icons/fa6';
import { signIn } from 'next-auth/react';
import { DEFAULT_REDIRECT_URL } from '@/routes';

const Social = () => {
  return (
    <div className='flex flex-col gap-4 w-full'>
      <Button className='flex items-center gap-2 py-5' variant="outline" onClick={() => signIn('google', { callbackUrl: DEFAULT_REDIRECT_URL })}>
        <FcGoogle />
        <span>Sign in with Google</span>
      </Button>
      <Button className='flex items-center gap-2 py-5' variant="outline" onClick={() => signIn('github', { callbackUrl: DEFAULT_REDIRECT_URL })}>
        <FaGithub />
        <span>Sign in with Github</span>
      </Button>
    </div>
  )
}

export default Social