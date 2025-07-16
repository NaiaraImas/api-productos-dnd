# 🧙‍♂️ API de Productos DnD

Proyecto final del curso de backend Node.js.  
Una API RESTful para gestionar productos relacionados con *Dungeons & Dragons*.  
Incluye autenticación con JWT, control de roles y conexión a Firebase Firestore.

---

## 🚀 Funcionalidades

- CRUD completo sobre productos
- Registro y login de usuarios
- Control de roles (`admin`, `usuario`)
- Rutas protegidas con JWT
- Conexión con Firebase Firestore
- Separación por capas (routes, controllers, services, middlewares)

---

## 🔧 Instalación

```bash
git clone https://github.com/NaiaraImas/api-productos-dnd.git
cd api-productos-dnd
npm install
npm run dev
```

---

## 🧪 Variables de entorno

Crear un archivo `.env` en la raíz del proyecto con tus credenciales de Firebase y tu clave JWT:

```env
JWT_SECRET=claveSecretaSuperSegura
API_KEY=...
AUTH_DOMAIN=...
PROJECT_ID=...
...
```

---

## 🔐 Rutas de la API

| Método | Endpoint                  | Descripción                    |
|--------|---------------------------|--------------------------------|
| POST   | /auth/register            | Registro de usuario            |
| POST   | /auth/login               | Login y generación de token    |
| GET    | /api/products             | Ver todos los productos        |
| GET    | /api/products/:id         | Ver producto por ID            |
| POST   | /api/products/create      | Crear producto *(solo admin)*  |
| PUT    | /api/products/:id         | Editar producto *(solo admin)* |
| DELETE | /api/products/:id         | Borrar producto *(solo admin)* |

---

## 🧰 Tecnologías usadas

- Node.js + Express
- Firebase Firestore
- JWT para autenticación
- bcryptjs para encriptar contraseñas
- dotenv para configuración de entorno
- Postman / curl para pruebas
- Git y GitHub para control de versiones

---

## 📬 Colección Postman

Podés probar todos los endpoints de la API con esta colección:

📁 [`coleccion-postman-proyecto-final.json`](./coleccion-postman-proyecto-final.json)

Importala en Postman para acceder rápidamente a login, registro y rutas de productos.

---

> Proyecto desarrollado por **Naiara Imas** ✨