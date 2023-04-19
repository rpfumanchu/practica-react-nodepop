import "./Spinner.css";

const Spiner = message => {
  return (
    <div class="spinner">
      <div class="cargando">
        <div class="pelotas"></div>
        <div class="pelotas"></div>
        <div class="pelotas"></div>
        <span class="texto-cargando">${message}</span>
      </div>
    </div>
  );
};

export default Spiner;
