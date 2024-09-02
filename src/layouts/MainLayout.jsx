import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../components/NavBar'

const MainLayout = () => {
    return (
    <>
        <NavBar />
        <div className='main-content max-w-[1000px] w-full font-exo'>
            <Outlet />
        </div>
        <footer className='bg-white w-full mt-6 py-3 px-6 flex text-sm border-t border-black'>
            <p className='mr-6'>Nick Roberts 2024</p>
            <a className='mr-6' href="mailto: web@nickdev.co">web@nickdev.co</a>
            <a className='mr-6' href="https://github.com/NickRoberts26" target='_blank'>Github</a>
        </footer>
    </>
    )
  
}

export default MainLayout