import { createContext, useState, useEffect } from 'react';
import {jwtDecode} from "jwt-decode";
import axiosInstance from '../utils/axiosInstance.js';


export const UserContext = createContext();

// UserProvider.js
export const UserProvider = ({ children }) => {
  const [userGlobal, setUserGlobal] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const API = await axiosInstance.get("/users/get-user");
        setUserGlobal(API.data.user); // แก้ไขเพื่อให้ตรงกับโครงสร้างข้อมูล
      } catch (error) {
        console.error("Error decoding token or fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);

  return (
    <UserContext.Provider value={{UserInfo: userGlobal, setUserGlobal}}>
      {children}
    </UserContext.Provider>
  );
};

