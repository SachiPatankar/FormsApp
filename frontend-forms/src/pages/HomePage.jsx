import React from 'react'
import { Link } from 'react-router-dom'


const HomePage = () => {
  return (
    <div className='min-h-screen flex justify-center items-center bg-gray-100'>

      <div className='flex flex-col justify-start items-center gap-8 p-8 lg:p-32 border-2 rounded-xl bg-white shadow-md '>
        <h1 className='text-4xl font-bold'>Click to choose form</h1>
        <div className='flex flex-row justify-between w-60'>
          <Link to={'/form/A'} className='px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600'>
            Form A
          </Link>
          <Link to={'/form/B'} className='px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600'>
            Form B
          </Link>
        </div>
      </div>
    </div>
  )
}

export default HomePage
