import React from 'react';
import { Link } from 'react-router-dom';
import psicoterapia from '../img/psicoterapia.png';
import yoga from '../img/yoga.png';
import Header from '../Header';

const Event = () => {
  return (
    <div>
      <Header/>
    
      <div className="event-container">
        <h2 className="event-title">EVENTOS</h2>

        <div className="event-card">
          <img src={psicoterapia} alt="Psicoterapia" className="event-image" />
          <div className="event-info">
            <h3>Psicoterapia...</h3>
            <p>Dirigida por...</p>
            <p>DESCRIPCION.....................................................</p>
            <p>21/11/2024</p>
            <Link to="/principal" className="event-link">ANOTARME</Link>
          </div>
        </div>

        <div className="event-card">
          <img src={yoga} alt="Clase de Yoga" className="event-image" />
          <div className="event-info">
            <h3>Clase de Yoga...</h3>
            <p>Dirigida por...</p>
            <p>DESCRIPCION.....................................................</p>
            <p>21/11/2024</p>
            <Link to="/principal" className="event-link">ANOTARME</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Event;
