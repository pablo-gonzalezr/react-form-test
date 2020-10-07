import React, { useState, useEffect } from "react";
import Cita from "./components/Cita";
import Formulario from "./components/Formulario";

function App() {
  //Citas en local storage
  let initialDates = JSON.parse(localStorage.getItem("dates"));
  if (!initialDates) {
    initialDates = [];
  }

  //Arreglo de citas
  const [dates, setDates] = useState(initialDates);

  //useEffect para realizar operaciones cuando el state cambia
  //Se ejecuta cuando el componente esta listo o cuando hay cambios en el componente dentro de los corchetes, conocido como array de dependencias
  useEffect(() => {
    if (initialDates) {
      localStorage.setItem("dates", JSON.stringify(dates));
    } else {
      localStorage.setItem("dates", JSON.stringify([]));
    }
  }, [dates, initialDates]);

  //Funcion que tome las citas actuales y agregue la nueva
  const createDate = (date) => {
    setDates([...dates, date]);
  };

  //Funcion que elimina una cita por su id
  const deleteDate = (id) => {
    const newDates = dates.filter((date) => date.id !== id);
    setDates(newDates);
  };

  //Mensaje condicional
  const titulo = dates.length === 0 ? "No hay citas" : "Administra tus citas";

  return (
    <>
      <h1>Administrador de pacientes</h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario createDate={createDate} />
          </div>

          <div className="one-half column">
            <h2>{titulo}</h2>
            {dates.map((date) => (
              <Cita key={date.id} date={date} deleteDate={deleteDate} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
