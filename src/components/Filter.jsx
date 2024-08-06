import React from 'react'

const Filter = () => {
    return (
        <div className='flex items-center bg-white rounded-lg px-2 py-4 mb-4'>
            <h2 className='font-bold text-xl'>Filter by: </h2>
            <ul className='flex'>
                <li className='bg-orange-400 font-bold text-sm w-fit h-fit px-2 mx-2 rounded-xl'>General Discussion</li>
                <li className='bg-yellow-400 font-bold text-sm w-fit h-fit px-2 mx-2 rounded-xl'>Race News</li>
                <li className='bg-blue-200 font-bold text-sm w-fit h-fit px-2 mx-2 rounded-xl'>Rumour</li>
                <li className='bg-green-400 font-bold text-sm w-fit h-fit px-2 mx-2 rounded-xl'>Question</li>
                <li className='bg-purple-400 font-bold text-sm w-fit h-fit px-2 mx-2 rounded-xl'>Meme</li>
                <li className='bg-red-400 font-bold text-sm w-fit h-fit px-2 mx-2 rounded-xl'>Technical</li>
            </ul>
        </div>
    )
}

export default Filter
