import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './RecipeDetails.css';

const RecipeDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { recipe } = location.state;

  const handleBackClick = () => {
    navigate(-1); // Navega a la página anterior
  };

  return (
    <div className="recipe-details-container">
      <header className="recipe-details-header">
        <button className="back-button" onClick={handleBackClick}>
          ← Regresar
        </button>
        <h2>{recipe.name}</h2>
      </header>

      <p><strong>Autor:</strong> {recipe.author}</p>

      {recipe.image && (
        <div className="recipe-details-image">
          <img src={recipe.image} alt={`Imagen de ${recipe.name}`} />
        </div>
      )}

      <h3>Ingredientes</h3>
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>

      <h3>Pasos</h3>
      <ol>
        {recipe.steps.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>
    </div>
  );
};

export default RecipeDetails;
