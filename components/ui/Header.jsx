"use client"
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

function Header() {

  const router = useRouter();
  const path = usePathname();

  return (
    <div className='flex p-2 items-center justify-between bg-secondary shadow-sm font-semibold'>
        <div className='flex justify-start items-center'>
          <Image src={'/logo.svg'} width={50} height={50} alt='logo'></Image>
          <h2 className='text-2xl p-2 font-bold'>Mock-AI</h2>
        </div>
        <ul className='hidden md:flex gap-6'>
            <li onClick={()=>router.replace('/dashboard')} className={`hover:text-primary transition-all hover:font-bold cursor-pointer
              ${path=='/dashboard' && 'text-primary font-bold'}`}>
            Dashboard</li>
            <li onClick={()=>router.replace('/dashboard/questions')} className={`hover:text-primary transition-all hover:font-bold cursor-pointer
             ${path=='/dashboard/questions' && 'text-primary font-bold'}`}>
            Questions</li>
            <li onClick={()=>router.replace('/dashboard/upgrade')} className={`hover:text-primary transition-all hover:font-bold cursor-pointer
             ${path=='/dashboard/upgrade' && 'text-primary font-bold'}`}>
            Upgrade</li>
            <li onClick={()=>router.replace('/dashboard/how')} className={`hover:text-primary transition-all hover:font-bold cursor-pointer
             ${path=='/dashboard/how' && 'text-primary font-bold'}`}>
            How it works?</li>
            <li onClick={()=>router.replace('/dashboard/rate')} className={`hover:text-primary transition-all hover:font-bold cursor-pointer
             ${path=='/dashboard/rate' && 'text-primary font-bold'}`}>
            Rate Us</li>
        </ul>
        <UserButton></UserButton>
    </div>
  )
}

export default Header