# 🍽️ Rutas del Sabor

Aplicación web desarrollada con **Next.js + React** que permite descubrir, explorar y compartir locales gastronómicos y sus platos destacados. Los usuarios pueden registrarse, iniciar sesión, explorar restaurantes y platos, ver detalles, y dejar reseñas sobre sus experiencias.

Este proyecto fue desarrollado como parte de un obligatorio de **Taller 2026 - CTC Rosario**.

---

## 🚀 Demo

La plataforma permite:

-  Explorar restaurantes, bares, cafeterías y locales gastronómicos
- Explorar platos por categoría (entrada, principal, postre, bebida)
- Ver detalles completos de cada local (ubicación, horarios, rango de precios)
- Ver detalles completos de cada plato (descripción, precio, local asociado)
- Ver perfiles de usuarios con sus locales y platos publicados
- Registrarse e iniciar sesión
- Publicar nuevos locales
- Publicar nuevos platos vinculados a locales
- Dejar reseñas y calificaciones en locales y platos

---

## 🧠 Tecnologías Utilizadas

### Frontend
- **Next.js 16**
- **SCSS / Sass** (modular)
- **TailwindCSS**
- **FontAwesome**

### Backend
- API externa desplegada en Railway

### Herramientas de Desarrollo
- ESLint
- PostCSS
- Sass Compiler

---

## 📂 Estructura del Proyecto

```
├── public/                     # Archivos estáticos
├── src/
│   ├── api/                    # Módulo de conexión con API
│   │   └── api.js
│   ├── app/                     # App Router de Next.js
│   │   ├── layout.js            # Layout principal
│   │   ├── page.js              # Página de inicio
│   │   └── pages/               # Páginas de la aplicación
│   │       ├── altalocal/       # Alta de local
│   │       ├── altaplato/       # Alta de plato
│   │       ├── detalleLocal/    # Detalle dinámico de local
│   │       ├── detallePerfil/    # Detalle dinámico de perfil
│   │       ├── detallePlato/     # Detalle dinámico de plato
│   │       ├── locales/          # Listado de locales
│   │       ├── login/            # Inicio de sesión
│   │       ├── perfil/           # Perfil del usuario
│   │       ├── platos/           # Listado de platos
│   │       └── register/         # Registro de usuario
│   ├── components/            # Componentes reutilizables
│   │   ├── Header.js
│   │   ├── Loader.js
│   │   ├── RatingModal.js
│   │   └── context/
│   │       └── AuthContext.js   # Contexto de autenticación
│   └── styles/                 # Estilos SCSS
│       ├── css/
│       └── sass/
│           ├── base/           # Variables y estilos base
│           ├── components/      # Estilos por componente
│           ├── mixin/           # Mixins reutilizables
│           └── style.scss
├── .gitignore
├── eslint.config.mjs
├── jsconfig.json
├── next.config.mjs
├── package.json
├── postcss.config.mjs
└── README.md
```

---

## 📦 Scripts Disponibles

| Script            | Descripción                         |
| ----------------- | ----------------------------------- |
| `npm run dev`     | Ejecuta el proyecto en desarrollo   |
| `npm run build`   | Compila la aplicación               |
| `npm run start`   | Ejecuta la build                    |
| `npm run lint`    | Ejecuta ESLint                      |
| `npm run sass`    | Compila SCSS automáticamente        |

---

## 🔌 API Utilizada

La aplicación consume una API externa para gestionar:

- Autenticación de usuarios
- Registro y login
- Locales (listado, detalle, creación)
- Platos (listado, detalle, creación)
- Reseñas en locales y platos
- Perfiles de usuario

**Base URL:**  
`https://api-react-taller-production.up.railway.app`

### Endpoints principales:

| Método | Endpoint                    | Descripción                  |
| ------ | --------------------------- | ---------------------------- |
| POST   | `/api/auth/register`        | Registro de usuario          |
| POST   | `/api/auth/login`           | Inicio de sesión             |
| GET    | `/api/locals`               | Listado de locales           |
| GET    | `/api/locals/:id`           | Detalle de local             |
| POST   | `/api/locals`               | Crear nuevo local            |
| POST   | `/api/locals/:id/reviews`   | Reseña de local              |
| GET    | `/api/dishes`               | Listado de platos            |
| GET    | `/api/dishes/:id`           | Detalle de plato             |
| POST   | `/api/dishes`               | Crear nuevo plato            |
| POST   | `/api/dishes/:id/reviews`   | Reseña de plato              |
| GET    | `/api/users/:id`            | Perfil de usuario            |

---

## 🔐 Autenticación

El sistema utiliza **JWT almacenado en LocalStorage** para mantener la sesión del usuario.

El contexto global de autenticación (`AuthContext`) maneja:

- Estado del token
- Estado de carga
- Funciones `login`, `logout`
- Persistencia de sesión

```javascript
// Ejemplo de uso del contexto
const { token, login, logout, isLoading } = useAuth();
```

---

## 🎨 Estilos

El proyecto combina:

- **SCSS modular** por componente
- **TailwindCSS** para utilidades rápidas
- Variables globales de color y tipografía
- Mixins reutilizables (ej: botones CTA)

### Variables de colores principales:
```scss
$naranja-principal: #ff5e00;
$azul-oscuro: #1d3547;
$gris-suave: #f3f4f6;
```

---

## 📱 Funcionalidades Destacadas

### Exploración
- Listados con filtros combinados (búsqueda, categoría, ciudad, zona, precio, fecha)
- Filtros en tiempo real sin recargar la página

### Detalles dinámicos
- Rutas dinámicas de Next.js para locales, platos y perfiles
- Visualización de reseñas con puntuación promedio

### Gestión de contenido
- Usuarios autenticados pueden crear locales y platos
- Los locales y platos muestran el creador y fecha de publicación

### Sistema de reseñas
- Modal interactivo para calificar (1 a 5 estrellas)
- Comentarios opcionales
- Actualización en tiempo real tras enviar reseña

### Perfiles públicos
- Cada usuario tiene un perfil visible
- Muestra locales y platos creados por ese usuario
- Tabs para alternar entre contenido

