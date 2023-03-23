import { useEffect, useState } from "react"
import { onAuthStateChanged, getAuth } from 'firebase/auth'
import { authApp } from "../Firebase/firebaseInit";
import useAuth from "./useAuth";


const useListenAuth = () => {
    const [authChecked, setAuthChecked] = useState(false);
    const auth = getAuth(authApp);
    const { setUser, setIsLoading } = useAuth();
    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUser(user)
                setIsLoading(true);
                try {
                    const res = await fetch(`https://hero-rider.glitch.me/user/${user?.email}`)
                    const data = await res.json();
                    setUser(data);
                }
                catch (err) {

                }
                finally {
                    setIsLoading(false)
                }
            } else {
                // console.log('User Not Found');
            }
            setTimeout(() => {
                setAuthChecked(true)
            }, 500);
        });
    }, [auth]);

    return authChecked
}

export default useListenAuth;