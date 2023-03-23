import { createContext } from 'react';
import useGetUser from '../Hooks/useGetUser';

export const AuthContext = createContext();

const ContextProvider = ({ children }) => {
    const user = useGetUser();
    return (
        <AuthContext.Provider value={user}>
            {children}
        </AuthContext.Provider>
    );
};

export default ContextProvider;