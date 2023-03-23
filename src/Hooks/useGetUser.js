import { useState } from "react";


const useGetUser = () => {
    const [user, setUser] = useState({});
    return {
        user,
        setUser
    }
}

export default useGetUser;