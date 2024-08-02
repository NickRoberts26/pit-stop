import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const Post = ({content, userId}) => {
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
    <div className="border rounded-lg mb-6 p-4">
      <p className='font-bold'>{poster.firstName} {poster.lastName}</p>
      <p>{content}</p>
    </div>
  )
}

export default Post
