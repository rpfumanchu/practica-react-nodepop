import { useState } from 'react';
import './App.css';
// import LoginPage from './components/auth/LoginPage';
import Layout from './components/layout/Layout';

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
      <Layout />
      {/* <LoginPage onLogin={handleLogin} /> */}
    </div>
  );
}

export default App;
