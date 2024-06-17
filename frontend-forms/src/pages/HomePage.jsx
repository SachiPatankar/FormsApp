import React from 'react'
import { Link } from 'react-router-dom'


const HomePage = () => {
  return (
    <div className='min-h-screen flex justify-center items-center bg-neutral-100'>

      <div className='flex flex-col justify-start items-center gap-8 p-8 lg:p-32 rounded-xl bg-white '>
        <h1 className='text-4xl font-bold'>Click to choose</h1>
        <div className='flex flex-row justify-between w-60'>
          <Link to={'/form/A'} className='px-4 py-2 bg-purple-500 text-white rounded-xl font-semibold hover:bg-purple-600'>
            Form A
          </Link>
          <Link to={'/form/B'} className='px-4 py-2 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600'>
            Form B
          </Link>
        </div>
      </div>
    </div>
  )
}

export default HomePage
