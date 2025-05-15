import React from 'react'
import AnimatedCar from '../car/AnimatedCar'
// import styles from './Dashboard.module.css';

const Dashboard = () => {
  return (
    <div className="h-[86.9vh] flex flex-col bg-gray-100 items-center justify-center">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">Welcome to My App</h1>
        <p className="text-gray-600 text-center">
          This is your dashboard. Explore the features and enjoy your experience!
        </p>
        <AnimatedCar />
      </div>
    </div>
  )
}

export default Dashboard