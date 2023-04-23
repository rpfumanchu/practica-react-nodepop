import axios from "axios";
import React, { useState } from "react";

function Formulario() {
  const [data, setData] = useState({
    // Aquí puedes definir los campos que quieres enviar en el formulario
    campo1: "",
    campo2: "",
    campo3: "",
  });

  const handleSubmit = event => {
    event.preventDefault();

    axios
      .post("/api/endpoint", data)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleChange = event => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Campo 1:
        <input
          type="text"
          name="campo1"
          value={data.campo1}
          onChange={handleChange}
        />
      </label>
      <label>
        Campo 2:
        <input
          type="text"
          name="campo2"
          value={data.campo2}
          onChange={handleChange}
        />
      </label>
      <label>
        Campo 3:
        <input
          type="text"
          name="campo3"
          value={data.campo3}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Enviar</button>
    </form>
  );
}

export default Formulario;
