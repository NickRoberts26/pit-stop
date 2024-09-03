import { NavLink } from 'react-router-dom'
import { auth } from "../firebase";
import { useAuth } from '../auth/AuthContext';

const NavBar = () => {
    const { currentUser } = useAuth();

    async function handleLogout() {
        try {
            await auth.signOut();
            window.location.href = "/";
        } catch (error) {
            console.log(error);
        }
    }

    const linkClass = 'text-black text-xl mx-4 hover:underline';

    return (
        <div className='bg-white w-full mb-10 font-exo fixed top-0 border-b border-black'>
            <nav className='flex justify-between p-6'>
                <NavLink
                to='/'
                className='flex items-center'
                >
                    <h1 className='text-2xl mr-4'>PitStop</h1>
                    <img className='w-[110px] hover:translate-x-2 transition-translate duration-200' src="../assets/logo.png" alt="" />
                </NavLink>
                <div className='flex items-center'>
                    {currentUser ? (
                        <>
                        <NavLink
                        to={`/profile/${currentUser.uid}`}
                        className={linkClass}
                        >
                            Profile
                        </NavLink>
                        <NavLink
                        to='/'
                        className={linkClass}
                        onClick={handleLogout}
                        >
                            Logout
                        </NavLink>
                        </>
                    ) : (
                        <NavLink
                        to='/login'
                        className={linkClass}
                        >
                            Login
                        </NavLink>
                    )}
                </div>
            </nav>
        </div>
    )
}

export default NavBar
