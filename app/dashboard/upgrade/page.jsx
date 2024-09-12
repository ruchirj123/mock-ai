'use client'
import { Button } from '@/components/ui/button';
import React from 'react'

const Page = () => {
  
  const handleClick = () => {
    window.location.href = "https://paytm.com";
  }

  return (
    <section className=" bg-secondary p-5 pb-8">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-8">Our Plans</h2>
        <div className="flex flex-col lg:flex-row justify-center items-center gap-8">
          {/* Basic Plan */}
          <div className="bg-white shadow-md rounded-lg p-2 text-center w-full max-w-sm">
            <h3 className="text-2xl font-semibold mb-4">Basic</h3>
            <p className="text-gray-500 mb-6">Perfect for starters</p>
            <div className="text-4xl font-bold mb-6">₹199 <span className="text-lg font-normal">/month</span></div>
            <ul className="mb-6 text-gray-600 space-y-2">
              <li>5 Interview Sessions</li>
              <li>Basic Feedback</li>
              <li>Access to Common Questions</li>
            </ul>
            <Button onClick={handleClick} className="mb-2 hover:bg-blue-600 transition">
              Choose Plan
            </Button>
          </div>

          {/* Pro Plan */}
          <div className="bg-white shadow-md rounded-lg p-2 text-center w-full max-w-sm">
            <h3 className="text-2xl font-semibold mb-4">Pro</h3>
            <p className="text-gray-500 mb-6">For regular users</p>
            <div className="text-4xl font-bold mb-6">₹499 <span className="text-lg font-normal">/month</span></div>
            <ul className="mb-6 text-gray-600 space-y-2">
              <li>20 Interview Sessions</li>
              <li>Advanced Feedback</li>
              <li>Access to All Questions</li>
            </ul>
            <Button onClick={handleClick} className="mb-2 hover:bg-blue-600 transition">
              Choose Plan
            </Button>
          </div>

          {/* Premium Plan */}
          <div className="bg-white shadow-md rounded-lg p-2 text-center w-full max-w-sm">
            <h3 className="text-2xl font-semibold mb-4">Premium</h3>
            <p className="text-gray-500 mb-6">For professionals</p>
            <div className="text-4xl font-bold mb-6">₹999 <span className="text-lg font-normal">/month</span></div>
            <ul className="mb-6 text-gray-600 space-y-2">
              <li>Unlimited Interview Sessions</li>
              <li>Premium Feedback</li>
              <li>Access to All Features</li>
            </ul>
            <Button onClick={handleClick} className="mb-2 hover:bg-blue-600 transition">
              Choose Plan
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page