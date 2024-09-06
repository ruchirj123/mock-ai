"use client"
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import React from 'react'

function Header() {

  const path = usePathname();

  return (
    <div className='flex p-2 items-center justify-between bg-secondary shadow-sm font-semibold'>
        <div className='flex justify-start items-center'>
          <Image src={'/logo.svg'} width={50} height={50} alt='logo'></Image>
          <h2 className='text-2xl p-2 font-bold'>Mock-AI</h2>
        </div>
        <ul className='hidden md:flex gap-6'>
            <li className={`hover:text-primary transition-all hover:font-bold cursor-pointer
              ${path=='/dashboard' && 'text-primary font-bold'}`}>
            Dashboard</li>
            <li className={`hover:text-primary transition-all hover:font-bold cursor-pointer
             ${path=='/dashboard/interview/' && 'text-primary font-bold'}`}>
            Questions</li>
            <li className={`hover:text-primary transition-all hover:font-bold cursor-pointer
             ${path=='/dashboard/upgrade' && 'text-primary font-bold'}`}>
            Upgrade</li>
            <li className={`hover:text-primary transition-all hover:font-bold cursor-pointer
             ${path=='/dashboard/how' && 'text-primary font-bold'}`}>
            How it works?</li>
        </ul>
        <UserButton></UserButton>
    </div>
  )
}

export default Header