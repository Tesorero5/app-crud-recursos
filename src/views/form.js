import { TIPOS, TEMAS, NIVELES } from '../data/options.js';
import { create, update } from '../services/storage.js';
import { showToast } from '../components/toast.js';

// Renderiza el formulario para crear o editar un recurso
export function renderForm(app, recurso = null) {
  const isEdit = Boolean(recurso);
  const tituloText = isEdit ? 'Editar recurso' : 'Nuevo recurso';
  const submitText = isEdit ? 'Actualizar' : 'Guardar';

  const tipoOptions = TIPOS.map(
    (item) =>
      `<option value="${item.value}" ${recurso && recurso.tipo === item.value ? 'selected' : ''}>${item.label}</option>`
  ).join('');

  const temaOptions = TEMAS.map(
    (item) =>
      `<option value="${item.value}" ${recurso && recurso.tema === item.value ? 'selected' : ''}>${item.label}</option>`
  ).join('');

  const selectedNivel = recurso ? recurso.nivel : 'basico';
  const nivelRadios = NIVELES.map(
    (item) => `
      <label class="form-radio-label">
        <input type="radio" name="nivel" value="${item.value}" ${item.value === selectedNivel ? 'checked' : ''} />
        <span>${item.label}</span>
      </label>
    `
  ).join('');

  const isFavorito = Boolean(recurso && recurso.favorito);
  const tituloValue = recurso ? (recurso.titulo || '').replace(/"/g, '&quot;') : '';
  const urlValue = recurso ? (recurso.url || '').replace(/"/g, '&quot;') : '';

  app.innerHTML = `
    <div class="form-container">
      <h1>${tituloText}</h1>
      <div class="card form-card">
        <form id="resource-form" novalidate>
          <div class="form-group" data-field="titulo">
            <label for="titulo" class="form-label">Título</label>
            <input type="text" id="titulo" name="titulo" class="input" placeholder="Nombre del recurso" value="${tituloValue}" />
            <span class="form-error" data-error-for="titulo"></span>
          </div>

          <div class="form-group" data-field="url">
            <label for="url" class="form-label">URL</label>
            <input type="url" id="url" name="url" class="input" placeholder="https://ejemplo.com" value="${urlValue}" />
            <span class="form-error" data-error-for="url"></span>
          </div>

          <div class="form-group" data-field="tipo">
            <label for="tipo" class="form-label">Tipo</label>
            <select id="tipo" name="tipo" class="select">
              <option value="">Selecciona...</option>
              ${tipoOptions}
            </select>
            <span class="form-error" data-error-for="tipo"></span>
          </div>

          <div class="form-group" data-field="tema">
            <label for="tema" class="form-label">Tema</label>
            <select id="tema" name="tema" class="select">
              <option value="">Selecciona...</option>
              ${temaOptions}
            </select>
            <span class="form-error" data-error-for="tema"></span>
          </div>

          <div class="form-group" data-field="nivel">
            <label class="form-label">Nivel</label>
            <div class="form-radio-group">
              ${nivelRadios}
            </div>
            <span class="form-error" data-error-for="nivel"></span>
          </div>

          <div class="form-group">
            <label class="form-checkbox-label">
              <input type="checkbox" id="favorito" name="favorito" ${isFavorito ? 'checked' : ''} />
              <span>Favorito</span>
            </label>
          </div>

          <div class="form-actions">
            <button type="submit" class="btn btn-primary">${submitText}</button>
            <a href="#/recursos" class="btn btn-secondary">Cancelar</a>
          </div>
        </form>
      </div>
    </div>
  `;

  const form = app.querySelector('#resource-form');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Limpiar errores previos
    form.querySelectorAll('.is-error').forEach((element) => {
      element.classList.remove('is-error');
      element.removeAttribute('aria-invalid');
    });
    form.querySelectorAll('.form-error').forEach((element) => {
      element.textContent = '';
    });

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // Convertir favorito a booleano
    data.favorito = Boolean(data.favorito);

    // Validar campos
    const errors = {};

    const titulo = (data.titulo || '').trim();
    if (!titulo) {
      errors.titulo = 'El título es obligatorio';
    } else if (titulo.length < 3) {
      errors.titulo = 'El título debe tener al menos 3 caracteres';
    }

    const url = (data.url || '').trim();
    if (!url) {
      errors.url = 'La URL es obligatoria';
    } else {
      try {
        new URL(url);
      } catch {
        errors.url = 'La URL no es válida';
      }
    }

    if (!data.tipo) {
      errors.tipo = 'El tipo es obligatorio';
    }

    if (!data.tema) {
      errors.tema = 'El tema es obligatorio';
    }

    if (Object.keys(errors).length > 0) {
      Object.entries(errors).forEach(([field, message]) => {
        const inputElement = form.querySelector(`[name="${field}"]`);
        if (inputElement) {
          inputElement.classList.add('is-error');
          inputElement.setAttribute('aria-invalid', 'true');
        }
        const errorElement = form.querySelector(`[data-error-for="${field}"]`);
        if (errorElement) {
          errorElement.textContent = message;
        }
      });
      return;
    }

    // Guardar nuevo recurso o actualizar existente
    data.titulo = titulo;
    data.url = url;

    if (recurso) {
      update(recurso.id, data);
      showToast('Recurso actualizado');
    } else {
      create(data);
      showToast('Recurso guardado');
    }

    form.reset();
    window.location.hash = '#/recursos';
  });
}
