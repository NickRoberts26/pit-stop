import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';

const DriverList = () => {

    const [drivers, setDrivers] = useState([]);
    
    useEffect(() => {
        axios.get('http://localhost:3000/drivers')
        .then(res => setDrivers(res.data))
        .catch(err => console.log(err))
    }, [])

    console.log(drivers);

    return (
        <div className='w-[30%]'>
            <header className='text-center'>
                <h3 className='text-3xl mb-6 font-exo'>The Drivers</h3>
            </header>
            <ul className='pl-4'>
                {drivers.map((driver, i) => {
                    return <a href={`https://www.formula1.com/en/drivers/${driver.name.replace(/\s+/g, '-').toLowerCase()}`} target="_blank">
                        <li key={i} className={`border-2 bg-white rounded-lg border-${driver.team.replace(/\s+/g, '-').toLowerCase()} mb-2 p-2 flex items-center`}>
                            <img className='w-[35px]' src={driver.logo} alt="" />
                            <p className='ml-2'>{driver.name}</p>
                        </li>
                    </a>
                })}
            </ul>
        </div>
    )
}

export default DriverList
