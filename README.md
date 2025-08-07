# 🛒 Ecommerce Backend - Entrega Final (Coderhouse)

Proyecto backend desarrollado como entrega final del curso de Backend en Coderhouse.  
Incluye autenticación con JWT y recuperación de contraseña, sistema de carritos, compra con tickets, control de roles, arquitectura profesional con DAO/Repository/DTO/Services, y más.

---

## 🚀 Tecnologías utilizadas

- Node.js
- Express
- MongoDB + Mongoose
- JWT + Cookies
- bcrypt
- dotenv
- Nodemailer
- Prettier
- Arquitectura: DAO, Repository, Service, DTO, Controllers

---

## 📁 Estructura del proyecto

\`\`\`
src/
├── config/               # Configuración de DB y Passport
├── controllers/          # Lógica de cada endpoint
├── dao/                  # Data Access Object
├── dtos/                 # Data Transfer Objects (DTOs)
├── middleware/           # Middlewares de auth, roles, etc
├── models/               # Esquemas de Mongoose
├── repositories/         # Abstracción del DAO (Repository Pattern)
├── routes/               # Rutas de la API
├── services/             # Lógica de negocio
├── utils/                # Helpers y utilidades (hash, tokens, email)
└── app.js                # App principal
\`\`\`

---

## ⚙️ Instalación y uso

1. Clonar el repositorio:

\`\`\`bash
git clone https://github.com/tuusuario/entrega-final-backend-2.git
cd entrega-final-backend-2
\`\`\`

2. Instalar dependencias:

\`\`\`bash
npm install
\`\`\`

3. Ejecutar la app en desarrollo:

\`\`\`bash
npm run dev
\`\`\`

---

## 📬 Endpoints principales

| Método | Ruta                          | Descripción                      |
|--------|-------------------------------|----------------------------------|
| POST   | \`/api/sessions/register\`      | Registro de usuario              |
| POST   | \`/api/sessions/login\`         | Login con JWT (cookie)           |
| GET    | \`/api/sessions/current\`       | Datos del usuario logueado       |
| POST   | \`/api/carts/:cid/products/:pid\` | Agregar producto al carrito    |
| POST   | \`/api/carts/:cid/purchase\`    | Ejecutar compra desde carrito    |
| POST   | \`/api/sessions/reset-request\` | Solicitar cambio de contraseña   |
| POST   | \`/api/sessions/reset-password/:token\` | Resetear contraseña     |

---

## 🛡️ Roles y seguridad

- \`admin\`: Puede crear, modificar y eliminar productos.
- \`user\`: Puede comprar y manejar su carrito.
- Autenticación por \`JWT\` en cookies.
- Protección de rutas vía middleware \`authorizeRole()\`.

---

## 🎨 Estilo de código

Se utiliza **Prettier** para el formateo automático.  
Formatear todo el proyecto con:

\`\`\`bash
npx prettier --write .
\`\`\`

---

## 📌 Notas finales

- Evitar subir \`.env\` o \`node_modules\` al repositorio.
- Recomendado: probar la app como \`admin@coder.com\` para testear permisos.
- Incluye manejo de errores, validaciones y mensajes claros.

---

¿Listo para probarlo? 🚀
