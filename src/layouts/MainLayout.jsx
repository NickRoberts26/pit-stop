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
    </>
    )
  
}

export default MainLayout