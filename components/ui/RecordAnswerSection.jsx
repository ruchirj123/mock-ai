'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'
import { Button } from './button'
import useSpeechToText from 'react-hook-speech-to-text';
import { Mic, StopCircle } from 'lucide-react'
import { toast } from 'sonner'
import { chatSession } from '@/utils/GeminiAImodel'
import { db } from '@/utils/db'
import { UserAnswer } from '@/utils/schema'
import moment from 'moment'
import { useUser } from '@clerk/nextjs'

function RecordAnswerSection({mockInterviewQuestion, activeQuestionIndex, interviewData}) {

    const [userAnswer, setUserAnswer] = useState('');
    const {user} = useUser();
    const [loading, setLoading] = useState(false);

    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
        setResults
      } = useSpeechToText({
        continuous: true,
        useLegacyResults: false
      });

    useEffect(() => {
        results.map((result) => {
            setUserAnswer((prevAns) => prevAns+result?.transcript);
        })
    }, [results])

    useEffect(() => {
        if(!isRecording && userAnswer.length > 10){
            UpdateUserAnswer();
        }
    }, [userAnswer])

    const StartStopRecording = async() =>{
        if(isRecording){
            stopSpeechToText();
        }
        else{
            startSpeechToText();
        }
    }

    const UpdateUserAnswer = async() => {
        setLoading(true);
        const feedbackPrompt = "Question: "+ mockInterviewQuestion[activeQuestionIndex]?.question +", User-Answer: "+userAnswer+".Based on user answer for given interview question, give us rating(out of 10) and feedback as area of improvement(if any)."+"Give answer in 3 to 5 lines in JSON format with rating field and feedback field";

        const result = await chatSession.sendMessage(feedbackPrompt);
        const mockJsonResp = (result.response.text()).replace('```json','').replace('```','');
        const JsonFeedbackResp = JSON.parse(mockJsonResp);
        const resp = await db.insert(UserAnswer)
        .values({
            mockIdRef: interviewData?.mockId,
            question: mockInterviewQuestion[activeQuestionIndex]?.question,
            correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
            userAns: userAnswer,
            feedback: JsonFeedbackResp?.feedback,
            createdAt: moment().format('DD-MM-yyyy'),
            reting: JsonFeedbackResp?.rating,
            userEmail: user?.primaryEmailAddress?.emailAddress
        })

        if(resp){
            toast('User Answer Recorded Successfully');
            setUserAnswer('');
            setResults([])
        }
        setResults([])
        setLoading(false);
    }

  return (
    <div className='flex flex-col justify-center items-center'>
        <div className='flex flex-col justify-center bg-black mt-8 mb-5 border rounded-lg items-center'>
            <Image src={'/webcam.png'} width={200} height={200} className='absolute'></Image>
            <Webcam mirrored={true} style={{height: 300, width: '100%', zIndex: 10}}/>
        </div>
        <Button disabled={loading} variant="outline" onClick={StartStopRecording}>
            {isRecording ? 
            <h2 className='flex gap-1 text-red-600 items-center hover:font-bold transition-all'>
                <StopCircle/>Stop Recording</h2>
            : <div className='flex gap-1 items-center text-primary hover:font-bold transition-all'>
                <Mic/>Record Answer
            </div>
            }
        </Button>
    </div>
  )
}

export default RecordAnswerSection