import classNames from 'classnames';
import Button from '../shared/Button';
import './Header.css';

const Header = ({ className }) => {
  return (
    <header>
      <nav className={classNames('navbar', className)}>
        <h4>NodePop</h4>
        <ul className="list">
          <li className="list-item">
            <Button variant="primary">Login</Button>
            <Button variant="primary2">SingUp</Button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
