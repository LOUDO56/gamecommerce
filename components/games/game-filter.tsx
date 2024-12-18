'use client'

import React, { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { FilterGameSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { filterForm, platformsForm } from '@/lib/utils'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import ResetButtonButton from '../ui/reset-select-button'
import { Platform } from '@prisma/client'

interface GameFilterProps {
  setPlatform: Function
  setFilter: Function
  setFromPrice: Function
  setToPrice: Function
}

const GameFilter = ({
  setPlatform,
  setFilter,
  setFromPrice,
  setToPrice
}: GameFilterProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const form = useForm<z.infer<typeof FilterGameSchema>>({
    resolver: zodResolver(FilterGameSchema),
    defaultValues: {
      platform: searchParams.get('platform') as Platform || undefined,
      filter: searchParams.get('filter') || "",
      fromPrice: Number(searchParams.get('fromPrice')) || 0,
      toPrice: Number(searchParams.get('toPrice')) || 0
    }
  });

  const updateUrlAndState = (values: z.infer<typeof FilterGameSchema>) => {
    const validatedFields = FilterGameSchema.safeParse(values);

    if(!validatedFields.success) return;

    const { platform, filter, fromPrice, toPrice } = validatedFields.data;
    
    const params = new URLSearchParams();

    if (platform) params.set('platform', platform);
    if (filter) params.set('filter', filter);
    if (fromPrice && fromPrice > 0) params.set('fromPrice', fromPrice.toString());
    if (toPrice && toPrice > 0) params.set('toPrice', toPrice.toString());

    router.push(`?${params.toString()}`, { scroll: false });

    setPlatform(platform);
    setFilter(filter);
    setFromPrice(fromPrice);
    setToPrice(toPrice);
  };

  const selectHandleReset = (selectLabel: "platform" | "filter") => {
    if(selectLabel === "platform") {
      form.setValue('platform', undefined);
      setPlatform(undefined);
    } else {
      form.setValue('filter', '');
      setFilter("");
    }
    updateUrlAndState(form.getValues());
  }

  const handleReset = () => {
    form.reset({
      platform: undefined,
      filter: "",
      fromPrice: 0,
      toPrice: 0
    });

    updateUrlAndState(form.getValues());

    setPlatform(undefined);
    setFilter("");
    setFromPrice(0);
    setToPrice(0);
  };

  return (
    <Form {...form}>
      <form className='flex xl:flex-row flex-col gap-5'>
        <FormField 
          control={form.control}
          name='platform'
          render={({ field }) => (
            <FormItem className='xl:w-[200px] w-full relative'>
              <FormLabel>Platform</FormLabel>
              <Select 
                onValueChange={(value) => {
                  field.onChange(value)
                  updateUrlAndState({
                    ...form.getValues(),
                  })
                }} 
                value={field.value ?? ""}
              >
                <FormControl>
                  <SelectTrigger>
                    {field.value ? <SelectValue placeholder="Select a platform" /> : "Select a platform"}
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {platformsForm.map((platform) => (
                    <SelectItem 
                      key={platform.id}
                      value={platform.id}
                    >
                      {platform.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {field.value && (
                <ResetButtonButton 
                  selectHandleReset={() => selectHandleReset('platform')}
                />
              )}
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Rest of the form remains the same as your original implementation */}
        <FormField 
          control={form.control}
          name='filter'
          render={({ field }) => (
            <FormItem className='xl:w-[200px] w-full relative'>
              <FormLabel>Filter</FormLabel>
              <Select 
                onValueChange={(value) => {
                  field.onChange(value)
                  updateUrlAndState({
                    ...form.getValues(),
                  })
                }} 
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    {field.value ? <SelectValue placeholder="Select a filter" /> : "Select a filter"}
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {filterForm.map((filter) => (
                    <SelectItem 
                      key={filter.id}
                      value={filter.id}
                    >
                      {filter.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {field.value && (
                <ResetButtonButton 
                  selectHandleReset={() => selectHandleReset('filter')}
                />
              )}
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField 
          control={form.control}
          name='fromPrice'
          render={({ field }) => (
            <FormItem className='xl:w-[200px] w-full'>
              <FormLabel>From €</FormLabel>
              <FormControl>
                <Input 
                  type='number' 
                  {...field} 
                  value={field.value}
                  onChange={(e) => {
                    field.onChange(e);
                    updateUrlAndState({
                      ...form.getValues()
                    });
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField 
          control={form.control}
          name='toPrice'
          render={({ field }) => (
            <FormItem className='xl:w-[200px] w-full'>
              <FormLabel>To €</FormLabel>
              <FormControl>
                <Input 
                  type='number' 
                  {...field} 
                  value={field.value}
                  onChange={(e) => {
                    field.onChange(e);
                    updateUrlAndState({
                      ...form.getValues()
                    });
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='reset' variant='outline' onClick={handleReset} className='xl:self-end xl:w-auto w-full self-start mt-1 xl:mt-0'>Reset</Button>
      </form>
    </Form>
  )
}

export default GameFilter