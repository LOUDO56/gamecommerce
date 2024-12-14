'use client'

import React, { useState } from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { LoginSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { login } from '@/actions/login';
import CardWrapper from './card-wrapper';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import FormError from './form-error';
import { useSearchParams } from 'next/navigation';

const LoginForm = () => {

  const searchParams = useSearchParams();
  const urlError = searchParams.get('error') === 'OAuthAccountNotLinked' ? 'Email already in use with different provider.' : '';

  const [error, setError] = useState<string | undefined>("");
  const [pending, setPending] = useState(false);

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  });

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setPending(true);
    const res = await login(values);
    setPending(false);
    setError(res?.error);
    
  };

  return (
    <CardWrapper
      titleLabel='Welcome back!'
      descriptionLabel='Please fill your credentials.'
      backButtonLabel="Don't have an account?"
      backButtonLabelLink='Sign up'
      backButtonHref='/auth/register'
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='flex gap-3 flex-col'>
          <FormField 
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type='email' autoComplete='off' placeholder='johndoe@example.com' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField 
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type='password' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={pending} type="submit" className='mt-3'>Sign in</Button>
        </form>
      </Form>
      <FormError message={error || urlError} />
    </CardWrapper>
  )
}

export default LoginForm