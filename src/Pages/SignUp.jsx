import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import useFirebase from "../Hooks/useFirebase";
import useImageUpload from "../Hooks/useImageUpload";


const Signup = () => {
    const [uploading, setUploading] = useState(false);
    const [profileImage, setProfileImage] = useState(null);
    const [nidImage, setNidImage] = useState(null);
    const [drivingLicenseImg, setDrivingLicenseImg] = useState(null);

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const type = searchParams.get('type');
    const { user } = useAuth();
    // console.log(user)
    const { createAccount, regLoading, error, setError } = useFirebase();

    useEffect(() => {
        setError('');
    }, [])

    const { handleUploadPhoto, isUploading } = useImageUpload();

    const handleProfileImageChange = async (e) => {
        setProfileImage(e.target.files[0]);
    }
    const handleNidImageChange = async (e) => {
        setNidImage(e.target.files[0]);
    }
    const handleLicenseImageChange = async (e) => {
        setDrivingLicenseImg(e.target.files[0]);
    }

    const handleCreateAccount = async (e) => {
        e.preventDefault();

        setUploading(true);
        const profileImg = await handleUploadPhoto(profileImage);
        const drivingLicense = await handleUploadPhoto(drivingLicenseImg);
        const nidCard = await handleUploadPhoto(nidImage);
        setUploading(false);


        const userInfo = {
            name: e.target.name.value,
            email: e.target.email.value,
            age: e.target.age.value,
            address: e.target.address.value,
            phone: e.target.phone.value,
            vehicle_type: e.target.v_type.value,
            password: e.target.password.value,
            confirmPassword: e.target.confirmPassword.value,
            area: e.target.area.value,
            car_info: e.target.carInfo.value,
            user_type: type,
            profile_img: profileImg,
            drivingLicense: drivingLicense ? drivingLicense : '',
            nid_card: nidCard,
        }

        //console.log(userInfo);
        createAccount(userInfo);
    }

    return (
        <div className="w-full max-w-[1440px] min-h-[600px] mx-auto px-8 flex justify-center items-center pb-12">
            {type ? <form onSubmit={handleCreateAccount} className="px-8 mt-10 w-1/2">
                <h1 className="my-4 text-3xl text-gray-700 font-semibold">Joining as a <span className=" capitalize">{type}</span></h1>
                <div className="flex items-center gap-4 mb-4">
                    <input
                        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        name="name"
                        type="text"
                        placeholder="Full Name"
                        required
                    />
                    <input
                        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        name="email"
                        type="email"
                        placeholder="email@gmail.com"
                        required
                    />
                </div>

                <div className="flex items-center gap-4 mb-4">
                    <input
                        className="w-6/12 px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        name="age"
                        type="number"
                        placeholder="Age"
                        required
                    />
                    <input
                        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        name="address"
                        type="text"
                        placeholder="Address"
                        required
                    />
                    <input
                        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        name="phone"
                        type="text"
                        placeholder="Phone Number"
                        required
                    />
                </div>
                <div className="flex items-start gap-4 mb-4">
                    <div>
                        <label>
                            Profile Image
                        </label>
                        <input
                            className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                            type="file"
                            onChange={handleProfileImageChange}
                            required
                        />
                    </div>

                    <div>
                        <label>
                            NID Card
                        </label>
                        <input
                            className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                            type="file"
                            placeholder="Driving License"
                            onChange={handleNidImageChange}
                            required
                        />
                    </div>
                </div>
                <div className="w-full flex items-start gap-4 mb-4">
                    {type === 'rider' && <div className="w-1/2">
                        <label>
                            Driving License
                        </label>
                        <input
                            className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                            type="file"
                            placeholder="Driving License"
                            onChange={handleLicenseImageChange}
                            required
                        />
                    </div>}
                    <div className="w-1/2">
                        <label className="block">
                            Vehicle Type
                        </label>
                        <div className="inline-block relative w-full">
                            <select className="block appearance-none w-full bg-white shadow hover:border-gray-500 px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline" name="v_type" required>
                                <option value=''>Select</option>
                                <option>car</option>
                                <option>bike</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4 mb-4">
                    <input
                        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        name="password"
                        type="password"
                        placeholder="Password"
                        required
                    />
                    <input
                        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirm Password"
                        required
                    />
                </div>


                <div className="flex items-start gap-4 mb-4">
                    <div className="w-6/12">
                        <input
                            className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                            name="area"
                            type="text"
                            placeholder="Area"
                            required
                        />
                    </div>
                    <textarea
                        className="w-6/12 px-3 py-2 h-[60px] text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        name="carInfo"
                        type="text"
                        placeholder="Car Information"
                        required
                    />
                </div>
                {error && <p className='text-xs italic text-red-500 py-2'>{error}</p>}

                <div className="mb-6 text-center">
                    <button
                        className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                        type="submit"
                        disabled={regLoading || uploading}
                    >
                        {(regLoading || uploading) ? 'Loading...' : 'Register Account'}
                    </button>
                </div>
                <hr className="mb-6 border-t" />
                <div className="text-center">
                    <Link
                        className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                        to="/login"
                    >
                        Already have an account? Login!
                    </Link>
                </div>
            </form> :
                <div>
                    <div className="flex items-center gap-2 my-3 w-full">
                        <button onClick={() => navigate('/signup?type=rider')} className={`px-6 py-3 bg-orange-500 rounded-full text-white hover:bg-orange-600`}>Join as a Rider</button>
                        <button onClick={() => navigate('/signup?type=learner')} className={`px-6 py-3 rounded-full text-gray-700 border border-gray-400 hover:bg-gray-100`}>Join as a Driving Lesson Learner</button>
                    </div>
                </div>
            }
        </div>
    );
};

export default Signup;