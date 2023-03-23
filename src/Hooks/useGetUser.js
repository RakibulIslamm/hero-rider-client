import { useState } from "react";


const useGetUser = () => {
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    return {
        user,
        setUser,
        isLoading,
        setIsLoading
    }
}

export default useGetUser;