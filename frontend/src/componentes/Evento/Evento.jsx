import React from 'react';
import { Link } from 'react-router-dom';
import psicoterapia from '../img/psicoterapia.png';
import yoga from '../img/yoga.png';

const Evento = () => {
  return (
    <div className="evento-container">
      <h2 className="evento-title">EVENTOS</h2>

      <div className="evento-card">
        <img src={psicoterapia} alt="Psicoterapia" className="evento-image" />
        <div className="evento-info">
          <h3>Psicoterapia...</h3>
          <p>Dirigida por...</p>
          <p>DESCRIPCION..........................................................................................................</p>
          <p>21/11/2024</p>
          <Link to="/" className="evento-link">ANOTARME</Link>
        </div>
      </div>

      <div className="evento-card">
        <img src={yoga} alt="Clase de Yoga" className="evento-image" />
        <div className="evento-info">
          <h3>Clase de Yoga...</h3>
          <p>Dirigida por...</p>
          <p>DESCRIPCION..........................................................................................................</p>
          <p>21/11/2024</p>
          <Link to="/" className="evento-link">ANOTARME</Link>
        </div>
      </div>
    </div>
  );
};

export default Evento;
