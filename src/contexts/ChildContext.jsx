import { createContext, useContext, useState } from "react";

const ChildContext = createContext();

export const ChildContextProvider = ({ children }) => {
  const [childProfiles, setChildProfiles] = useState([]);
  const [usersWithAccess, setUsersWithAccess] = useState([]);

  return (
    <ChildContext.Provider value={[childProfiles, usersWithAccess]}>
      {children}
    </ChildContext.Provider>
  );
}

export const useChildContext = () => useContext(ChildContext);