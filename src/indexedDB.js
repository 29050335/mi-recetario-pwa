import { openDB } from 'idb';

const dbPromise = openDB('recetasDB', 2, { // Cambia a versión 2
    upgrade(db) {
      if (!db.objectStoreNames.contains('recipes')) {
        db.createObjectStore('recipes', { keyPath: 'id', autoIncrement: true });
      }
    },
  });
  

// Guardar receta en IndexedDB
export const saveRecipeToIndexedDB = async (recipe) => {
  const db = await dbPromise;
  await db.add('recipes', recipe);
};

// Obtener recetas de IndexedDB
export const getRecipesFromIndexedDB = async () => {
  const db = await dbPromise;
  return await db.getAll('recipes');
};

