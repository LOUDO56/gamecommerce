'use client'

import { addGame } from '@/actions/add/add-game';
import FormError from '@/components/auth/form-error';
import FormSuccess from '@/components/auth/form-success';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { GameSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Platform } from '@prisma/client';
import { useState } from 'react'
import { useForm } from 'react-hook-form';
import { set, z } from 'zod';

interface FormGameProps {
  title?: string;
  description?: string;
  price?: number;
  platforms?: Platform[];
  imageUrl?: string;
  stock?: number

}

const FormGame = ({
  title = "",
  description = "",
  price = 0,
  platforms = [],
  imageUrl = "",
  stock = 0
}: FormGameProps) => {

  const form = useForm<z.infer<typeof GameSchema>>({
    resolver: zodResolver(GameSchema),
    defaultValues: {
      title,
      description,
      price,
      platform: platforms,
      imageUrl,
      stock
    }
  });

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, setIsPending] = useState(false);

  const platformsForm = [
    { id: Platform.PC, label: "PC" },
    { id: Platform.PS4, label: "PS4" },
    { id: Platform.PS5, label: "PS5" },
    { id: Platform.XBOX_ONE, label: "Xbox One" },
    { id: Platform.XBOX_SERIES_X_S, label: "Xbox Series X|S" },
    { id: Platform.NINTENDO_SWITCH, label: "Nintendo Switch" },
  ] as const;

  const onSubmit = async (values: z.infer<typeof GameSchema>) => {
    setIsPending(false);
    setError("");
    setSuccess("");
    const res = await addGame(values);
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
            name="platform"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel className="text-base">Platform</FormLabel>
                </div>
                {platformsForm.map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="platform"
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
          <Button disabled={isPending} type="submit" className='mt-3'>Submit</Button>
        </form>
        <FormError message={error} />
        <FormSuccess message={success} />
      </Form>
    </>
  )
}

export default FormGame