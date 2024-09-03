import React from 'react'
import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const Comment = ({ commentText, userId, createdAt }) => {
    const [poster, setPoster] = useState(null);

    const usersCollectionRef = collection(db, "Users");

    const getUsers = async () => {
        const data = await getDocs(usersCollectionRef);
        return data.docs.map((doc) => ({...doc.data(), id: doc.id}));
    }

    useEffect(() => {
        const fetchData = async () => {
            const usersData = await getUsers();
            const user = usersData.find((user) => user.id === userId);
            if (user) {
                setPoster(user);
            }
        };
    
        fetchData();
    }, [userId]);

    return (
        <div className='border rounded-lg p-4 mb-4'>
            <div className='flex items-center justify-between mb-2'>
                <div className='flex items-center'>
                    <img className='rounded-full w-[30px]' src={poster ? `../${poster.driver.replace(/\s+/g, '').toLowerCase()}.png` : '../default-avatar.jpg'} alt="" />
                    <div className='ml-2'>{poster ? `${poster.firstName} ${poster.lastName}` : 'Loading...'}</div>
                </div>
                <p className='text-gray-400 text-xs w-fit ml-auto'>{createdAt}</p>
            </div>
            <p className='text-sm'>{commentText}</p>
        </div>
    )
}

export default Comment
