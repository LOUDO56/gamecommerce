import CardWrapper from '@/components/auth/card-wrapper'
import React from 'react'

const ErrorAuth = () => {
  return (
    <CardWrapper
        titleLabel='Error'
        descriptionLabel='Wow... Something went very wrong!'
        backButtonLabel='Want to try again?'
        backButtonLabelLink='Sign in'
        backButtonHref='/auth/login'
    >
        <div className='text-destructive text-center pb-6'>
            <span>Something went wrong during authentification!</span>
        </div>
    </CardWrapper>
  )
}

export default ErrorAuth