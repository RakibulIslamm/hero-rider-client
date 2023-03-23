import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, getAuth, signOut } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authApp } from '../Firebase/firebaseInit'


const useFirebase = () => {
    const [loginLoading, setLoginLoading] = useState(false);
    const [regLoading, setRegLoading] = useState(false);
    const [error, setError] = useState('');
    const auth = getAuth(authApp);
    const navigate = useNavigate();

    // Create account
    const createAccount = async (userInfo) => {
        setRegLoading(true)

        const saveUser = {
            name: userInfo.name,
            email: userInfo.email,
            age: parseInt(userInfo.age),
            address: userInfo.address,
            phone: userInfo.phone,
            profile_img: userInfo.profile_img,
            drivingLicense: userInfo.drivingLicense ? userInfo.drivingLicense : '',
            nid_card: userInfo.nid_card,
            car_info: userInfo.car_info,
            vehicle_type: userInfo.vehicle_type,
            user_type: userInfo.user_type,
            area: userInfo.area,
        }
        fetch('https://hero-rider.glitch.me/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(saveUser)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
            })

        try {
            const result = await createUserWithEmailAndPassword(auth, userInfo.email, userInfo.password);
            const user = result.user;
            if (user?.email) {
                try {
                    await updateProfile(auth.currentUser, { displayName: userInfo.name });
                    navigate('/profile');
                }
                catch (err) {

                }
            }
        }
        catch (err) {
            setError(err.message);
        }
        finally {
            setRegLoading(false);
        }
    }

    // Login
    const login = async (email, password) => {
        setLoginLoading(true);
        try {
            const result = await signInWithEmailAndPassword(auth, email, password)
            const user = result.user;
            const currentUser = { name: user.displayName, email: user.email, img: user.photoURL }
            // console.log(currentUser);
        }
        catch (err) {
            setError(err.message);
        }
        finally {
            setLoginLoading(false);
        }

    }

    // Log Out
    const logOut = (navigate) => {
        signOut(auth)
            .then(() => {
                navigate('/login');
            })
            .catch((error) => {
                // An error happened.
            });
    }


    return {
        createAccount,
        regLoading,
        login,
        loginLoading,
        logOut,
        error,
        setError
    }

}

export default useFirebase