# DevShelf

Biblioteca personal para guardar y organizar recursos de aprendizaje de programación.
Permite clasificar y acceder rápidamente a videos, artículos, documentación, cursos y herramientas.

## Funcionalidades

- Página de bienvenida con estadísticas (total de recursos, favoritos y temas).
- Registro de recursos con validación de formulario.
- Listado de recursos en tarjetas con badges por tipo.
- Edición de recursos.
- Persistencia en localStorage.

## Tecnologías

- **Vite** (^8.3.5)
- **JavaScript vanilla** (módulos ES)
- **CSS** con variables
- **uuid** (^14.0.3)

## Requisitos

- Node.js
- pnpm

## Estructura del proyecto

```text
src/
├── components/       # Piezas reutilizables de la interfaz (navbar, toast)
├── data/
│   └── options.js    # Opciones de configuración (tipo, tema y nivel)
├── services/
│   └── storage.js    # Lógica de acceso y almacenamiento en localStorage
├── views/            # Vistas individuales por página
├── main.js           # Punto de entrada de la aplicación
├── router.js         # Enrutamiento basado en hash
└── style.css         # Importación de los estilos globales y componentes
```

## Modelo de datos

Estructura de un recurso guardado:

```json
{
  "id": "e4b5c7d8-9012-3456-7890-abcdef123456",
  "titulo": "Documentación de JavaScript en MDN",
  "url": "https://developer.mozilla.org/es/docs/Web/JavaScript",
  "tipo": "docs",
  "tema": "javascript",
  "nivel": "basico",
  "favorito": true,
  "fechaCreacion": "2026-11-06T18:00:00.000Z"
}
```

## Autor

- [Tu nombre]
- Proyecto del bootcamp [Nombre del bootcamp]
