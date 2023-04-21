import "./Spinner.css";

const Spiner = ({ message, ...props }) => {
  return (
    <div className="spinner" {...props}>
      <div className="cargando">
        <div className="pelotas"></div>
        <div className="pelotas"></div>
        <div className="pelotas"></div>
        <span className="texto-cargando">{message}</span>
      </div>
    </div>
  );
};

export default Spiner;
