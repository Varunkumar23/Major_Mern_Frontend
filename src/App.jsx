import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router";
import useAppContext from "./contexts/useAppContext";
import { BounceLoader, RingLoader } from "react-spinners";
import { SignupPage } from "./pages/SignupPage";
import { LoginPage } from "./pages/LoginPage";
import { HomePage } from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotfoundPage";
import { CartPage } from "./pages/CartPage";
import { AboutusPage } from "./pages/AboutusPage";

const App = () => {
  const { appLoading, user } = useAppContext();

  const { isAuthenticated } = user;

  if (appLoading) {
    return (
      <div className="min-h-[100vh] flex flex-col items-center justify-center gap-10 content-center">
        <RingLoader size="175px" color="#2020ff" />
        <div className="border-1 border-lime-800 p-8 rounded-lg">
          <p>Loading......</p>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        {!isAuthenticated ? (
          <>
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<LoginPage />} />
          </>
        ) : (
          <>
            <Route path="/" element={<HomePage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/aboutus" element={<AboutusPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
