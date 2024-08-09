import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const usersCollectionRef = collection(db, "Users");

const getUsers = async () => {
  const data = await getDocs(usersCollectionRef);
  return data.docs.map((doc) => ({...doc.data(), id: doc.id}));
}

const Post = ({content, userId, tag, createdAt}) => {
  const [users, setUsers] = useState([]);
  const [poster, setPoster] = useState(null);

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
    <>
      <div className="border rounded-lg mb-6 p-4">
        <div className='flex justify-between items-center mb-2'>
          <div className='flex items-center'>
            <img className='w-10 rounded-full' src="src/assets/me.jpg" alt="" />
            <p className='font-bold text-lg ml-3'> {poster ? `${poster.firstName} ${poster.lastName}` : 'Loading...'}</p>
          </div>
          <p className={`${tag ? tag.replace(/\s+/g, '').toLowerCase() : tag} font-bold text-sm w-fit h-fit px-2 rounded-xl`}>{tag}</p>
        </div>
        <div className='content mb-2'>
          <p>{content}</p>
        </div>
        <p className='text-gray-400 text-sm w-fit ml-auto'>{createdAt}</p>
      </div>
    </>
  )
}

export default Post
