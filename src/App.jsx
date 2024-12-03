import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './views/Home';
import RecipeDetails from './views/RecipeDetails';
import './App.css'; // Asegúrate de agregar estilos para el navbar aquí.

const App = () => {
  return (
    <Router>
      <div>
        <nav className="navbar">
          <h1>Mi Recetario</h1>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
