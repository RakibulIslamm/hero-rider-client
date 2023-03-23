import React from 'react';
import { Link } from 'react-router-dom';

const SinglePackage = ({ singlePackage }) => {
    return (
        <div>
            <img src={singlePackage?.img} alt="" />
            <div className='p-3'>
                <h2 className='text-xl text-gray-600 font-semibold'>{singlePackage?.name}</h2>
                <p className='text-2xl font-bold text-gray-800'>${singlePackage?.price}</p>
                <Link to={`/package/${singlePackage?._id}`} className='px-4 py-2 rounded font-medium bg-sky-500 mt-3 inline-block'>Pay Now</Link>
            </div>
        </div>
    );
};

export default SinglePackage;