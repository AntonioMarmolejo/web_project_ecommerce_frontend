# StyleStore — E-commerce de Moda
Proyecto final del programa de desarrollo web de TripleTen. Aplicación full stack de e-commerce de moda construida con React + Node.js/Express, conectada a la [Platzi Fake Store API](https://fakeapi.platzi.com).

## 🔗 Demo

- **Frontend**: _(agregar link )_
- **Backend**: _(agregar link )_

---

## 📋 Descripción

StyleStore es una tienda de ropa online que permite a los usuarios explorar un catálogo de productos, buscar y filtrar por categoría y precio, guardar favoritos y gestionar un carrito de compras. Los usuarios pueden registrarse e iniciar sesión para mantener su experiencia personalizada.

---

## ✨ Funcionalidades

- Catálogo de productos con grilla responsive
- Búsqueda por nombre con debounce de 500ms
- Filtros por categoría y rango de precio
- Paginación del catálogo
- Página de detalle de producto con imágenes y productos relacionados
- Carrito de compras persistente en localStorage
- Lista de favoritos / wishlist
- Registro e inicio de sesión con autenticación JWT
- Rutas protegidas para usuarios autenticados
- Diseño responsive: 1440px · 1024px · 768px · 375px

---

## 🛠️ Stack tecnológico

### Frontend

- React 18 + Vite
- React Router DOM v6
- Axios
- CSS con metodología BEM
- Tipografía: Inter (Google Fonts)

### Backend

- Node.js
- Express
- CORS
- dotenv
- Axios (proxy hacia Platzi Fake Store API)

### API third-party

- [Platzi Fake Store API](https://fakeapi.platzi.com) — productos, categorías y autenticación JWT

---

## 🗂️ Estructura del proyecto

```
├── web_project_ecommerce_frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar/
│   │   │   │   ├── Navbar.jsx
│   │   │   │   └── Navbar.css
│   │   │   ├── ProductCard/
│   │   │   │   ├── ProductCard.jsx
│   │   │   │   └── ProductCard.css
│   │   │   └── SearchFilters/
│   │   │       ├── SearchFilters.jsx
│   │   │       └── SearchFilters.css
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Products.jsx
│   │   │   ├── ProductDetail.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── Favorites.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── NotFound.jsx
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   └── CartContext.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env.example
│   ├── index.html
│   └── package.json
│
└── web_project_ecommerce_backend/
    ├── src/
    │   ├── routes/
    │   │   ├── products.js
    │   │   ├── categories.js
    │   │   └── auth.js
    │   ├── middlewares/
    │   │   └── authMiddleware.js
    │   ├── services/
    │   │   └── platziApi.js
    │   └── app.js
    ├── .env.example
    ├── server.js
    └── package.json
```

---

## 🚀 Instalación y uso local

### Requisitos previos

- Node.js v18+
- npm v9+

### 1. Clonar los repositorios

```bash
git clone https://github.com/tu-usuario/web_project_ecommerce_frontend.git
git clone https://github.com/tu-usuario/web_project_ecommerce_backend.git
```

### 2. Configurar el backend

```bash
cd web_project_ecommerce_backend
npm install
```

Crea un archivo `.env` basado en `.env.example`:

```
PORT=4000
PLATZI_API_URL=https://api.escuelajs.co/api/v1
FRONTEND_URL=http://localhost:5173
```

Inicia el servidor:

```bash
npm run dev
```

El servidor estará disponible en `http://localhost:4000`

### 3. Configurar el frontend

```bash
cd web_project_ecommerce_frontend
npm install
```

Crea un archivo `.env` basado en `.env.example`:

```
VITE_API_URL=http://localhost:4000/api
```

Inicia la app:

```bash
npm run dev
```

La app estará disponible en `http://localhost:5173`

---

## 🔌 Endpoints del backend

### Productos

| Método | Endpoint                                                 | Descripción                     |
| ------ | -------------------------------------------------------- | ------------------------------- |
| GET    | `/api/products`                                          | Listar productos con paginación |
| GET    | `/api/products?title=&categoryId=&price_min=&price_max=` | Filtrar productos               |
| GET    | `/api/products/:id`                                      | Detalle de producto             |
| GET    | `/api/products/:id/related`                              | Productos relacionados          |

### Categorías

| Método | Endpoint                       | Descripción             |
| ------ | ------------------------------ | ----------------------- |
| GET    | `/api/categories`              | Listar categorías       |
| GET    | `/api/categories/:id/products` | Productos por categoría |

### Autenticación

| Método | Endpoint             | Descripción                    |
| ------ | -------------------- | ------------------------------ |
| POST   | `/api/auth/register` | Registrar nuevo usuario        |
| POST   | `/api/auth/login`    | Iniciar sesión → devuelve JWT  |
| GET    | `/api/auth/profile`  | Perfil del usuario autenticado |

---

## 🗺️ Rutas del frontend

| Ruta            | Componente    | Acceso    |
| --------------- | ------------- | --------- |
| `/`             | Home          | Público   |
| `/products`     | Products      | Público   |
| `/products/:id` | ProductDetail | Público   |
| `/login`        | Login         | Público   |
| `/register`     | Register      | Público   |
| `/cart`         | Cart          | Protegido |
| `/favorites`    | Favorites     | Protegido |

---

## 🌐 Despliegue

### Backend — Railway o Render

1. Crear nuevo servicio conectado al repositorio backend
2. Configurar variables de entorno en el panel
3. El servicio se despliega automáticamente en cada push a `main`

### Frontend — Vercel o Netlify

1. Importar el repositorio frontend
2. Configurar variable de entorno `VITE_API_URL` apuntando a la URL del backend desplegado
3. El sitio se despliega automáticamente en cada push a `main`

---

## 📸 Capturas de pantalla

_(Agregar capturas del catálogo, detalle de producto y carrito al completar el proyecto)_

---

## 👩‍💻 Autora

Desarrollado por **Antonio Marmolejo Garcez** como proyecto final del programa de desarrollo web full stack de TripleTen.

---

## 📄 Licencia

Este proyecto es de uso educativo para el programa de TripleTen.
