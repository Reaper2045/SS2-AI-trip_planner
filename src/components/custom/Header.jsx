import { Image } from 'lucide-react'
import React from 'react'
import { Button } from '../ui/button'

export default function Header() {
  return (
    <div className='p-2 shadow-sm flex justify-between items-center px-5'>
        <img src='/logo.svg'/>
        <div>
            <Button>Sign In</Button>
        </div>
    </div>
  )
}
