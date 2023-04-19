import { useState } from "react";
import "./App.css";
import LoginPage from "./components/auth/LoginPage";
import AdsPage from "./components/Ads/AdsPage";
import { Route, Routes, Navigate } from "react-router-dom";
import Page404 from "../src/components/shared/Page404";
import AdDetailPage from "./components/Ads/AdDetailPage";

function App({ isInitiallyLogged }) {
  const [isLogged, setIsLogged] = useState(isInitiallyLogged);

  const handleLogin = () => {
    setIsLogged(true);
  };

  const handleLogout = () => {
    setIsLogged(false);
  };

  return (
    <div className="App">
      <Routes>
        <Route
          path="/api/v1/adverts"
          element={<AdsPage onLogout={handleLogout} isLogged={isLogged} />}
        />
        <Route
          path="/api/auth/login"
          element={
            <LoginPage
              onLogout={handleLogout}
              isLogged={isLogged}
              onLogin={handleLogin}
            />
          }
        />
        <Route
          path="/api/v1/adverts/:adsId"
          element={<AdDetailPage onLogout={handleLogout} isLogged={isLogged} />}
        />
        <Route path="/" element={<Navigate to="/api/v1/adverts" />} />
        <Route path="/404" element={<Page404 />} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </div>
  );
}

export default App;
