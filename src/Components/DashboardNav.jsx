import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';

const DashboardNav = () => {

    const { user } = useAuth();

    return (
        <div className='h-[70px] flex items-center justify-between px-10 bg-sky-300 w-full'>
            <Link to={'/'}>
                <h1 className="text-4xl font-semibold text-gray-700"><span className="text-orange-500 font-extralight">Hero</span> Rider</h1>
            </Link>
            <h2 className='text-2xl font-semibold'>{user?.user_type === 'admin' ? 'Admin' : user?.user_type === 'rider' ? 'Rider' : 'Learner'} Dashboard</h2>
        </div>
    );
};

export default DashboardNav;