import axios from 'axios';
import { useState, useEffect } from 'react';

import DriverList from './DriverList'
import Post from './Post';
import { collection, getDocs, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

const Feed = () => {

    const [posts, setPosts] = useState([]);
    const postsCollectionRef = collection(db, "Posts");

    
    useEffect(() => {
        /*
        const getPosts = async () => {
            const data = await getDocs(postsCollectionRef)
            setPosts(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
        }

        getPosts();
        */

        //Try this version for reduced reads
        const unsubscribe = onSnapshot(postsCollectionRef, (snapshot) => {
            setPosts(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})));
        });
    
        return () => unsubscribe();
    }, [])
    
    return (
        <>
            <div className="flex">
                <div className='w-[70%] bg-white border-2 border-white rounded-xl p-4'>
                    <Post />
                    {posts.map((post, _) => {
                        return <Post key={post.id} content={post.content} tag={post.tag} time={post.time} userId={post.userId} />
                    })}
                </div>
                <DriverList />
            </div>
        </>
    )
}

export default Feed
