import { createContext, useContext, useState, useEffect } from 'react';

//create auth context
const UserAuthContext = createContext();

//context provider
export const UserAuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('token');
        if (storedUser && storedToken) {
            setCurrentUser({ ...JSON.parse(storedUser), jwt: storedToken });
        }
    }, []);

    return (
        <UserAuthContext.Provider value={{currentUser, setCurrentUser}}>
            {children}
        </UserAuthContext.Provider>
    );
};

//hook to use user auth context
export const useUserAuthContext = () => useContext(UserAuthContext);