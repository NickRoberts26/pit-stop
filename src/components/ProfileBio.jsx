import React, { useState } from 'react'

const ProfileBio = ( {userDetails, themeHandler, team} ) => {
    const [driver, setDriver] = useState('');
    const [editing, setEditing] = useState(false);

    return (
        <div>
            <div className='flex relative'>
                <img className='rounded-full w-[200px]' src="https://placehold.co/400" alt="" />
                <div className='ml-6'>
                    <header className='mb-4'>
                        <h1 className='text-4xl'>{userDetails.firstName} {userDetails.lastName}</h1>
                    </header>
                    {editing ? (
                        <select name="" id="" onChange={themeHandler} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2'>
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
                    ) : (
                        <p>Favourite Team: {team}</p>
                    )}
                </div>
                <button onClick={() => editing ? setEditing(false) : setEditing(true)} className='absolute top-0 right-0 text-sm'>Edit Profile</button>
            </div>
        </div>
    )
}

export default ProfileBio
