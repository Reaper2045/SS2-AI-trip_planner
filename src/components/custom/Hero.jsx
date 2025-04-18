import React from 'react'
import { Button } from '../ui/button'

export default function Hero() {
  return (
    <div className='flex flex-col items-center mx-56 gap-9'>
        <h1 className='font-extrabold text-[55px] text-center'>
            <span className='text-[#2c3862]'> 
                'title'Lorem ipsum dolor sit,
            </span> 
            <br/>
            consectetur adipiscing elit. In etaugue.
        </h1>

        <p className='text-xl text-gray-500 text-center'>
            some description about the website here
        </p>

        <Button> Get Started</Button>
    </div>
  )
}
