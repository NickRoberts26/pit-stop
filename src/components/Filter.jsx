import React from 'react'

const Filter = ({handleFilter}) => {

    const style = 'font-bold text-sm w-fit h-fit px-2 mx-2 rounded-xl cursor-pointer border-2 border-white hover:border-2 hover:border-black';

    return (
        <div className='flex items-center bg-white rounded-lg px-2 py-4 mb-4'>
            <h2 className='font-bold text-xl'>Filter by: </h2>
            <ul className='flex'>
                <li onClick={handleFilter} className={`generaldiscussion ${style}`}>General Discussion</li>
                <li onClick={handleFilter} className={`racenews ${style}`}>Race News</li>
                <li onClick={handleFilter} className={`rumour ${style}`}>Rumour</li>
                <li onClick={handleFilter} className={`question ${style}`}>Question</li>
                <li onClick={handleFilter} className={`meme ${style}`}>Meme</li>
                <li onClick={handleFilter} className={`technical ${style}`}>Technical</li>
            </ul>
        </div>
    )
}

export default Filter
