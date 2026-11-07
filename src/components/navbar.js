export function renderNavbar(container) {
  container.innerHTML = `
    <nav class="navbar">
      <a href="#/" class="logo">DevShelf</a>
      <div class="navbar-links">
        <a href="#/">Inicio</a>
        <a href="#/recursos">Mis recursos</a>
        <a href="#/nuevo">Nuevo recurso</a>
      </div>
    </nav>
  `;
}

export function setActiveLink(hash) {
  const currentHash = hash || '#/';
  const links = document.querySelectorAll('.navbar a');
  links.forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === currentHash);
  });
}
