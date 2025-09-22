import React, { createContext, useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const clearUser = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  const fetchUser = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE);
      setUser(response.data);
    } catch (error) {
      console.error("User not Authenticated", error);
      clearUser();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("token");
    if (!accessToken) {
      setLoading(false);
      return;
    }
    fetchUser();
  }, []);

  const updateUser = (userData) => {
    if (userData?.token) {
      localStorage.setItem("token", userData.token);
    }
    setUser(userData?.user || userData);
    setLoading(false);
  };

  return (
    <UserContext.Provider value={{ user, loading, updateUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
