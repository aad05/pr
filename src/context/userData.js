import React, { createContext, useState } from 'react';

const UserData = createContext();
export default UserData;

export const User = ({ children }) => {
  const [data, setData] = useState({ isAuthed: false, refresh: false });
  return (
    <UserData.Provider value={[data, setData]}>{children}</UserData.Provider>
  );
};
