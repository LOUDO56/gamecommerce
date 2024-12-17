'use client'

import React from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { FilterGameSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { filterForm, platformsForm } from '@/lib/utils'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Cross, X } from 'lucide-react'
import ResetButtonButton from '../ui/reset-select-button'

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
  
  const form = useForm<z.infer<typeof FilterGameSchema>>({
    resolver: zodResolver(FilterGameSchema),
    defaultValues: {
      platform: undefined,
      filter: "",
      fromPrice: 0,
      toPrice: 0
    }
  });

  const selectHandleReset = (selectLabel: "platform" | "filter") => {
    if(selectLabel === "platform") {
      form.setValue('platform', undefined);
      setPlatform(undefined);
    } else {
      form.setValue('filter', '');
      setFilter("");
    }
  }

  const handleReset = () => {
    form.reset();

    setPlatform(undefined);
    setFilter("");
    setFromPrice(0);
    setToPrice(0);
  };

  const handleChange = async (values: z.infer<typeof FilterGameSchema>) => {

    console.log(values)
    const validatedFields = FilterGameSchema.safeParse(values);

    if(!validatedFields.success) return;

    const { platform, filter, fromPrice, toPrice } = validatedFields.data;
    
    setPlatform(platform);
    setFilter(filter);
    setFromPrice(fromPrice);
    setToPrice(toPrice);

  };

  return (
    <Form {...form}>
      <form className='flex lg:flex-row flex-col gap-5'>
        <FormField 
          control={form.control}
          name='platform'
          render={({ field }) => (
            <FormItem className='lg:w-[200px] w-full relative'>
              <FormLabel>Platform</FormLabel>
              <Select 
                onValueChange={(value) => {
                  field.onChange(value)
                  handleChange({
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
        <FormField 
          control={form.control}
          name='filter'
          render={({ field }) => (
            <FormItem className='lg:w-[200px] w-full relative'>
              <FormLabel>Filter</FormLabel>
              <Select 
                onValueChange={(value) => {
                  field.onChange(value)
                  handleChange({
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
            <FormItem className='lg:w-[200px] w-full'>
              <FormLabel>From</FormLabel>
              <FormControl>
                <Input 
                  type='number' 
                  {...field} 
                  value={field.value}
                  onChange={(e) => {
                    field.onChange(e);
                    handleChange({
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
            <FormItem className='lg:w-[200px] w-full'>
              <FormLabel>To</FormLabel>
              <FormControl>
                <Input 
                  type='number' 
                  {...field} 
                  value={field.value}
                  onChange={(e) => {
                    field.onChange(e);
                    handleChange({
                      ...form.getValues()
                    });
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='reset' variant='outline' onClick={handleReset} className='lg:self-end lg:w-auto w-full self-start mt-1 lg:mt-0'>Reset</Button>
      </form>
    </Form>
  )
}

export default GameFilter