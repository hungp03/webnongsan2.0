import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header, Navigation } from '../../components'
const Public = () => {
    return (
        <div className='w-full flex flex-col items-center'>Public
            <Header />
            <Navigation />
            <div className="w-full flex flex-col items-center">
                <Outlet />
            </div>
        </div>

    )
}

export default Public