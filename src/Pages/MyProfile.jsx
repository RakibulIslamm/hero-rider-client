import React, { useEffect, useState } from 'react';
import NavBar from '../Components/NavBar';
import Profile from '../Components/Profile/Profile';
import useAuth from '../Hooks/useAuth';
import banner from '../assets/gradient_2.jpg'

const MyProfile = () => {
    const [bookedPackages, setBookedPackages] = useState([]);
    const { user, isLoading } = useAuth();

    useEffect(() => {
        const getUser = async () => {
            const res = await fetch(`https://hero-rider.glitch.me/booked-packages?email=${user.email}`);
            const data = await res.json();
            setBookedPackages(data)
        }
        getUser();
    }, [user])

    // console.log(user)

    return (
        <>
            <NavBar />
            <img className='h-[250px] w-full object-cover object-bottom' src={banner} alt="" />
            {
                isLoading ?
                    <div className='w-full h-[30vh] flex justify-center items-center'>
                        <h2 className='text-3xl font-bold text-gray-400'>Loading...</h2>
                    </div>
                    :
                    <Profile bookedPackages={bookedPackages} user={user} />
            }
        </>
    );
};

export default MyProfile;