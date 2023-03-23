import React, { useEffect, useState } from 'react';
import NavBar from '../Components/NavBar';
import Profile from '../Components/Profile/Profile';
import banner from '../assets/gradient_2.jpg'
import { useParams } from 'react-router-dom';

const UserProfile = () => {
    const [bookedPackages, setBookedPackages] = useState([]);
    const [user, setUser] = useState({});

    const { id } = useParams();
    useEffect(() => {
        const getUser = async () => {
            const res = await fetch(`https://hero-rider.glitch.me/user-profile/${id}`);
            const data = await res.json();
            setUser(data)
        }
        getUser();
    }, [id])

    console.log(user)

    useEffect(() => {
        const getBookedPackages = async () => {
            const res = await fetch(`https://hero-rider.glitch.me/booked-packages?email=${user.email}`);
            const data = await res.json();
            setBookedPackages(data)
        }
        getBookedPackages();
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

export default UserProfile;