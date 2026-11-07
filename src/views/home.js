import { getStats } from '../services/storage.js';

// Renderiza la vista de inicio con hero, estadísticas y funcionalidades
export function renderHome(app) {
  const stats = getStats();

  app.innerHTML = `
    <section class="hero">
      <h1>Tu biblioteca de recursos para aprender a programar</h1>
      <p>Guarda, organiza y accede a tus recursos favoritos en un solo lugar.</p>
      <a href="#/recursos" class="btn btn-primary">Empezar</a>
    </section>

    <section class="home-section">
      <div class="cards-grid">
        <div class="card stat-card">
          <span class="stat-number">${stats.total}</span>
          <span class="stat-label">Recursos guardados</span>
        </div>
        <div class="card stat-card">
          <span class="stat-number">${stats.favoritos}</span>
          <span class="stat-label">Favoritos</span>
        </div>
        <div class="card stat-card">
          <span class="stat-number">${stats.temas}</span>
          <span class="stat-label">Temas</span>
        </div>
      </div>
    </section>

    <section class="home-section">
      <div class="cards-grid">
        <div class="card feature-card">
          <h3>Guardar</h3>
          <p>Añade enlaces a videos, artículos, documentación y cursos útiles.</p>
        </div>
        <div class="card feature-card">
          <h3>Organizar</h3>
          <p>Clasifica cada recurso según su tecnología, formato y nivel de dificultad.</p>
        </div>
        <div class="card feature-card">
          <h3>Encontrar</h3>
          <p>Localiza de inmediato el contenido que necesitas para continuar aprendiendo.</p>
        </div>
      </div>
    </section>
  `;
}
