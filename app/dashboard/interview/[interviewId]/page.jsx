'use client'
import { Button } from '@/components/ui/button'
import { db } from '@/utils/db'
import { MockInterview } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { Lightbulb, WebcamIcon } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'

function Interview({params}) {

    const [interviewData, setInterviewData] = useState();
    const [webCamEnabled, setWebCamEnabled] = useState(false);

    useEffect(()=>{
        console.log(params.interviewId)
        GetInterviewDetails();
    }, [])

    const GetInterviewDetails = async () => {
        const result = await db.select().from(MockInterview)
        .where(eq(MockInterview.mockId, params.interviewId))
        console.log(result[0]);
        setInterviewData(result[0]);
    }

  return (
    <div className='w-full'>
        <h2 className='font-bold text-2xl mx-1'>Let's Get Started</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10 '>

            <div className='flex flex-col my-5 gap-5'>
                <div className='flex flex-col p-5 rounded-lg border gap-1'>
                    <h2 className='text-lg'><strong>Job Position/Role:</strong>{interviewData?.jobPosition}</h2>
                    <h2 className='text-lg'><strong>Job Description/Tech Stack:</strong>{interviewData?.jobDesc}</h2>
                    <h2 className='text-lg'><strong>Years of Experience:</strong>{interviewData?.jobExperience}</h2>
                </div>
                <div className='rounded-lg border p-5 border-yellow-300 bg-yellow-100'>
                    <h2 className='flex gap-2 items-center text-yellow-500'><Lightbulb/><strong>Information:</strong></h2>
                    <div className='text-yellow-500 mx-2 my-1'>
                        Enable Web-cam and Microphone to start your AI generated Mock Interview. It has 5 questions which you can answer and at the end of the test you will get the report based on your answers.
                    </div> 
                    <div className='mx-2 my-1 text-red-600 font-semibold'>
                        NOTE:- We never record your video, you can disable the Web-cam access anytime you wish.
                    </div>
                </div>
            </div>

            <div className='my-5'>
            { webCamEnabled? <Webcam
                onUserMedia={() => setWebCamEnabled(true)}
                onUserMediaError={() => setWebCamEnabled(false)}
                mirrored={true}
                style={{
                    height:400,
                    width:400
                }}
            />
            : <>
                <WebcamIcon className='bg-secondary h-72 w-full rounded-lg border p-20'></WebcamIcon>
                <Button variant="ghost" className='my-3 w-full text-md' onClick={() => setWebCamEnabled(true)}>Enable Web-Cam and Microphone</Button>
                <div className='flex justify-end'>
                 <Link href={'/dashboard/interview/'+params.interviewId+ '/start'}>
                    <Button className='my-3 text-md'>Start Interview</Button>
                 </Link>
                </div>
              </>
            }
            </div>
        </div>
    </div>
  )
}

export default Interview