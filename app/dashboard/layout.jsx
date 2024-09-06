import Header from '@/components/ui/Header'
import React from 'react'

function DashboardLayout({children}) {
  return (
    <div>
      <Header></Header>
      <div className='mx-10 md:mx-36 my-10'>
          {children}
      </div>
    </div>
  )
}

export default DashboardLayout