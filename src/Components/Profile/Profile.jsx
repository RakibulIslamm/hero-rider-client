

const Profile = ({ bookedPackages, user }) => {
    return (
        <div className='px-20 w-8/12 mx-auto -mt-32 space-y-3 relative z-50 pb-10'>
            <h2 className='text-4xl font-bold text-white'>Profile</h2>
            <div className='bg-white w-full h-full p-10 shadow'>
                <img className='w-[150px] h-[150px] object-cover object-center rounded-full border border-gray-400' src={user?.profile_img || "https://cdn-icons-png.flaticon.com/512/149/149071.png"} alt="" />
                <div className='text-gray-700 mt-2'>
                    <h3 className='text-2xl font-semibold'>{user?.name}</h3>
                    <h3 className='font-base text-sm'>{user?.email}</h3>
                    <h3 className='font-semibold capitalize leading-6'>{user?.user_type}</h3>
                </div>
            </div>
            {user?.user_type === 'learner' && <div>
                <h2 className='text-2xl font-semibold'>Booked Packages</h2>
                <hr />

                <div className=' flex items-center py-3'>
                    {
                        bookedPackages?.map(pkg => (
                            <div className='w-[150px]' key={pkg._id}>
                                <img className='w-[150px] h-[150px] object-cover object-center' src={pkg?.package?.img} alt="" />
                                <h2>{pkg?.package?.name}</h2>
                            </div>
                        ))
                    }
                </div>

            </div>}
            <div className='py-2'>
                <h2 className='text-2xl font-semibold'>Documents</h2>
                <hr />
                <div className='flex items-start gap-5 py-3'>
                    {user?.drivingLicense && <div className='w-1/2'>
                        <h2>Driving License</h2>
                        <img className='w-full h-[200px]' src={user?.drivingLicense} alt="" />
                    </div>}
                    <div className='w-1/2'>
                        <h2>National Identity Card</h2>
                        <img className='w-full h-[200px]' src={user?.nid_card} alt="" />
                    </div>
                </div>
            </div>
            <div>
                <h2 className='text-2xl font-semibold'>Personal Info</h2>
                <hr />
                <div className='py-3'>
                    <p>Age: {user?.age}</p>
                    <p>Address: {user?.address}</p>
                    <p>Area: {user?.area}</p>
                    <p>Phone: {user?.phone}</p>
                </div>
            </div>
        </div>
    );
};

export default Profile;