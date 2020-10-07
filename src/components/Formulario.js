import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";

const Formulario = ({ createDate }) => {
  const [date, setDate] = useState({
    mascota: "",
    propietario: "",
    fecha: "",
    hora: "",
    sintomas: "",
  });
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setDate({
      ...date,
      [e.target.name]: e.target.value,
    });
  };

  //Destructuring of date state
  const { mascota, propietario, fecha, hora, sintomas } = date;

  const submitDate = (e) => {
    e.preventDefault();

    //validar
    //Siempre que estemos validando hay que agregar un return para que no se ejecute el codigo que este fuera en caso de que haya un error
    if (
      mascota.trim() === "" ||
      propietario.trim() === "" ||
      fecha.trim() === "" ||
      hora.trim() === "" ||
      sintomas.trim() === ""
    ) {
      setError(true);
      return;
    }

    //Eliminar mensaje previo
    setError(false);

    //asignar ID
    date.id = uuidv4();

    //crear la cita
    createDate(date);

    //reiniciar el form
    setDate({
      mascota: "",
      propietario: "",
      fecha: "",
      hora: "",
      sintomas: "",
    });
  };

  return (
    <>
      <h2>Crear Cita</h2>
      {error ? (
        <p className="alerta-error"> Todos los campos son obligatorios </p>
      ) : null}
      <form action="" onSubmit={submitDate}>
        <label>Nombre Mascota</label>
        <input
          type="text"
          name="mascota"
          className="u-full-width"
          placeholder="Nombre Mascota"
          onChange={handleChange}
          value={mascota}
        />
        <label>Nombre Dueño</label>
        <input
          type="text"
          name="propietario"
          className="u-full-width"
          placeholder="Nombre Dueño Mascota"
          onChange={handleChange}
          value={propietario}
        />
        <label>Fecha</label>
        <input
          type="date"
          name="fecha"
          className="u-full-width"
          onChange={handleChange}
          value={fecha}
        />
        <label>Hora</label>
        <input
          type="time"
          name="hora"
          className="u-full-width"
          onChange={handleChange}
          value={hora}
        />
        <label>Sintomas</label>
        <textarea
          name="sintomas"
          className="u-full-width"
          onChange={handleChange}
          value={sintomas}
        ></textarea>
        <button type="submit" className="u-full-width button-primary">
          Agragar Cita
        </button>
      </form>
    </>
  );
};

Formulario.propTypes = {
  createDate: PropTypes.func.isRequired,
};

export default Formulario;
