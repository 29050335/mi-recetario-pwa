import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { saveRecipeToIndexedDB } from '../indexedDB';
import './RecipeForm.css';

const RecipeForm = ({ onSaveRecipe }) => {
  const [name, setName] = useState('');
  const [author, setAuthor] = useState('');
  const [ingredients, setIngredients] = useState(['']);
  const [steps, setSteps] = useState(['']);
  const [error, setError] = useState('');
  const [imageBase64, setImageBase64] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [formVisible, setFormVisible] = useState(true); // Controla la visibilidad del formulario
  const [recipeSaved, setRecipeSaved] = useState(false); // Estado para indicar si la receta fue guardada

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageBase64(reader.result); // Guarda la imagen como base64
        setImageUrl(reader.result); // Muestra la vista previa
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!name || !author || ingredients.some((i) => !i) || steps.some((s) => !s) || !imageBase64) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    const newRecipe = {
      name,
      author,
      ingredients,
      steps,
      image: imageBase64,
      timestamp: new Date(),
    };

    try {
      // Guardar en Firestore
      await addDoc(collection(db, 'recipes'), newRecipe);
      // Guardar en IndexedDB
      await saveRecipeToIndexedDB(newRecipe);

      // Actualizar la lista de recetas en el estado padre
      onSaveRecipe(newRecipe);

      // Ocultar el formulario después de guardar la receta y mostrar el mensaje de receta guardada
      setFormVisible(false);
      setRecipeSaved(true);

      // Resetear el formulario
      setError('');
    } catch (error) {
      console.error('Error al guardar la receta:', error);
    }
  };

  const handleAddIngredient = () => {
    setIngredients([...ingredients, '']);
  };

  const handleRemoveIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleAddStep = () => {
    setSteps([...steps, '']);
  };

  const handleRemoveStep = (index) => {
    setSteps(steps.filter((_, i) => i !== index));
  };

  const handleCreateNewRecipe = () => {
    // Reiniciar el estado y hacer el formulario visible nuevamente
    setName('');
    setAuthor('');
    setIngredients(['']);
    setSteps(['']);
    setImageBase64('');
    setImageUrl('');
    setFormVisible(true);
    setRecipeSaved(false); // Restablecer el estado de receta guardada
  };

  const handleCloseForm = () => {
    setFormVisible(false);
  };

  return (
    <>
      {formVisible ? (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-button" onClick={handleCloseForm}>
              &times;
            </button>
            <form onSubmit={handleSave} className="recipe-form">
              <h2>Crear Receta</h2>
              {error && <p className="error">{error}</p>}
              <input
                type="text"
                placeholder="Nombre de la receta"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Autor"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />

              <h3>Ingredientes</h3>
              {ingredients.map((ingredient, index) => (
                <div key={index} className="ingredient-input">
                  <input
                    type="text"
                    placeholder={`Ingrediente ${index + 1}`}
                    value={ingredient}
                    onChange={(e) => {
                      const updatedIngredients = [...ingredients];
                      updatedIngredients[index] = e.target.value;
                      setIngredients(updatedIngredients);
                    }}
                  />
                  <button type="button" onClick={() => handleRemoveIngredient(index)}>
                    Eliminar
                  </button>
                </div>
              ))}
              <button type="button" onClick={handleAddIngredient}>
                Añadir Ingrediente
              </button>

              <h3>Pasos</h3>
              {steps.map((step, index) => (
                <div key={index} className="step-input">
                  <textarea
                    placeholder={`Paso ${index + 1}`}
                    value={step}
                    onChange={(e) => {
                      const updatedSteps = [...steps];
                      updatedSteps[index] = e.target.value;
                      setSteps(updatedSteps);
                    }}
                  ></textarea>
                  <button type="button" onClick={() => handleRemoveStep(index)}>
                    Eliminar
                  </button>
                </div>
              ))}
              <button type="button" onClick={handleAddStep}>
                Añadir Paso
              </button>

              <h3>Imagen</h3>
              <input type="file" accept="image/*" onChange={handleImageChange} />
              {imageUrl && <img src={imageUrl} alt="Vista previa" className="image-preview" />}

              <button type="submit" className="save-button">
                Guardar Receta
              </button>
            </form>
          </div>
        </div>
      ) : recipeSaved ? (
        <div className="recipe-saved">
          <p>Receta guardada exitosamente.</p>
          <button onClick={handleCreateNewRecipe} className="create-another-button">
            Crear otra receta
          </button>
        </div>
      ) : null}
    </>
  );
};

export default RecipeForm;
