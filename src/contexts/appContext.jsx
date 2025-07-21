import { useState, useEffect, createContext } from "react";
import { axiosInstance } from "../axios/axiosInstance";
import { ErrorToast } from "../utils/toastHelper";

const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [appLoading, setAppLoading] = useState(true);
  const [count, setCount] = useState(0);
  const [user, setUser] = useState({ isAuthenticated: false });

  const getUserDetails = async () => {
    try {
      setAppLoading(true);
      const resp = await axiosInstance.get("/users");
      if (resp.data.isSuccess) {
        setUser({
          isAuthenticated: true,
          ...resp.data.data.user,
        });
      } else {
        ErrorToast("Error in user Validation", resp.data.message);
      }
    } catch (err) {
      ErrorToast("Error in user validation", err.message);
    } finally {
      setAppLoading(false);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  const valueObj = {
    appLoading,
    user,
    setUser,
    count,
    setCount,
  };

  return <AppContext.Provider value={valueObj}>{children}</AppContext.Provider>;
};

export { AppContextProvider, AppContext };
