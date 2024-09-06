'use client'
import { db } from '@/utils/db'
import { UserAnswer } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
  } from "@/components/ui/collapsible"
import { ChevronsUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
  

function Feedback({params}) {
  
    const [feedbackList, setFeedbackList] = useState([]);
    const router = useRouter();

    useEffect(()=>{
        GetFeedback();
    }, [])

    const GetFeedback = async() => {
        const result = await db.select().from(UserAnswer)
        .where(eq(UserAnswer.mockIdRef, params.interviewId))
        .orderBy(UserAnswer.id);
        console.log(result);
        setFeedbackList(result)
    }

    return (
    <div>
        {feedbackList?.length==0
        ? <h2 className='font-bold text-cl text-gray-500'>No Interview Feedback Record Found</h2>

        :
        
        <>
        <h2 className='text-green-800 text-3xl font-bold' >Congratulations!</h2>
        <h2 className='text-2xl font-semibold' >Here is your Interview Feedback</h2>
        <h2 className='text-gray-700 mb-5'>Below is the list of questions along with your answers, their correct answers and feedback for improvement:-</h2>
        {feedbackList&&feedbackList.map((item, index) => (
            <Collapsible className='mt-3' key={index}>
                <CollapsibleTrigger className='p-2 bg-secondary rounded-lg my-2 text-left flex justify-between w-full text-sm font-semibold'>
                    {item.question} <ChevronsUpDown className='h-5 w-5'/>
                </CollapsibleTrigger>
                <CollapsibleContent>
                    <div className='flex flex-col gap-1'>
                        <h2 className='text-red-500 p-2 border rounded-lg'><strong>Rating: </strong>{item.reting}</h2>
                        <h2 className='p-2 border rounded-lg bg-red-50 text-sm text-red-800'><strong>Your Answer: </strong>{item.userAns}</h2>
                        <h2 className='p-2 border rounded-lg bg-green-50 text-sm text-green-800'><strong>Correct Answer: </strong>{item.correctAns}</h2>
                        <h2 className='p-2 border rounded-lg bg-blue-50 text-sm text-primary'><strong>Feedback: </strong>{item.feedback}</h2>
                    </div>
                </CollapsibleContent>
            </Collapsible>
        ))}
        </>
    }
        <Button onClick={() => router.replace('/dashboard')}>Go to Home</Button>
    </div>
  )
}

export default Feedback