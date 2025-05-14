import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // Initialize user from localStorage
  const [user, setUserState] = useState(() => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    return {
      token,
      username: localStorage.getItem("username"),
      userId: localStorage.getItem("userId"),
      hasChannel: localStorage.getItem("hasChannel") === "true",
      channelId: localStorage.getItem("channelId"),
    };
  });

  // Helper to update user state AND localStorage together
  const setUser = (userData) => {
    if (userData) {
      localStorage.setItem("token", userData.token);
      localStorage.setItem("username", userData.username);
      localStorage.setItem("userId", userData.userId);
      localStorage.setItem("hasChannel", userData.hasChannel ? "true" : "false");
      localStorage.setItem("channelId", userData.channelId || "");
      setUserState(userData);
    } else {
      // Clear on logout
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("userId");
      localStorage.removeItem("hasChannel");
      localStorage.removeItem("channelId");
      setUserState(null);
    }
  };

  // Optional: listen to localStorage changes (e.g., in multiple tabs)
  useEffect(() => {
    const handleStorageChange = () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setUserState(null);
      } else {
        setUserState({
          token,
          username: localStorage.getItem("username"),
          userId: localStorage.getItem("userId"),
          hasChannel: localStorage.getItem("hasChannel") === "true",
          channelId: localStorage.getItem("channelId"),
        });
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
