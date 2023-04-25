import { useState } from "react";
import Button from "../shared/Button";
import { login } from "./service";
import "./LoginPage.css";
import Layout from "../layout/Layout";
import { useLocation, useNavigate } from "react-router-dom";
import Spiner from "../shared/Spinner";

//DONE Loguear con email y password y un checkbox para dar la opcion de persistir el token

function LoginPage({ onLogin, ...rest }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleSubmit = async event => {
    event.preventDefault();

    await login(credentials);

    //NOTE ahora estoy logueado
    onLogin();

    //NOTE Redirigir al nombre de la ruta o a home
    const to = location.state?.from?.pathname || "/";

    navigate(to);
  };

  const handleChange = event => {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value,
    });
  };

  const buttonDisabled = !credentials.email || !credentials.password;

  return (
    <Layout title="Login Page" {...rest}>
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
      </div>
    </Layout>
  );
}

export default LoginPage;
