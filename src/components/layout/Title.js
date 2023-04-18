import { ReactComponent as Icon } from '../../assets/nodepop.svg';
import './Title.css';

const Title = () => {
  return (
    <div className="title">
      <Icon className="logo" />
      <h1>Práctica NodePop</h1>
      <Icon className="logo" />
    </div>
  );
};

export default Title;
