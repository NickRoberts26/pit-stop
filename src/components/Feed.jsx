import axios from 'axios';
import { useState, useEffect } from 'react';

import DriverList from './DriverList'
import Filter from '../components/Filter'
import Post from './Post';
import { collection, getDocs, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase';

const Feed = () => {

    const [posts, setPosts] = useState([]);
    const [activeFilters, setActiveFilters] = useState([]);
    const [isFiltering, setIsFiltering] = useState(false);
    const [filteredPosts, setFilteredPosts] = useState([])
    const postsCollectionRef = collection(db, "Posts");

    const handleFilter = (e) => {
        const tag = e.target.textContent;
        if(activeFilters.indexOf(tag) > -1) {
            setActiveFilters(activeFilters => activeFilters.filter(item => item !== tag));
        } else {
            setActiveFilters(activeFilters => [...activeFilters, tag]);
        }
    }

    useEffect(() => {
        setIsFiltering(activeFilters.length > 0);

        //To be fixed
        posts.forEach((post) => {
            if(activeFilters.includes(post.tag) && filteredPosts.indexOf(post) == -1) {
                setFilteredPosts(filteredPosts => [...filteredPosts, post]);
            } else {
                setFilteredPosts(filteredPosts => filteredPosts.filter(item => item !== post));
            }
        })
        //

        /*
        posts.map((post, i) => {
            if(activeFilters.indexOf(post.tag) > -1) {
                setFilteredPosts(filteredPosts => [...filteredPosts, post]);
            } else {
                setFilteredPosts(filteredPosts => filteredPosts.filter(item => item !== post));
            }
        })
            */
        
    }, [activeFilters]);
    
    useEffect(() => {
        const postsQuery = query(postsCollectionRef, orderBy('timestamp', 'desc'));

        const unsubscribe = onSnapshot(postsQuery, (snapshot) => {
            setPosts(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})));
        });
    
        return () => unsubscribe();
    }, [])

    console.log(activeFilters);
    console.log(filteredPosts);
    
    return (
        <>
            <Filter handleFilter={handleFilter} />
            <div className="flex">
                <div className='w-[70%] bg-white border-2 border-white rounded-xl p-4'>
                    {isFiltering ?
                        filteredPosts.map((post, _) => {
                            return <Post key={post.id} postId={post.id} content={post.content} tag={post.tag} likes={post.likeCount} createdAt={post.createdAt} userId={post.userId} />
                        })
                    :
                        posts.map((post, _) => {
                            return <Post key={post.id} postId={post.id} content={post.content} tag={post.tag} likes={post.likeCount} createdAt={post.createdAt} userId={post.userId} />
                        })
                    }
                </div>
                <DriverList />
            </div>
        </>
    )
}

export default Feed
