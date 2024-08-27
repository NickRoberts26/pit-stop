import React, { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import Comment from './Comment';

const CommentFeed = ({ postId }) => {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const postRef = doc(db, 'Posts', postId);
                const postSnapshot = await getDoc(postRef);
    
                if (postSnapshot.exists()) {
                setPost(postSnapshot.data());
                } else {
                console.log("No such post!");
                }
            } catch (error) {
                console.error("Error fetching post:", error);
            } finally {
                setLoading(false);
            }
        };
    
        fetchPost();
    }, [postId]);

    if (loading) {
        return <p>Loading post...</p>;
    }
    
    if (!post) {
        return <p>Post not found!</p>;
    }
    
    return (
        <div>
            <ul>
                {post.comments && post.comments.length > 0 ? (
                post.comments.map((comment, index) => (
                    <Comment key={index} commentText={comment.commentText} userId={comment.userId} createdAt={comment.createdAt} />
                ))
                ) : (
                <p>No comments yet.</p>
                )}
            </ul>
        </div>
    );
}

export default CommentFeed
