import { Navigate } from "react-router-dom";
//NOTE Para mi la propiedad children hace menciòn al elemento que esta dentro del tag

const RequireAuth = ({ isLogged, children }) => {
  if (!isLogged) {
    return <Navigate to="/api/auth/login" />;
  }
  return children;
};

export default RequireAuth;
