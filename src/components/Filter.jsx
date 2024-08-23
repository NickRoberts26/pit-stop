import React from 'react'

const Filter = ({handleFilter}) => {
    return (
        <div className='flex items-center bg-white rounded-lg px-2 py-4 mb-4'>
            <h2 className='font-bold text-xl'>Filter by: </h2>
            <ul className='flex'>
                <li onClick={handleFilter} className='generaldiscussion font-bold text-sm w-fit h-fit px-2 mx-2 rounded-xl'>General Discussion</li>
                <li onClick={handleFilter} className='racenews font-bold text-sm w-fit h-fit px-2 mx-2 rounded-xl'>Race News</li>
                <li onClick={handleFilter} className='rumour font-bold text-sm w-fit h-fit px-2 mx-2 rounded-xl'>Rumour</li>
                <li onClick={handleFilter} className='question font-bold text-sm w-fit h-fit px-2 mx-2 rounded-xl'>Question</li>
                <li onClick={handleFilter} className='meme font-bold text-sm w-fit h-fit px-2 mx-2 rounded-xl'>Meme</li>
                <li onClick={handleFilter} className='technical font-bold text-sm w-fit h-fit px-2 mx-2 rounded-xl'>Technical</li>
            </ul>
        </div>
    )
}

export default Filter
