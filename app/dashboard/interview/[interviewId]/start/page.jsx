'use client'
import { Button } from '@/components/ui/button';
import QuestionsSection from '@/components/ui/QuestionsSection';
import RecordAnswerSection from '@/components/ui/RecordAnswerSection';
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

export default function StartInterview({params}) {

  const [interviewData, setInterviewData] = useState();
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState();
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  useEffect(() => {
      GetInterviewDetails();
  }, [])

  const GetInterviewDetails = async () => {
      const result = await db.select().from(MockInterview)
      .where(eq(MockInterview.mockId, params.interviewId))

      const jsonMockResp = JSON.parse(result[0].jsonMockResp);
      setMockInterviewQuestion(jsonMockResp);
      setInterviewData(result[0]);
  }

  return (
    <div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
        <QuestionsSection mockInterviewQuestion={mockInterviewQuestion} activeQuestionIndex={activeQuestionIndex}/>
        <RecordAnswerSection mockInterviewQuestion={mockInterviewQuestion} activeQuestionIndex={activeQuestionIndex} interviewData={interviewData}/>
      </div>
      <div className='flex justify-end gap-5 mt-5'>
          {activeQuestionIndex>0 && <Button onClick={() => setActiveQuestionIndex(activeQuestionIndex-1)}>Previous Question
            </Button>}
          {activeQuestionIndex!=mockInterviewQuestion?.length-1 && <Button onClick={() => setActiveQuestionIndex(activeQuestionIndex+1)}>Next Question
          </Button>}
          {activeQuestionIndex==mockInterviewQuestion?.length-1 && 
          <Link href={'/dashboard/interview/'+interviewData?.mockId+'/feedback'}><Button>End Interview
            </Button></Link>}
        </div>
    </div>
  )
}
