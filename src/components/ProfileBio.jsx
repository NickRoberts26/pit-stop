import React, { useEffect, useState } from 'react'
import { db } from "../firebase";
import { useAuth } from '../auth/AuthContext';
import { doc, updateDoc, getFirestore, collection, query, where, getDocs  } from "firebase/firestore";
import Post from './Post';

const ProfileBio = ( {profileId, userDetails, setUserDetails } ) => {
    const [team, setTeam] = useState('');
    const [editing, setEditing] = useState(false);
    const [userPosts, setUserPosts] = useState(null);

    const { currentUser } = useAuth();

    const addTeam = async () => {
        const profileRef = doc(db, 'Users', profileId);

        await updateDoc(profileRef, {
            team: team
        });

        setUserDetails((prevDetails) => ({
            ...prevDetails,
            team: team,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addTeam();
        setEditing(false);
    };

    async function getPostsByUserId(userId) {
        const postsRef = collection(db, "Posts"); // Reference to the 'posts' collection
        const q = query(postsRef, where("userId", "==", userId)); // Create a query where 'userId' matches
      
        const querySnapshot = await getDocs(q); // Execute the query
        const posts = [];
        
        querySnapshot.forEach((doc) => {
            posts.push({ id: doc.id, ...doc.data() }); // Store each post with its data
        });
        setUserPosts(posts);
    };

    useEffect(() => {
        getPostsByUserId(profileId);
    }, [])

    console.log(userPosts)

    return (
        <div>
            <div className='flex relative'>
                <img className='rounded-full w-[200px]' src="https://placehold.co/400" alt="" />
                <div className='ml-6'>
                    <header className='mb-4'>
                        <h1 className='text-4xl'>{userDetails.firstName} {userDetails.lastName}</h1>
                    </header>
                    {editing ? (
                        <>
                            <div className='flex items-center'>
                                <p className='mr-4'>Favourite Team: </p>
                                <select value={team} onChange={() => {setTeam(e.target.value)}} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-fit p-2'>
                                    <option value="Red Bull Racing">Red Bull Racing</option>
                                    <option value="McLaren">McLaren</option>
                                    <option value="Ferrari">Ferrari</option>
                                    <option value="RB">RB</option>
                                    <option value="Kick Sauber">Kick Sauber</option>
                                    <option value="Aston Martin">Aston Martin</option>
                                    <option value="Williams">Williams</option>
                                    <option value="Mercedes">Mercedes</option>
                                    <option value="Haas">Haas</option>
                                    <option value="Alpine">Alpine</option>
                                </select>
                            </div>
                            <button onClick={handleSubmit} className='absolute top-0 right-0 text-black h-fit bg-slate-200 w-fit px-4 py-2 rounded-lg hover:bg-slate-300'>Save</button>
                        </>
                    ) : (
                        <>
                            <p>Favourite Team: {userDetails.team}</p>
                            {currentUser.uid === profileId ? (
                                <button onClick={() => editing ? setEditing(false) : setEditing(true)} className='absolute top-0 right-0 text-black h-fit bg-slate-200 w-fit px-4 py-2 rounded-lg hover:bg-slate-300'>Edit Profile</button>
                            ) : (
                                <></>
                            )}
                        </>
                    )}
                </div>
            </div>
            <div>

            </div>
        </div>
    )
}

export default ProfileBio
