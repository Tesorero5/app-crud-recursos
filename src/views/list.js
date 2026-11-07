import { getAll, remove } from '../services/storage.js';
import { TIPOS, TEMAS, NIVELES } from '../data/options.js';
import { showToast } from '../components/toast.js';
import { confirmDialog } from '../components/modal.js';

// Convierte un valor a su etiqueta correspondiente buscando en la lista de opciones
export function getLabel(lista, value) {
  const item = lista.find((option) => option.value === value);
  return item ? item.label : value;
}

// Obtiene el hostname de una URL de forma segura
function getDomain(url) {
  try {
    return new URL(url).hostname;
  } catch {
    return url;
  }
}

// Renderiza la vista de listado de recursos y gestiona acciones sobre las tarjetas
export function renderList(app) {
  const recursos = getAll();
  const sortedRecursos = [...recursos].sort(
    (a, b) => new Date(b.fechaCreacion) - new Date(a.fechaCreacion)
  );

  const content =
    sortedRecursos.length === 0
      ? `
        <div class="empty-state">
          <p>Aún no tienes recursos</p>
          <a href="#/nuevo" class="btn btn-primary">Agregar el primero</a>
        </div>
      `
      : `
        <div class="resources-grid">
          ${sortedRecursos
            .map((recurso) => {
              const tipoLabel = getLabel(TIPOS, recurso.tipo);
              const temaLabel = getLabel(TEMAS, recurso.tema);
              const nivelLabel = getLabel(NIVELES, recurso.nivel);
              const dominio = getDomain(recurso.url);
              const fecha = new Date(recurso.fechaCreacion).toLocaleDateString('es-SV');
              const estrella = recurso.favorito ? '<span class="favorite-star">★</span>' : '';

              return `
                <div class="card resource-card">
                  <div class="resource-card-header">
                    <span class="badge badge--${recurso.tipo}">${tipoLabel}</span>
                    ${estrella}
                  </div>
                  <div class="resource-card-body">
                    <h2 class="resource-title">
                      <a href="${recurso.url}" target="_blank" rel="noopener">${recurso.titulo}</a>
                    </h2>
                    <span class="resource-domain">${dominio}</span>
                    <div class="resource-meta">
                      <span class="resource-meta-item">${temaLabel}</span>
                      <span class="resource-meta-separator">•</span>
                      <span class="resource-meta-item">${nivelLabel}</span>
                    </div>
                  </div>
                  <div class="resource-card-footer">
                    <span class="resource-date">${fecha}</span>
                    <div class="resource-card-actions">
                      <a href="#/editar/${recurso.id}" class="btn btn-secondary">Editar</a>
                      <button type="button" class="btn btn-danger" data-action="eliminar" data-id="${recurso.id}">Eliminar</button>
                    </div>
                  </div>
                </div>
              `;
            })
            .join('')}
        </div>
      `;

  app.innerHTML = `
    <div class="list-container">
      <div class="list-header">
        <h1>Mis recursos</h1>
        <a href="#/nuevo" class="btn btn-primary">+ Nuevo recurso</a>
      </div>
      ${content}
    </div>
  `;

  const grid = app.querySelector('.resources-grid');
  if (grid) {
    grid.addEventListener('click', async (e) => {
      const btn = e.target.closest('[data-action="eliminar"]');
      if (!btn) return;

      const id = btn.dataset.id;
      const recurso = recursos.find((item) => item.id === id);
      const titulo = recurso ? recurso.titulo : '';

      const confirmed = await confirmDialog(`¿Eliminar "${titulo}"? Esta acción no se puede deshacer.`);
      if (!confirmed) return;

      const success = remove(id);
      if (success) {
        showToast('Recurso eliminado');
        renderList(app);
      } else {
        showToast('No se pudo eliminar', 'error');
      }
    });
  }
}
