import React, { useEffect, useState } from 'react';
import NavBar from '../Components/NavBar';
import Profile from '../Components/Profile/Profile';
import useAuth from '../Hooks/useAuth';
import banner from '../assets/gradient_2.jpg'

const MyProfile = () => {
    const [bookedPackages, setBookedPackages] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        const getUser = async () => {
            const res = await fetch(`http://localhost:5000/booked-packages?email=${user.email}`);
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
            <Profile bookedPackages={bookedPackages} user={user} />
        </>
    );
};

export default MyProfile;