import classNames from "classnames";
import Button from "../shared/Button";
import "./Header.css";
import { ReactComponent as Icon } from "../../assets/nodepop.svg";
import { logout } from "../auth/service";
import { Link, NavLink } from "react-router-dom";

const Header = ({ className, isLogged, onLogout }) => {
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
            {isLogged ? (
              <Button onClick={handleLogoutClick} variant="primary2">
                Logout
              </Button>
            ) : (
              <Button variant="primary">Login</Button>
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
