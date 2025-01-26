import { createContext, useContext, useState } from 'react';

//create auth context
const UserAuthContext = createContext();

//context provider
export const UserAuthContextProvider = ({ children }) => {
    const [userJwt, setUserJwt] = useState(null);

    return (
        <UserAuthContext.Provider value={[userJwt, setUserJwt]}>
            {children}
        </UserAuthContext.Provider>
    );
};

export const useUserAuthContext = () => useContext(UserAuthContext);