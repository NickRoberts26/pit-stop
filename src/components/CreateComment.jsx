import React, { useState } from 'react';
import { doc, updateDoc, arrayUnion, Timestamp } from "firebase/firestore";
import { db } from '../firebase';
import { useAuth } from '../auth/AuthContext';

const CreateComment = ({ postId }) => {
    const [commentText, setCommentText] = useState('');

    const { currentUser } = useAuth();

    const addCommentToPost = async (postId, commentText) => {
        const postRef = doc(db, 'Posts', postId);

        const formattedDate = new Date().toLocaleString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });

        await updateDoc(postRef, {
            comments: arrayUnion({
                commentText: commentText,
                userId: currentUser.uid,
                timestamp: Timestamp.now(),
                createdAt: formattedDate,
            })
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (commentText.trim()) {
            await addCommentToPost(postId, commentText);
            setCommentText('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {currentUser ? (
                <textarea 
                type="text" 
                value={commentText} 
                onChange={(e) => setCommentText(e.target.value)} 
                placeholder="Add a comment..." 
                className='w-full bg-slate-200 rounded-lg p-2'
            ></textarea>
            ) : (
                <textarea 
                type="text" 
                value={commentText} 
                disabled
                onChange={(e) => setCommentText(e.target.value)} 
                placeholder="Login to comment" 
                className='w-full bg-slate-200 rounded-lg p-2'
                ></textarea>
            )}
        <button type="submit" className='h-fit bg-slate-200 w-fit px-4 py-2 rounded-lg hover:bg-slate-300'>Post</button>
        </form>
    );
};

export default CreateComment
