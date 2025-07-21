import { useContext } from "react";
import { AppContext } from "./appContext";

const useAppContext = () => {
  return useContext(AppContext);
};

export default useAppContext;
