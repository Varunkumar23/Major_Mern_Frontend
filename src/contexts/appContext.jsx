import { useState, useEffect, createContext } from "react";
import { axiosInstance } from "../axios/axiosInstance";
import { ErrorToast } from "../utils/toastHelper";

const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [appLoading, setAppLoading] = useState(true);
  const [count, setCount] = useState(() => {
    const storedCount = localStorage.getItem("cartCount");
    return storedCount ? Number(storedCount) : 0;
  });

  const [cartItems, setCartItems] = useState(() => {
    const storedItems = localStorage.getItem("cartItems");
    return storedItems ? JSON.parse(storedItems) : [];
  });

  const [user, setUser] = useState({ isAuthenticated: false });
  const [searchQuery, setSearchQuery] = useState("");

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

  // 🔁 Persist count & cartItems to localStorage on change
  useEffect(() => {
    localStorage.setItem("cartCount", count);
  }, [count]);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const valueObj = {
    appLoading,
    user,
    setUser,
    count,
    setCount,
    cartItems,
    setCartItems,
    searchQuery,
    setSearchQuery,
  };

  return <AppContext.Provider value={valueObj}>{children}</AppContext.Provider>;
};

export { AppContextProvider, AppContext };
