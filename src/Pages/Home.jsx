import React from 'react';
import Hero from '../Components/Hero';
import NavBar from '../Components/NavBar';
import useAuth from '../Hooks/useAuth';

const Home = () => {

    const { user } = useAuth();
    // console.log(user)

    return (
        <div className='min-h-screen'>
            <NavBar />
            <Hero />
        </div>
    );
};

export default Home;