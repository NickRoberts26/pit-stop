import { useState, useEffect } from 'react';
import { collection, getDocs, getDoc, doc, deleteDoc, updateDoc, arrayUnion, arrayRemove, Timestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../auth/AuthContext';
import CreateComment from './CreateComment';
import CommentFeed from './CommentFeed';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const usersCollectionRef = collection(db, "Users");

const getUsers = async () => {
  const data = await getDocs(usersCollectionRef);
  return data.docs.map((doc) => ({...doc.data(), id: doc.id}));
}

const Post = ({postId, content, userId, tag, createdAt, likes, comments, profileId}) => {
  const [poster, setPoster] = useState(null);
  const [likeCount, setLikeCount] = useState(likes);
  const [hasLiked, setHasLiked] = useState(false);
  const [commentReveal, setCommentReveal] = useState(false);

  const [editingPost, setEditingPost] = useState(false);
  const [postContent, setPostContent] = useState(content);
  const [updatedAt, setUpdatedAt] = useState(createdAt);

  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      const usersData = await getUsers();
      const user = usersData.find((user) => user.id === userId);
      if (user) {
        setPoster(user);
      }

      const postDocRef = doc(db, 'Posts', postId);
      const postDoc = await getDoc(postDocRef);
      if (postDoc.exists()) {
        const postData = postDoc.data();
        setLikeCount(postData.likeCount || 0);
        setHasLiked(postData.likedBy?.includes(currentUser.uid));
      }
    };

    fetchData();
  }, [userId, postId, currentUser]);

  const handleLike = async () => {
    const postDocRef = doc(db, 'Posts', postId);
    if (hasLiked) {
      const newLikeCount = likeCount - 1;

      await updateDoc(postDocRef, { 
        likeCount: newLikeCount, 
        likedBy: arrayRemove(currentUser.uid) 
      });

      setLikeCount(newLikeCount);
      setHasLiked(false);
    } else {
      const newLikeCount = likeCount + 1;

      await updateDoc(postDocRef, { 
        likeCount: newLikeCount, 
        likedBy: arrayUnion(currentUser.uid) 
      });

      setLikeCount(newLikeCount);
      setHasLiked(true);
    }
  };

  const handleDelete = async (postId) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this post?");
    
    if (isConfirmed) {
      const postDocRef = doc(db, "Posts", postId);
      try {
        await deleteDoc(postDocRef);
        window.location.reload(false);
      } catch (error) {
        console.error("Error deleting post: ", error);
      }
    } else {
      console.log("Post deletion canceled.");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
  
    const postRef = doc(db, "Posts", postId);

    const formattedDate = new Date().toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });

    setUpdatedAt(formattedDate);
    
    try {
      await updateDoc(postRef, {
        content: postContent,
        createdAt: formattedDate,
      });
      toast.success('Post Updated!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.error("Error updating post: ", error);
    } finally {
      setEditingPost(false);
    }
  };

  return (
    <>
      <div className="border rounded-lg mb-6 p-4">
        <div className='flex justify-between items-center mb-2'>
          <div className='flex justify-between items-center mb-2'>
            <Link to={`/profile/${userId}`} className='flex items-center hover:underline'>
              <img className='w-10 rounded-full' src={poster ? `../${poster.driver.replace(/\s+/g, '').toLowerCase()}.png` : '../default-avatar.jpg'} alt="" />
              <p className='font-bold text-lg ml-3'> {poster ? `${poster.firstName} ${poster.lastName}` : 'Loading...'}</p>
              <p></p>
            </Link>
            {profileId == currentUser.uid ? (
              <>
                <button className='text-white bg-red-600 border-2 border-red-600 hover:border-black text-xs py-0.5 px-1 rounded-md ml-4' onClick={() => handleDelete(postId)}>Delete Post</button>
                <button className='text-black bg-slate-200 border-2 border-slate-200 hover:border-black text-xs py-0.5 px-1 rounded-md ml-4' onClick={() => setEditingPost(true)}>Edit Post</button>
              </>
            ) : (<></>)}
          </div>
          <p className={`${tag ? tag.replace(/\s+/g, '').toLowerCase() : tag} font-bold text-sm w-fit h-fit px-2 rounded-xl`}>{tag}</p>
        </div>
        <div className='content mb-2'>
          {editingPost ? (
            <form onSubmit={handleUpdate}>
                <textarea
                  className='w-full bg-slate-200 rounded-lg p-2'
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                />
                <button type="submit" className='text-black bg-slate-200 border-2 border-slate-200 hover:border-black text-xs py-0.5 px-1 rounded-md'>Update Post</button>
            </form>
          ) : (
            <p>{postContent}</p>
          )}
        </div>
        <div className='flex'>
          <div className='flex'>
            <button onClick={handleLike} className={`${hasLiked ? 'bg-green-600 hover:bg-red-600' : 'bg-red-600 hover:bg-green-600'} text-white mr-2 border px-2 py-0.5 text-xs rounded-lg`}>Like</button>
            <div className='flex items-center text-xs'>{likeCount}</div>
          </div>
          <p className='text-gray-400 text-sm w-fit ml-auto'>{updatedAt}</p>
        </div>
        <div className='mt-2'>
          <button className='text-xs hover:underline' onClick={() => {commentReveal ? setCommentReveal(false) : setCommentReveal(true)}}>{commentReveal ? "Hide" : "View"} Comments</button>
          {commentReveal ? (
            <div>
              <CommentFeed postId={postId} getUsers={getUsers}/>
              {comments ? (
                <CreateComment postId={postId}/>
              ) : (
                <></>
              )}
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
      <ToastContainer />
    </>
  )
}

export default Post
