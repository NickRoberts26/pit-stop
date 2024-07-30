import React from 'react'
import { useState } from 'react';

const CreatePost = () => {
    const [rotation, setRotation] = useState(0);

    const handleKeyPress = (event) => {
        if (event.key === 'Backspace') {
          setRotation(prevRotation => prevRotation - 10);
        } else {
          setRotation(prevRotation => prevRotation + 10);
        }
    };

    return (
        <div className='flex items-center bg-white rounded-lg p-2 mb-4'>
            <img className='w-[50px] h-[50px] mr-4' style={{ transform: `rotate(${rotation}deg)` }} src="src/assets/wheel.png" alt="" />
            <textarea
                name=""
                id=""
                placeholder='Create Post'
                className='w-full bg-slate-200 rounded-lg p-2'
                onKeyDown={handleKeyPress}
            ></textarea>
        </div>
    )
}

export default CreatePost
