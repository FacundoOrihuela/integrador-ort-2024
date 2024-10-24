import "./App.css";
import React, { useState } from "react";

function App() {
  const [nombre, setNombre] = useState("");

  const guardarNombre = (e) => {
    setNombre(e.target.value);
  };

  return (
    <div className="App">
      <h1> Hello World! </h1>
      <input value={nombre} placeholder="Ingrese Nombre" onChange={guardarNombre}></input>
    <p> {nombre}</p>
    </div>
  );
}

export default App;
