import axios from 'axios';
import { useState, useEffect } from 'react';

import DriverList from './DriverList'
import Post from './Post';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const Feed = () => {

    const [posts, setPosts] = useState([]);
    const postsCollectionRef = collection(db, "Posts");

    /*
    useEffect(() => {
        const getPosts = async () => {
            const data = await getDocs(postsCollectionRef)
            setPosts(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
        }

        getPosts();
    }, [])
    */

    return (
        <>
            <div className="flex">
                <div className='w-[70%] bg-white border-2 border-white rounded-xl p-4'>
                    {posts.map((post, _) => {
                        return <Post key={post.id} content={post.content} userId={post.userId} />
                    })}
                </div>
                <DriverList />
            </div>
        </>
    )
}

export default Feed
