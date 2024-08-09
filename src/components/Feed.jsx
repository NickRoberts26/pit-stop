import axios from 'axios';
import { useState, useEffect } from 'react';

import DriverList from './DriverList'
import Post from './Post';
import { collection, getDocs, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase';

const Feed = () => {

    const [posts, setPosts] = useState([]);
    const postsCollectionRef = collection(db, "Posts");

    
    useEffect(() => {
        const postsQuery = query(postsCollectionRef, orderBy('timestamp', 'desc'));

        const unsubscribe = onSnapshot(postsQuery, (snapshot) => {
            setPosts(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})));
        });
    
        return () => unsubscribe();
    }, [])
    
    return (
        <>
            <div className="flex">
                <div className='w-[70%] bg-white border-2 border-white rounded-xl p-4'>
                    {posts.map((post, _) => {
                        return <Post key={post.id} content={post.content} tag={post.tag} createdAt={post.createdAt} userId={post.userId} />
                    })}
                </div>
                <DriverList />
            </div>
        </>
    )
}

export default Feed
