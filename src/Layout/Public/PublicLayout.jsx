import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../../Components/NavBar';

const PublicLayout = () => {
    return (
        <div className=''>
            <NavBar />
            <div className='max-w-[1440px] mx-auto'>
                <Outlet />
            </div>
        </div>
    );
};

export default PublicLayout;