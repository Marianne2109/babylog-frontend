import { createContext, useContext, useState } from 'react';

const UserAuthContext = createContext();

export const UserAuthContextProvider = ({ children }) => {
    const [userJwt, setUserJwt] = useState(null);

    return (
        <UserAuthContext.Provider value={[userJwt, setUserJwt]}>
            {children}
        </UserAuthContext.Provider>
    );
};

export const useUserAuthContext = () => useContext(UserAuthContext);