import { v4 as uuidv4 } from 'uuid';

const STORAGE_KEY = 'devshelf:recursos';

// Obtiene todos los recursos almacenados o un arreglo vacío si no existen o hay error de JSON
export function getAll() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

// Crea un recurso con id único y fecha, lo guarda en localStorage y lo retorna
export function create(data) {
  const resources = getAll();
  const newResource = {
    ...data,
    id: uuidv4(),
    fechaCreacion: new Date().toISOString(),
  };
  resources.push(newResource);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(resources));
  return newResource;
}

// Devuelve el total de recursos, cantidad de favoritos y cantidad de temas únicos
export function getStats() {
  const resources = getAll();
  return {
    total: resources.length,
    favoritos: resources.filter((item) => item.favorito).length,
    temas: new Set(resources.map((item) => item.tema)).size,
  };
}
