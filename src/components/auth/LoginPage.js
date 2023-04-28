import { useState } from "react";
import Button from "../shared/Button";
import { login } from "./service";
import "./LoginPage.css";
import Layout from "../layout/Layout";
import { useLocation, useNavigate } from "react-router-dom";
import ErrorModal from "../shared/modal/ErrorModal";
import { useAuth } from "./context";
//import Spinner from "../shared/spinner/Spinner";

//DONE Loguear con email y password y un checkbox para dar la opcion de persistir el token

function LoginPage() {
  const { onLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  // const [showModal, setShowModal] = useState(true);

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const resetError = () => {
    setError(null);
  };

  // const handleShowModalCancel = () => {
  //   setShowModal(true);
  // };

  // const handleButton = () => {
  //   setShowModal(false);
  // };

  const handleSubmit = async event => {
    event.preventDefault();

    resetError();
    setIsLoading(true);
    try {
      await login(credentials);
      setIsLoading(false);

      //NOTE ahora estoy logueado
      onLogin();

      //NOTE Redirigir al nombre de la ruta o a home
      const to = location.state?.from?.pathname || "/";

      navigate(to);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  const handleChange = event => {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value,
    });
  };

  const buttonDisabled =
    isLoading || !credentials.email || !credentials.password;

  return (
    <Layout title="Login Page">
      <div>
        <form onSubmit={handleSubmit} className="container-form">
          <label className="form-label">Email</label>
          <input
            className="form-input"
            type="text"
            name="email"
            onChange={handleChange}
            value={credentials.email}
            required
          />
          <label className="form-label">Password</label>
          <input
            className="form-input"
            type="password"
            name="password"
            onChange={handleChange}
            value={credentials.password}
            required
          />
          <label>
            Guardar sesiòn
            <input
              type="checkbox"
              name="rememberMe"
              value={credentials.rememberMe}
              onChange={handleChange}
            />
          </label>
          <Button
            type="submit"
            variant="primary"
            width="button-form"
            disabled={buttonDisabled}>
            Log in
          </Button>
        </form>
        {/* {error && (
          <div onClick={resetError} className="loginPage-error">
            {error.message}
          </div>
        )} */}

        {error && (
          <ErrorModal
            title="Error"
            message={error.message}
            // onConfirm={handleShowModalconfirm}
            onCancel={resetError}
          />
        )}
      </div>
    </Layout>
  );
}

export default LoginPage;
