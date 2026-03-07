# 🍽️ Rutas del Sabor

Aplicación web desarrollada con **Next.js + React** que permite descubrir, explorar y compartir locales gastronómicos.
Los usuarios pueden registrarse, iniciar sesión, explorar restaurantes, ver detalles, y dejar reseñas sobre sus experiencias.

Este proyecto fue desarrollado como parte de un obligatorio de **Taller 2026 - CTC Rosario**.

---

# 🚀 Demo Concept

La plataforma permite:

- Explorar restaurantes y locales gastronómicos
- Ver detalles de cada local
- Registrarse e iniciar sesión
- Publicar nuevos locales
- Dejar reseñas y calificaciones
- Explorar recomendaciones gastronómicas

---

# 🧠 Tecnologías Utilizadas

### Frontend

- **Next.js 16**
- **SCSS / Sass**
- **TailwindCSS**
- **FontAwesome**

### Backend API

- API externa desplegada en Railway

### Herramientas de Desarrollo

- ESLint
- PostCSS
- Sass Compiler

---

# 📂 Estructura del Proyecto

```
│
├── public
│   └── assets estáticos
│
├── src
│   ├── api
│   │   └── api.js
│   │   
│   │
│   ├── app
│   │   ├── layout.js
│   │   ├── page.js
│   │   └── pages
│   │       ├── altalocal
│   │       ├── altaplato
│   │       ├── detalleLocal/[id]
│   │       ├── locales
│   │       ├── login
│   │       ├── perfil
│   │       └── register
│   │
│   ├── components
│   │   ├── Header.js
│   │   ├── Loader.js
│   │   ├── RatingLocal.js
│   │   └── context
│   │       └── AuthContext.js
│   │
│   └── styles
│       ├── css
│       └── sass
│
├── package.json
├── next.config.mjs
└── README.md
```

---

# 🧩 Scripts Disponibles

| Script            | Descripción                      |
| ----------------- | --------------------------------- |
| `npm run dev`   | Ejecuta el proyecto en desarrollo |
| `npm run build` | Compila la aplicación            |
| `npm run start` | Ejecuta la build                  |
| `npm run lint`  | Ejecuta ESLint                    |
| `npm run sass`  | Compila SCSS automáticamente     |

---

# 🔌 API Utilizada

La aplicación consume una API externa para gestionar:

- Autenticación de usuarios
- Registro
- Login
- Listado de locales
- Detalle de locales
- Creación de reseñas

Base URL:

```
https://api-react-taller-production.up.railway.app
```

Endpoints principales:

- `/api/auth/register`
- `/api/auth/login`
- `/api/locals`
- `/api/locals/:id`
- `/api/locals/:id/reviews`

---

# 🔐 Autenticación

El sistema utiliza **JWT almacenado en LocalStorage** para mantener la sesión del usuario.

El contexto global de autenticación se maneja mediante:

```
AuthContext
```

Esto permite compartir el estado del usuario en toda la aplicación.

---

# 🎨 Estilos

El proyecto utiliza:

- **SCSS modular**
- **TailwindCSS**
- Variables globales
- Componentes reutilizables

Organización:

```
styles
 ├── base
 ├── components
 ├── mixin
 └── style.scss
```

---

# 📸 Funcionalidades Principales

### Exploración de locales

Los usuarios pueden ver un listado de locales gastronómicos y acceder a su detalle.

### Detalle dinámico

Se utilizan **rutas dinámicas de Next.js**:

```
/detalleLocal/[id]
```

### Alta de locales

Los usuarios autenticados pueden registrar nuevos restaurantes.

### Sistema de reseñas

Cada local puede recibir:

- Calificación
- Comentarios
