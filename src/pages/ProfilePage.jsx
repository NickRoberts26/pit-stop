import React from 'react'

const ProfilePage = () => {
  return (
    <div className='bg-white rounded-lg p-8'>
        <div className='flex'>
            <img className='rounded-full w-[200px]' src="src/assets/me.jpg" alt="" />
            <header>
                <h1>Nick Roberts</h1>
            </header>
        </div>
    </div>
  )
}

export default ProfilePage
