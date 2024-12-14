import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import Social from './social';
import { Button } from '../ui/button';
import Link from 'next/link';

interface CardWrapperProps {
    titleLabel: string;
    descriptionLabel?: string;
    showSocial?: boolean;
    backButtonHref: string;
    backButtonLabel: string;
    backButtonLabelLink: string;
    children: React.ReactNode;
}

const CardWrapper = ({ 
    titleLabel, 
    descriptionLabel, 
    showSocial,
    backButtonHref,
    backButtonLabel,
    backButtonLabelLink,
    children
}: CardWrapperProps) => {
  return (
    <Card className='w-[400px] mx-4 shadow-md'>
        <CardHeader className='text-center'>
            <CardTitle className='text-2xl'>{titleLabel}</CardTitle>
            <CardDescription>{descriptionLabel}</CardDescription>
        </CardHeader>
        <CardContent className='pb-0'>{children} 
            {showSocial && 
                <div className='flex gap-2 items-center my-5'>
                    <span className='h-[1px] w-full bg-border'></span>
                    <span className='text-sm text-gray-700'>or</span>
                    <span className='h-[1px] w-full bg-border'></span>
                </div>
            }
        </CardContent>
        {showSocial && (
            <CardFooter>
                <Social />
            </CardFooter>
        )}
        <CardFooter className='flex items-center justify-center'>
            <span className='text-sm'>
                {backButtonLabel}
                <Button 
                    variant='link'
                    className='px-1 text-blue-400'
                    asChild
                >
                    <Link href={backButtonHref}>{backButtonLabelLink}</Link>
                </Button>
            </span>
        </CardFooter>
    </Card>
  )
}

export default CardWrapper