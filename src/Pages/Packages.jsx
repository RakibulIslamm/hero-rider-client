import React, { useEffect, useState } from 'react';
import NavBar from '../Components/NavBar';
import SinglePackage from '../Components/SinglePackage';
import useAuth from '../Hooks/useAuth';

const Packages = () => {
    const [packages, setPackages] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        const getPackages = async () => {
            const res = await fetch('https://hero-rider.glitch.me/packages');
            const data = await res.json();
            setPackages(data);
        }
        getPackages();
    }, [])

    return (
        <>
            <NavBar />
            {user?.user_type === 'learner' && <div className='w-full max-w-[1440px] mx-auto px-20 mt-20 pb-10'>
                <h1 className='text-5xl font-bold py-8'>Packages</h1>
                <div className='grid grid-cols-3 gap-5'>
                    {
                        packages.map(pkg => <SinglePackage key={pkg._id} singlePackage={pkg} />)
                    }
                </div>
            </div>}
        </>
    );
};

export default Packages;