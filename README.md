# 🧙‍♂️ API de Productos DnD

Proyecto final del curso de backend Node.js.  
Una API RESTful para gestionar productos relacionados con Dungeons & Dragons.  
Incluye autenticación con JWT, control de roles y conexión a Firebase Firestore.

## 🚀 Funcionalidades

- CRUD completo sobre productos
- Registro y login de usuarios
- Roles (`admin`, `usuario`)
- Rutas protegidas con JWT
- Base de datos en Firestore

## 🔐 Rutas

| Método | Endpoint                  | Descripción                    |
|--------|---------------------------|--------------------------------|
| POST   | /api/auth/register        | Registro de usuario            |
| POST   | /api/auth/login           | Login y generación de token    |
| GET    | /api/products             | Ver todos los productos        |
| GET    | /api/products/:id         | Ver producto por ID            |
| POST   | /api/products             | Crear producto *(solo admin)*  |
| PUT    | /api/products/:id         | Editar producto *(solo admin)* |
| DELETE | /api/products/:id         | Borrar producto *(solo admin)* |

## 🧪 Variables de entorno

Crear un archivo `.env` con los siguientes datos:

```env
JWT_SECRET=claveSecretaSuperSegura
API_KEY=...
AUTH_DOMAIN=...
PROJECT_ID=...
...

🧰 Tecnologías usadas
Node.js + Express

Firebase Firestore

JWT para autenticación

bcryptjs para encriptar contraseñas

dotenv para configuración

curl / Postman para testeo

git clone https://github.com/tuusuario/api-productos-dnd.git
cd api-productos-dnd
npm install
npm run dev

NaiaraImas