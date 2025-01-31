import { createContext, useContext, useState } from "react";

const ChildContext = createContext(null);

export const ChildContextProvider = ({ children }) => {
  const [childProfiles, setChildProfiles] = useState([]);
  const [usersWithAccess, setUsersWithAccess] = useState([]);

  // Add a new child profile
  const addChildProfile = (newChild) => {
    setChildProfiles((prev) => [...prev, newChild]);
  };

  //update a child profile
  const updateChildProfile = (childId, updatedData) => {
    setChildProfiles((prev) =>
      prev.map((child) => (child.id === childId ? { ...child, ...updatedData } : child))
    );
    };

  //delete a child profile
  const deleteChildProfile = (childId) => {
    setChildProfiles((prev) => prev.filter((child) => child.id !== childId));
  };

  const value = {
    childProfiles,
    usersWithAccess,
    setChildProfiles,
    setUsersWithAccess,
    addChildProfile,
    updateChildProfile,
    deleteChildProfile,
  };

  return (
    <ChildContext.Provider 
      value={value}>
      {children}
    </ChildContext.Provider>
  );
};

export const useChildContext = () => useContext(ChildContext);