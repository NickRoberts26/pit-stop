import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom'
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

const NavBar = () => {
    const [user, setUser] = useState(null);

    async function handleLogout() {
        try {
            await auth.signOut();
            window.location.href = "/";
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
    
        return () => unsubscribe();
    }, []);

    const linkClass = 'text-black text-2xl mx-4';

    return (
        <div className='bg-white w-full mb-10'>
            <nav className='flex justify-between p-6'>
                <NavLink
                to='/'
                >
                    <img className='w-[120px] hover:translate-x-2 transition-translate duration-200' src="src/assets/logo.png" alt="" />
                </NavLink>
                <div>
                    {user ? (
                        <NavLink
                        to='/'
                        className={linkClass}
                        onClick={handleLogout}
                        >
                            Logout
                        </NavLink>
                    ) : (
                        <NavLink
                        to='/login'
                        className={linkClass}
                        >
                            Login
                        </NavLink>
                    )}
                    <NavLink
                    to='/profile'
                    className={linkClass}
                    >
                        Profile
                    </NavLink>
                </div>
            </nav>
        </div>
    )
}

export default NavBar
