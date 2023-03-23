import React from 'react';
import { useNavigate } from 'react-router-dom';
import car from '../assets/car-2.png'

const Hero = () => {

    const navigate = useNavigate();

    return (
        <div className='w-full h-screen min-h-[600px] -mt-[70px] flex justify-center items-start flex-col px-20'>
            <div className='flex justify-between items-center'>
                <div className='w-6/12'>
                    <h2 className='text-[80px] font-bold'>Let's ride</h2>
                    <div className="flex items-center gap-2 my-3 w-full">
                        <button onClick={() => navigate('/signup?type=rider')} className={`px-6 py-3 bg-orange-500 rounded-full text-white hover:bg-orange-600`}>Join as a Rider</button>
                        <button onClick={() => navigate('/signup?type=learner')} className={`px-6 py-3 rounded-full text-gray-700 border border-gray-400 hover:bg-gray-100`}>Join as a Driving Lesson Learner</button>
                    </div>
                </div>
                <img className='w-6/12' src={car} alt="" />
            </div>
        </div>
    );
};

export default Hero;