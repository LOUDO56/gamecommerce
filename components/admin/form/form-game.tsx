'use client'

import { addGame } from '@/actions/add/add-game';
import { editGame } from '@/actions/add/edit-game';
import FormError from '@/components/auth/form-error';
import FormSuccess from '@/components/auth/form-success';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { platformsForm } from '@/lib/utils';
import { GameSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Platform } from '@prisma/client';
import { useState } from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface FormGameProps {
  id?: string
  title?: string;
  description?: string;
  price?: number;
  platforms?: Platform[];
  imageUrl?: string;
  stock?: number;
  mode: "add" | "edit";

}

const FormGame = ({
  id = "",
  title = "",
  description = "",
  price = 0,
  platforms = [],
  imageUrl = "",
  stock = 0,
  mode
}: FormGameProps) => {

  const form = useForm<z.infer<typeof GameSchema>>({
    resolver: zodResolver(GameSchema),
    defaultValues: {
      id,
      title,
      description,
      price,
      platforms,
      imageUrl,
      stock
    }
  });

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, setIsPending] = useState(false);

  const onSubmit = async (values: z.infer<typeof GameSchema>) => {
    setIsPending(false);
    setError("");
    setSuccess("");
    let res;
    switch (mode) {
      case "add":
        res = await addGame(values);
        break;
      case "edit":
        res = await editGame(values);
        break;
    }
    setError(res?.error);
    setSuccess(res?.success);
    if(res?.success) {
      form.reset();
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='flex gap-3 flex-col'>
          <FormField 
            control={form.control}
            name='title'
            defaultValue={title}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input type='text' autoComplete='off'{...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField 
            control={form.control}
            name='description'
            defaultValue={description}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField 
            control={form.control}
            name='price'
            defaultValue={price}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input type='number' autoComplete='off' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="platforms"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel className="text-base">Platform</FormLabel>
                </div>
                {platformsForm.map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="platforms"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item.id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox 
                              checked={field.value?.includes(item.id)}
                              onCheckedChange={(checked) => {
                                const updatedValue = checked
                                  ? [...(field.value || []), item.id]
                                  : (field.value || []).filter((value) => value !== item.id);
                                field.onChange(updatedValue);
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {item.label}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
                <FormMessage />
              </FormItem>
              )}
            />
          <FormField 
            control={form.control}
            name='imageUrl'
            defaultValue={imageUrl}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image URL</FormLabel>
                <FormControl>
                  <Input type='text' autoComplete='off' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField 
            control={form.control}
            name='stock'
            defaultValue={stock}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stock</FormLabel>
                <FormControl>
                  <Input type='number' autoComplete='off' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {mode === "edit" && (
             <FormField 
              control={form.control}
              name='id'
              defaultValue={id}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type='hidden' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <Button disabled={isPending} type="submit" className='mt-3'>Submit</Button>
        </form>
        <FormError message={error} />
        <FormSuccess message={success} />
      </Form>
    </>
  )
}

export default FormGame