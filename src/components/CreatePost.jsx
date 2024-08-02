import React from 'react'
import { useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';

const CreatePost = () => {
    const [rotation, setRotation] = useState(0);
    const [newContent, setNewContent] = useState('');
    const [newTag, setNewTag] = useState();

    const { currentUser } = useAuth();
    const postsCollectionRef = collection(db, "Posts");

    const handleKeyPress = (event) => {
        if (event.key === 'Backspace') {
          setRotation(prevRotation => prevRotation - 10);
        } else {
          setRotation(prevRotation => prevRotation + 10);
        }
    };

    const createPost = async () => {
        await addDoc(postsCollectionRef, {userId: currentUser.uid, content: newContent});
    }

    return (
        <div className='flex flex-col items-end bg-white rounded-lg p-2 mb-4'>
            <div className='w-full flex'>
                <img className='w-[50px] h-[50px] mr-4' style={{ transform: `rotate(${rotation}deg)` }} src="src/assets/wheel.png" alt="" />
                <div className='w-full'>
                    {currentUser ? (
                        <textarea
                            name=""
                            id=""
                            placeholder='Create Post'
                            className='w-full bg-slate-200 rounded-lg p-2'
                            onKeyDown={handleKeyPress}
                            onChange={(e) => {setNewContent(e.target.value)}}
                        ></textarea>
                    ) : (
                        <textarea
                            name=""
                            id=""
                            disabled
                            placeholder='Login to create post'
                            className='w-full bg-slate-200 rounded-lg p-2'
                            onKeyDown={handleKeyPress}
                            onChange={(e) => {setNewContent(e.target.value)}}
                        ></textarea>
                    )}
                    <div className='flex w-full justify-between items-center'>
                        <div>
                            <h3 className='mb-2'>Tag</h3>
                            <select onChange={(e) => {setNewTag(e.target.value)}} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-red-500 block w-full p-2.5' name="" id="">
                                <option value="generalDiscussion">General Discussion</option>
                                <option value="raceNews">Race News</option>
                                <option value="remour">Rumour</option>
                                <option value="">Question</option>
                                <option value="">Meme</option>
                            </select>
                        </div>
                        <button onClick={createPost} className='h-fit bg-slate-200 w-fit px-4 py-2 rounded-lg'>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreatePost
