import { useEffect, useState } from "react"
import { onAuthStateChanged, getAuth } from 'firebase/auth'
import { authApp } from "../Firebase/firebaseInit";
import useAuth from "./useAuth";


const useListenAuth = () => {
    const [authChecked, setAuthChecked] = useState(false);
    const auth = getAuth(authApp);
    const { setUser } = useAuth();
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                fetch(`http://localhost:5000/user/${user?.email}`)
                    .then(res => res.json())
                    .then(data => setUser(data))
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