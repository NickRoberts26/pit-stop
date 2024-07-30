import React from 'react'
import { NavLink } from 'react-router-dom'

const NavBar = () => {

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
                <NavLink
                to='/'
                className={linkClass}
                >
                    Sign Up
                </NavLink>
                <NavLink
                to='/'
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
