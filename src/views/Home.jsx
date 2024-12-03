import React, { useState, useEffect } from 'react';
import RecipeCard from '../components/RecipeCard';
import RecipeForm from '../components/RecipeForm';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { getRecipesFromIndexedDB, saveRecipeToIndexedDB } from '../indexedDB';
import './Home.css';

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [isFormVisible, setFormVisible] = useState(false);

  useEffect(() => {
    const loadRecipes = async () => {
      // Cargar recetas desde IndexedDB
      const localRecipes = await getRecipesFromIndexedDB();
      setRecipes(localRecipes);

      // Sincronizar con Firestore
      const querySnapshot = await getDocs(collection(db, 'recipes'));
      const firebaseRecipes = querySnapshot.docs.map((doc) => doc.data());

      // Filtrar recetas duplicadas
      const uniqueRecipes = firebaseRecipes.filter((firebaseRecipe) =>
        !localRecipes.some(localRecipe =>
          localRecipe.name === firebaseRecipe.name &&
          localRecipe.author === firebaseRecipe.author &&
          JSON.stringify(localRecipe.ingredients) === JSON.stringify(firebaseRecipe.ingredients) &&
          JSON.stringify(localRecipe.steps) === JSON.stringify(firebaseRecipe.steps)
        )
      );

      // Guardar recetas únicas en IndexedDB
      uniqueRecipes.forEach((recipe) => saveRecipeToIndexedDB(recipe));

      // Actualizar la lista de recetas
      setRecipes((prevRecipes) => [...prevRecipes, ...uniqueRecipes]);
    };

    loadRecipes();
  }, []);

  const handleSaveRecipe = (recipe) => {
    setRecipes((prev) => [...prev, recipe]);
  };

  return (
    <div className="home-container">
      <button onClick={() => setFormVisible(true)} className="create-recipe-button">Crear Receta</button>

      {/* Formulario de Crear Receta */}
      {isFormVisible && <RecipeForm onSaveRecipe={handleSaveRecipe} />}

      {/* Contenedor de Tarjetas */}
      <div className="recipe-grid">
        {recipes.map((recipe, index) => (
          <RecipeCard key={index} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default Home;
