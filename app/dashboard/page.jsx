import AddNewInterview from '@/components/ui/AddNewInterview'
import Header from '@/components/ui/Header'
import InterviewList from '@/components/ui/InterviewList'
import { UserButton } from '@clerk/nextjs'
import React from 'react'

function Dashboard() {
  return (
    <div>
      <h2 className='text-2xl font-bold'>Dashboard</h2>
      <h2>Create and start your AI powered Mock Interview</h2>
      <div className='my-5 grid grid-cols-1 md:grid-cols-3'>
        <AddNewInterview></AddNewInterview>
      </div>
      <InterviewList/>
    </div>
  )
}

export default Dashboard