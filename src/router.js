import { renderHome } from './views/home.js';
import { renderForm } from './views/form.js';
import { renderList } from './views/list.js';
import { setActiveLink } from './components/navbar.js';

export const routes = {
  '#/': renderHome,
  '#/nuevo': renderForm,
  '#/recursos': renderList
};

export function initRouter(app) {
  function handleRoute() {
    const hash = window.location.hash || '#/';
    const render = routes[hash] || routes['#/'];
    const activeHash = routes[hash] ? hash : '#/';

    render(app);
    setActiveLink(activeHash);
  }

  window.addEventListener('hashchange', handleRoute);
  window.addEventListener('load', handleRoute);

  handleRoute();
}
