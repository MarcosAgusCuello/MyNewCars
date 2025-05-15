'use client'
import React from 'react';

const about = () => {
  return (
    <div className="h-[86.9vh] bg-gray-100 flex flex-col items-center justify-center">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">About This WebApp</h1>
        <p className="text-gray-600 text-center">
          This WebApp is an interactive visualizer designed to explore and interact with data from a structured database. 
          It allows users to navigate through brands, models, and variants of vehicles, providing a seamless and intuitive experience.
        </p>
      </div>
    </div>
  )
}

export default about