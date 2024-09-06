"use client"
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from './button';  
import { Input } from './input';
import { Textarea } from './textarea';
import { chatSession } from '@/utils/GeminiAImodel';
import { LoaderCircle } from 'lucide-react';
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import { useRouter } from 'next/navigation';

export default function AddNewInterview() {

  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState();
  const [jobDesc, setJobDesc] = useState();
  const [jobExperience, setJobExperience] = useState();
  const [loading, setLoading] = useState(false);
  const [jsonResponse, setJsonResponse] = useState([]);
  const {user} = useUser();
  const router = useRouter();

  const onSubmit = async(e) => {
    setLoading(true);
    e.preventDefault();
    const inputPrompt = "Job Position: "+jobPosition+", Job Description: "+jobDesc+", Years of Experience: "+jobExperience+". Based on this information give, me "+process.env.NEXT_PUBLIC_QUESTION_COUNT+" Interview Questions with answers in JSON format. Give me questions and answers as field in JSON.(Questions and answers must be an array not object";
    const result = await chatSession.sendMessage(inputPrompt);
    const mockJsonResp = (result.response.text()).replace('```json','').replace('```','');
    console.log(JSON.parse(mockJsonResp));
    setJsonResponse(mockJsonResp);

    if(mockJsonResp){
        const resp = await db.insert(MockInterview)
        .values({
            mockId: uuidv4(),
            jobPosition: jobPosition,
            jobDesc: jobDesc,
            jobExperience: jobExperience,
            jsonMockResp: mockJsonResp,
            createdBy: user?.primaryEmailAddress?.emailAddress,
            createdAt: moment().format('DD-MM-YYYY')
        }).returning({mockId: MockInterview.mockId});
    
        console.log("Inserted id:",resp);

        if(resp){
            setOpenDialog(false);
            router.push('/dashboard/interview/'+ resp[0]?.mockId);
        }
    } 
    else{
        console.log("ERROR");
    }
    setLoading(false);
  }
  
  return (
    <div>
        <div className="text-lg text-center p-10 bg-secondary font-semibold border rounded-lg hover:font-bold hover:shadow-md cursor-pointer transition-all"
        onClick={() => setOpenDialog(true)} >
            + Add new
        </div>
        <Dialog open={openDialog}>
            <DialogContent className='max-w-2xl'>
                <DialogHeader>
                <DialogTitle className='text-2xl'>
                    Tell us something about your Interview
                </DialogTitle>
                <DialogDescription className='text-md'>
                    Add details about your Job Position/Role, your Job Description and years of experience
                </DialogDescription>
                <form onSubmit={onSubmit}>
                    <div className='pt-5'>
                        <label>Job Position/Role</label>
                        <Input placeholder='Ex. Full Stack Developer' required
                        onChange={(e) => setJobPosition(e.target.value)}
                        ></Input>
                    </div>
                    <div className='my-3'>
                        <label>Job Description / Tech Stack (in short)</label>
                        <Textarea placeholder='Ex. ReactJs, Express, Angular, MongoDB, etc.' required onChange={(e) => setJobDesc(e.target.value)}
                        ></Textarea>
                    </div>
                    <div className='my-3'>
                        <label>Years of Experience</label>
                        <Input type='number' placeholder='Ex. 5' required max='50'
                        onChange={(e) => setJobExperience(e.target.value)}
                        ></Input>
                    </div>
                    <div className='flex gap-7 justify-end'>
                        <Button type="button" onClick={() => setOpenDialog(false)} 
                        variant="ghost">Cancel</Button>
                        <Button type='submit' disabled={loading}>
                            {
                                loading? 
                                <>
                                    <LoaderCircle className='animate-spin'/>
                                    Generating from AI
                                </>
                                :"Start Interview"
                            }
                        </Button>
                    </div>
                </form>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    </div>
  )
}
