import classNames from "classnames";
import Button from "../shared/Button";
import "./Header.css";
import { ReactComponent as Icon } from "../../assets/nodepop.svg";
import { logout } from "../auth/service";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../auth/context";

const Header = ({ className }) => {
  const { isLogged, onLogout } = useAuth();

  const handleLogoutClick = async () => {
    await logout();
    onLogout();
  };

  return (
    <header>
      <nav className={classNames("header-navbar", className)}>
        <Link to="/">
          <h4 className="navbar-h4">NodePop</h4>
        </Link>
        <ul className="navbar-list">
          <li className="navbar-list-item">
            <NavLink to="/api/v1/adverts/new">New</NavLink>
            <NavLink to="/api/v1/adverts" end>
              Latest Ad
            </NavLink>
            {isLogged ? (
              <Button onClick={handleLogoutClick} variant="primary2">
                Logout
              </Button>
            ) : (
              <Button as={Link} variant="primary" to="/api/auth/login">
                Login
              </Button>
            )}
          </li>
        </ul>
      </nav>
      <div className="title">
        <Icon className="logo" />
        <h1 className="title-h1">Práctica NodePop</h1>
        <Icon className="logo" />
      </div>
    </header>
  );
};

export default Header;
