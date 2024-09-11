'use client'
import { Button } from '@/components/ui/button';
import { db } from '@/utils/db';
import { Ratings } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import { eq } from 'drizzle-orm';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const Rating = () => {

  const router = useRouter()
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [feedback, setFeedback] = useState('');
  const {user} = useUser();

  const handleRating = (value) => {
    setRating(value);
  };

  const checkIfUserHasRated = async (email) => {
    const existingRating = await db.select().from(Ratings).where(eq(Ratings.userEmail, email));
    return existingRating.length > 0;
  };

  const handleSubmit = async() => {
    // check whether user has rated before
    const hasRated = await checkIfUserHasRated(user?.primaryEmailAddress?.emailAddress);
    if (hasRated) {
        alert('A user can only rate once!')
        router.replace('/dashboard')
    }
    else{
        // Handle the submission of the rating and feedback here
        const resp = await db.insert(Ratings)
        .values({
            userEmail: user?.primaryEmailAddress?.emailAddress,
            rating,
            feedback,
            createdAt: moment().format('DD-MM-yyyy')
        })
        if(resp){
            alert('Thank you for rating us!')
            router.replace('/dashboard')
        }
    }
        setRating(0);
        setFeedback('');
  };

  return (
    <div className="flex justify-center">
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md h-3/5 mt-10">
        <h2 className="text-2xl font-bold text-center mb-4">Rate Our App</h2>
        
        <div className="flex items-center justify-center space-x-2 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              className={`text-3xl ${
                star <= (hover || rating) ? 'text-yellow-500' : 'text-gray-300'
              }`}
              onClick={() => handleRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
            >
              ★
            </button>
          ))}
        </div>

        <textarea
          className="w-full p-2 border border-gray-300 rounded-lg mb-4"
          rows="4"
          placeholder="Leave your feedback here..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />
        <div className='flex justify-center'>
            <Button
            className="transition duration-300"
            onClick={handleSubmit}
            >
            Submit</Button>
        </div>
      </div>
    </div>
  );
};

export default Rating;
