import React from 'react'
import DriverList from './DriverList'

const Feed = () => {
    return (
        <>
            <div className="flex">
                <div className='w-[70%] bg-white border-2 border-white rounded-xl p-4'>
                    This is the feed
                </div>
                <DriverList />
            </div>
        </>
    )
}

export default Feed
