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

// Devuelve el recurso con ese id usando find, o null si no existe
export function getById(id) {
  const resources = getAll();
  const resource = resources.find((item) => item.id === id);
  return resource || null;
}

// Actualiza un recurso existente combinando sus datos y conservando id y fechaCreacion
export function update(id, data) {
  const resources = getAll();
  const index = resources.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  const recursoActual = resources[index];
  const updatedResource = {
    ...recursoActual,
    ...data,
    id: recursoActual.id,
    fechaCreacion: recursoActual.fechaCreacion,
  };
  resources[index] = updatedResource;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(resources));
  return updatedResource;
}

// Elimina un recurso por su id si existe, guarda los cambios y retorna true, o false si no existe
export function remove(id) {
  const resources = getAll();
  const exists = resources.some((item) => item.id === id);
  if (!exists) {
    return false;
  }
  const filtered = resources.filter((item) => item.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  return true;
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
