'use client';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterSchema } from '@/schemas';
import { z } from 'zod';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import CardWrapper from './card-wrapper';
import { useState } from 'react';
import { register } from '@/actions/register';
import FormError from './form-error';
import FormSuccess from './form-success';

const RegisterForm = () => {

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [pending, setPending] = useState(false);

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      username: "",
      email: "",
      password: ""
    },
  });

  const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSuccess("");
    setPending(true);
    const res = await register(values);
    setPending(false);
    console.log('aa')
    console.log(res);
    setError(res.error);
    setSuccess(res.success);
    
  };

  return (
    <CardWrapper
      titleLabel='Create an account'
      backButtonLabel='Already have an account?'
      backButtonLabelLink='Sign in'
      backButtonHref='/auth/login'
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='flex gap-3 flex-col'>
          <FormField 
            control={form.control}
            name='username'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input type='text' placeholder='John Doe' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField 
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type='email' placeholder='johndoe@example.com' {...field} />
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
          <Button disabled={pending} type="submit" className='mt-3'>Submit</Button>
        </form>
      </Form>
      <FormError message={error} />
      <FormSuccess message={success} />
    </CardWrapper>
  )
}

export default RegisterForm