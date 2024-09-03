import { useState, useEffect } from "react";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { db } from '../firebase';
import Post from "./Post";

const PersonalFeed = ({profileId}) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
            const q = query(
                collection(db, "Posts"),
                where("userId", "==", profileId) // filter by field
            );

            const querySnapshot = await getDocs(q);
            const fetchedPosts = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            const sortedFetchedPosts = fetchedPosts.sort((a, b) => b.timestamp - a.timestamp);
            
            setPosts(sortedFetchedPosts);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };

        fetchPosts();
    }, [profileId]);

    console.log(posts);

    return (
        <>
            <header className="mt-6">
                <h2 className="text-3xl">Users Posts</h2>
            </header>
            <div className="bg-white border-2 border-white rounded-xl p-4 mt-6">
                {posts.length > 0 ? (
                    posts.map((post, _) => {
                        return <Post key={post.id} postId={post.id} content={post.content} tag={post.tag} likes={post.likeCount} createdAt={post.createdAt} userId={post.userId} comments={false}/>
                    })
                ) : (
                    <h2>No Posts!</h2>
                )}
            </div>
        </>
    )
}

export default PersonalFeed
