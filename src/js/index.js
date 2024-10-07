import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './component/app';
import '../styles/index.css';

// Seleccionar el contenedor en el DOM
const container = document.getElementById('root'); 
const root = ReactDOM.createRoot(container);

// Renderizar aplicación
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
