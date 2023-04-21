import { useState } from "react";
import "./App.css";
import LoginPage from "./components/auth/LoginPage";
import AdsPage from "./components/Ads/AdsPage";
import { Route, Routes, Navigate } from "react-router-dom";
import Page404 from "../src/components/shared/Page404";
import AdNew from "./components/Ads/AdNew";
import AdDetail from "./components/Ads/AdDetail";
import RequireAuth from "./components/auth/RequireAuth";
import HomePage from "./components/Ads/HomePage";

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
        <Route path="/api/v1/adverts/home" element={<HomePage />} />
        <Route
          path="/api/v1/adverts"
          element={
            <RequireAuth>
              <AdsPage onLogout={handleLogout} isLogged={isLogged} />
            </RequireAuth>
          }
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
          path="/api/v1/adverts/new"
          element={
            <RequireAuth>
              <AdNew onLogout={handleLogout} isLogged={isLogged} />
            </RequireAuth>
          }
        />
        <Route
          path="/api/v1/adverts/:id"
          element={
            <RequireAuth>
              <AdDetail onLogout={handleLogout} isLogged={isLogged} />
            </RequireAuth>
          }
        />

        <Route path="/" element={<Navigate to="/api/v1/adverts/home" />} />
        <Route path="/404" element={<Page404 />} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </div>
  );
}

export default App;
