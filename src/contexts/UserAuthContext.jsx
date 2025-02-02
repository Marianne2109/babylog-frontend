import { createContext, useContext, useState, useEffect } from 'react';

//create auth context
const UserAuthContext = createContext();

//context provider
export const UserAuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('token');
        return storedUser && storedToken ? { ...JSON.parse(storedUser), jwt: storedToken } : null;
    });
    const [loadingAuth, setLoadingAuth] = useState(false);

    useEffect(() => {
        // const storedUser = localStorage.getItem('user');
        // const storedToken = localStorage.getItem('token');
        // if (storedUser && storedToken) {
        //     setCurrentUser({ ...JSON.parse(storedUser), jwt: storedToken });
        // }
        setLoadingAuth(false);
    }, []);

    return (
        <UserAuthContext.Provider value={{currentUser, setCurrentUser, loadingAuth }}>
            {children}
        </UserAuthContext.Provider>
    );
};

//hook to use user auth context
export const useUserAuthContext = () => useContext(UserAuthContext);