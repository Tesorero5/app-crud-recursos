// Muestra un diálogo modal de confirmación y resuelve true si se confirma o false si se cancela
export function confirmDialog(message) {
  return new Promise((resolve) => {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.innerHTML = `
      <div class="modal">
        <p class="modal-message">${message}</p>
        <div class="modal-actions">
          <button type="button" class="btn btn-secondary" data-action="cancel">Cancelar</button>
          <button type="button" class="btn btn-danger" data-action="confirm">Eliminar</button>
        </div>
      </div>
    `;

    function cleanup(result) {
      overlay.remove();
      resolve(result);
    }

    overlay.querySelector('[data-action="confirm"]').addEventListener('click', () => cleanup(true));
    overlay.querySelector('[data-action="cancel"]').addEventListener('click', () => cleanup(false));

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        cleanup(false);
      }
    });

    document.body.appendChild(overlay);
  });
}
