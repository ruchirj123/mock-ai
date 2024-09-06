import React from 'react'
import { Button } from './button'
import { useRouter } from 'next/navigation'

function InterviewItemCard({interview}) {

    const router = useRouter();

  return (
    <div className='border shadow-sm rounded-lg p-3'>
        <h2 className='text-lg font-bold text-primary'>{interview?.jobPosition}</h2>
        <h2 className='text-sm text-gray-600'>{interview?.jobExperience} Years of Experience</h2>
        <h2 className='text-sm text-gray-400'>Created At: {interview?.createdAt}</h2>

        <div className='flex justify-between mt-3 gap-3'>
            <Button onClick={() => router.push('/dashboard/interview/'+interview?.mockId+'/feedback')} className='w-full' size="sm" variant="outline">Feedback</Button>
            <Button onClick={() => router.push('/dashboard/interview/'+interview?.mockId)} className='w-full' size="sm">Start</Button>
        </div>
    </div>
  )
}

export default InterviewItemCard