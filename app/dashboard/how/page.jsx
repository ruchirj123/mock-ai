import React from 'react'

function page() {
  return (
    <div className='flex flex-col items-center justify-center'>
      <h1 className='text-primary text-3xl font-bold transition-all cursor-pointer py-2'>Overview</h1>
      <p className='text-xl mt-2 pl-1 text-center'>Our mock interview platform is designed to help users practice for interviews by simulating a real-time Q&A session. It offers various question categories, including technical and behavioral interviews, for a comprehensive and personalized experience.</p>

      <h1 className='text-primary text-3xl font-bold transition-all cursor-pointer py-2 mt-8'>Built with Next.js</h1>
      <p className='text-xl mt-2 pl-1 text-center'>The front-end of the application is powered by Next.js, ensuring a fast, dynamic, and seamless user experience. The framework optimizes performance, enhances SEO, and ensures responsiveness across devices.</p>

      <h1 className='text-primary text-3xl font-bold transition-all cursor-pointer py-2 mt-8'>Powered by Google Gemini</h1>
      <p className='text-xl mt-2 pl-1 text-center'>At the core of our platform is the Google Gemini API, driving AI-powered question generation. It generates interview-style questions based on the selected category, processes user responses in real-time, and adapts follow-up questions dynamically. This ensures a natural and interactive interview experience.</p>

      <h1 className='text-primary text-3xl font-bold transition-all cursor-pointer py-2 mt-8'>User Interaction Flow</h1>
      <ol >
        <li className='text-xl mt-2 pl-1 text-center'>Users begin by selecting a job position, job description and years of experience.</li>
        <li className='text-xl my-1 pl-1 text-center'> | </li>
        <li className='text-xl pl-1 text-center'>The AI presents relevant questions, and users can answer via recording their audio and turn on video to simulate a real-life interview setting.</li>
        <li className='text-xl my-1 pl-1 text-center'> | </li>
        <li className='text-xl pl-1 text-center'>The system then compares the user answer with the correct answer and therefore generates feedback for improvement</li>
      </ol>

      <h1 className='text-primary text-3xl font-bold transition-all cursor-pointer py-2 mt-8'>Feedback and Correct Answers</h1>
      <p className='text-xl mt-2 pl-1 text-center'>Once the session is complete, users can visit the feedback page to, review their recorded answers, see correct answers for the questions they were asked and receive feedback(rating) on their performance, highlighting areas for improvement and suggestions for further practice.</p>

    </div>
  )
}

export default page