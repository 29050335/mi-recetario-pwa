import React from 'react';
import { useNavigate } from 'react-router-dom';
import './RecipeCard.css';

const RecipeCard = ({ recipe }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/recipe/${recipe.name}`, { state: { recipe } });
  };

  return (
    <div className="recipe-card" onClick={handleClick}>
      {recipe.image && (
        <div className="recipe-image">
          <img src={recipe.image} alt={`Imagen de ${recipe.name}`} className="recipe-img" />
        </div>
      )}
      <div className="recipe-content">
        <h3 className="recipe-title">{recipe.name}</h3>
        <p className="recipe-author"><strong>Autor:</strong> {recipe.author}</p>
      </div>
    </div>
  );
};

export default RecipeCard;
