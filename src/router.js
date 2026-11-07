import { renderHome } from './views/home.js';
import { renderForm } from './views/form.js';
import { renderList } from './views/list.js';
import { setActiveLink } from './components/navbar.js';
import { getById } from './services/storage.js';
import { showToast } from './components/toast.js';

export const routes = {
  '#/': renderHome,
  '#/nuevo': renderForm,
  '#/recursos': renderList
};

export function initRouter(app) {
  function handleRoute() {
    const hash = window.location.hash || '#/';

    const editMatch = hash.match(/^#\/editar\/(.+)$/);
    if (editMatch) {
      const id = editMatch[1];
      const recurso = getById(id);
      if (recurso) {
        renderForm(app, recurso);
        setActiveLink('#/recursos');
      } else {
        showToast('Recurso no encontrado', 'error');
        window.location.hash = '#/recursos';
      }
      return;
    }

    const render = routes[hash] || routes['#/'];
    const activeHash = routes[hash] ? hash : '#/';

    render(app);
    setActiveLink(activeHash);
  }

  window.addEventListener('hashchange', handleRoute);
  window.addEventListener('load', handleRoute);

  handleRoute();
}
