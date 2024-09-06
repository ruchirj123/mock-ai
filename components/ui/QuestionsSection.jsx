import { Lightbulb, Volume2 } from 'lucide-react'
import React from 'react'

function QuestionsSection({mockInterviewQuestion, activeQuestionIndex}) {

    const textToSpeech = (text) =>{
        if('speechSynthesis' in window){
            const speech = new SpeechSynthesisUtterance(text);
            window.speechSynthesis.speak(speech);
        }
        else{
            alert("Sorry, your browser does not support text-to-speech.")
        }
    }


  return mockInterviewQuestion && (
    <div className='p-5 border rounded-lg'>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3'>
            {mockInterviewQuestion && mockInterviewQuestion.map((question, index)=>(
                <h2 className={`p-2 rounded-full text-xs md:text-s text-center font-bold cursor-pointer
                ${index==activeQuestionIndex ? 'bg-primary text-white' : 'bg-secondary'}`}>
                    QUESTION #{index+1}
                </h2>
            ))}
        </div>
        <div className='mt-3 text-md md:text-lg font-medium'>
            {mockInterviewQuestion[activeQuestionIndex]?.question}
        </div>

        <Volume2 className='cursor-pointer mt-2' onClick={() => textToSpeech(mockInterviewQuestion[activeQuestionIndex].question)}/>

        <div className='border rounded-lg mt-10 bg-blue-100'>
            <div className='p-3 flex items-center text-primary'>
                <Lightbulb/>
                <h2><strong>Note:</strong></h2>
            </div>
            <h2 className='text-sm text-primary font-medium px-3 pb-3'>
                Click on 'Record Answer' when you want to answer the question. At the end of interview, we will provide you feedback along with the correct answers for comparison.
            </h2>
        </div>
    </div>
  )
}

export default QuestionsSection