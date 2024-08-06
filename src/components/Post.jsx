import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const Post = ({content, userId, tag, time}) => {
  const [users, setUsers] = useState([]);
  const [poster, setPoster] = useState([]);
  const usersCollectionRef = collection(db, "Users");

  const getUsers = async () => {
    const data = await getDocs(usersCollectionRef);
    console.log(data);
    setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
    users.map((user) => {
      if(user.id === userId) {
        setPoster(user);
      }
    })
  }

  useEffect(() => {
    getUsers();
  }, [getUsers])

  return (
    <>
      {content ? (
        <div className="border rounded-lg mb-6 p-4">
          <div className='flex justify-between'>
            <p className='font-bold'>{poster.firstName} {poster.lastName}</p>
            <p>{tag}</p>
            <p>{time}</p>
          </div>
          <p>{content}</p>
        </div>
      ) : (
        <>
          <div className="border rounded-lg mb-6 p-4">
            <div className='flex justify-between items-center mb-2'>
              <div className='flex items-center'>
                <img className='w-10 rounded-full' src="src/assets/me.jpg" alt="" />
                <p className='font-bold text-lg ml-3'>Nick Roberts</p>
              </div>
              <p className='bg-orange-400 font-bold text-sm w-fit h-fit px-2 rounded-xl'>General Discussion</p>
            </div>
            <div className='content'>
              <p>Ricciardo made his return to the squad midway through the 2023 season, having previously raced for the then-called Toro Rosso outfit during the early days of his Formula 1 career back in 2012 and 2013.</p>
            </div>
            <p className='text-gray-400 text-sm w-fit ml-auto'>4:20PM - August 6, 2024</p>
          </div>
          <div className="border rounded-lg mb-6 p-4">
            <div className='flex justify-between items-center mb-2'>
              <div className='flex items-center'>
                <img className='w-10 rounded-full' src="src/assets/me.jpg" alt="" />
                <p className='font-bold text-lg ml-3'>Nick Roberts</p>
              </div>
              <p className='bg-yellow-400 font-bold text-sm w-fit h-fit px-2 rounded-xl'>Race News</p>
            </div>
            <div className='content'>
              <p>Ricciardo made his return to the squad midway through the 2023 season, having previously raced for the then-called Toro Rosso outfit during the early days of his Formula 1 career back in 2012 and 2013.</p>
            </div>
            <p className='text-gray-400 text-sm w-fit ml-auto'>4:20PM - August 6, 2024</p>
          </div>
        </>
      )}
    </>
  )
}

export default Post
