'use client'
import { IconBrandGoogle } from '@tabler/icons-react'
import { signIn } from 'next-auth/react'

export default function GoogleSignInBtn() {
  const handleClick = () => {
    signIn('google')
  }

  return (
    <button 
      onClick={handleClick}
      className='outline-none w-fit mx-auto flex items-center gap-3 p-3 m-3 rounded-lg border border-neutral-600 hover:bg-neutral-600'
    >
      <IconBrandGoogle 
        size='20px' 
        strokeWidth='3'
        className='text-white' 
      />
      <span className='text-sm text-neutral-300 font-medium'>
        Đăng nhập với <span className='font-bold'>Google</span>
      </span>
    </button>
  )
}