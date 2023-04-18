import { useState } from "react";
import Button from "../shared/Button";
import { login } from "./service";
import "./LoginPage.css";
import Layout from "../layout/Layout";

//DONE Loguear con email y password
function LoginPage({ onLogin, ...rest }) {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async event => {
    event.preventDefault();
    await login(credentials);

    //NOTE ahora estoy logueado
    onLogin();
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
