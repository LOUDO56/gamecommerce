'use client'

import { filterForm, platformsForm } from '@/lib/utils'
import { FilterGameSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { $Enums, Platform } from '@prisma/client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '../../ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../ui/form'
import { Input } from '../../ui/input'
import ResetButtonButton from '../../ui/reset-select-button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select'

interface GameFilterProps {
  setPlatform: React.Dispatch<React.SetStateAction<$Enums.Platform | undefined>>;
  setFilter: React.Dispatch<React.SetStateAction<"cheaper" | "expensive" | "recent" | "older" | "">>;
  setFromPrice: React.Dispatch<React.SetStateAction<number>>;
  setToPrice: React.Dispatch<React.SetStateAction<number>>;
}

const GameFilter = ({
  setPlatform,
  setFilter,
  setFromPrice,
  setToPrice,
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
    const search = searchParams.get('search');

    if (platform) params.set('platform', platform);
    if (filter) params.set('filter', filter);
    if (fromPrice && fromPrice > 0) params.set('fromPrice', fromPrice.toString());
    if (toPrice && toPrice > 0) params.set('toPrice', toPrice.toString());
    if (search) params.set('search', search.toString());

    router.push(`?${params.toString()}`, { scroll: false });

    if(platform) setPlatform(platform);

    if(filter) setFilter(filter as "cheaper" | "expensive" | "recent" | "older" | "");
    if(fromPrice) setFromPrice(fromPrice);
    if(toPrice) setToPrice(toPrice);
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
      <form className='flex md:flex-row flex-col gap-5 justify-center flex-wrap'>
        <FormField 
          control={form.control}
          name='platform'
          render={({ field }) => (
            <FormItem className='md:w-[200px] w-full relative'>
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
            <FormItem className='md:w-[200px] w-full relative'>
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
            <FormItem className='md:w-[200px] w-full'>
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
            <FormItem className='md:w-[200px] w-full'>
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
        <Button type='reset' variant='outline' onClick={handleReset} className='md:self-end md:w-auto w-full self-start mt-3 md:mt-0'>Reset</Button>
      </form>
    </Form>
  )
}

export default GameFilter