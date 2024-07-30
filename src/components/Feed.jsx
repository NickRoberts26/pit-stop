import axios from 'axios';
import { useState, useEffect } from 'react';

import DriverList from './DriverList'
import Post from './Post';

const Feed = () => {

    const [posts, setPosts] = useState([]);
    
    useEffect(() => {
        axios.get('/api/posts')
        .then(res => setPosts(res.data))
        .catch(err => console.log(err))
    }, [])

    return (
        <>
            <div className="flex">
                <div className='w-[70%] bg-white border-2 border-white rounded-xl p-4'>
                    {posts.map((post, _) => {
                        return <Post key={post.id} content={post.content} />
                    })}
                </div>
                <DriverList />
            </div>
        </>
    )
}

export default Feed
