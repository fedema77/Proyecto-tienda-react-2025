# Luz de Hoja · Plant Boutique 🌿

Tienda online desarrollada en **React JS** como proyecto del curso **ReactJS – 2C 2025 (Talento Tech)**.

La app simula una tienda boutique de plantas con:

- Catálogo con paginación.
- Detalle de producto (single product page).
- Carrito de compras.
- Autenticación con dos tipos de usuarios (Admin y Cliente).
- Panel de administración con **CRUD de productos** (crear, editar, eliminar) mediante un formulario modal.
- Mensajes emergentes con **React Toastify**.
- Diseño **mobile-first**, minimalista, tonos claros y estética de vivero premium.

---

## 🧱 Stack tecnológico

- **React JS** (con Vite)
- **React Router DOM** – enrutamiento y rutas protegidas.
- **Context API + Hooks** – estado global de autenticación, carrito y productos.
- **React Toastify** – notificaciones.
- **React Icons** – iconos del carrito.
- **CSS puro** – mobile-first, con paleta en tonos blanco, verde y tierra.

---

## 👤 Usuarios de prueba

Existen dos usuarios fijos para probar autenticación y roles:

### Admin
- **Usuario:** `Admin`  
- **Contraseña:** `admin`  
- Rol: administrador (`admin`)  
- Acceso:
  - Puede ingresar a `/admin` (panel de gestión).
  - Puede crear, editar y eliminar productos.

### Cliente (Marta)
- **Usuario:** `Marta`  
- **Contraseña:** `marta`  
- Rol: cliente (`customer`)  
- Acceso:
  - Puede navegar el catálogo.
  - Puede agregar productos al carrito (una vez logueada).
  - No puede acceder al panel `/admin`.

---

## 🔍 Funcionalidades principales

### 1. Catálogo de productos

- Página principal `/`:
  - Muestra el catálogo completo de plantas.
  - El listado está paginado (ej: 6 productos por página).
  - Cada producto se muestra como **card** con:
    - Imagen
    - Nombre
    - Descripción corta
    - Precio
    - Botón **"Ver más"**

### 2. Detalle de producto (Single Product Page)

- Ruta: `/producto/:id`
- Muestra:
  - Imagen ampliada
  - Nombre
  - Descripción
  - Precio
  - Botón **"Agregar al carrito"**

Reglas:
- La vista del producto es **pública** (no requiere login).
- Al hacer click en **"Agregar al carrito"**:
  - Si el usuario **NO está logueado**:
    - Se muestra un toast informando que debe iniciar sesión.
    - Se redirige a `/login`, recordando la ruta de origen.
  - Si el usuario **está logueado**:
    - Se agrega el producto al carrito.
    - Se muestra toast de éxito.

---

### 3. Carrito de compras

- Ruta: `/carrito` (ruta **protegida**).
- Muestra:
  - Listado de ítems del carrito (imagen, nombre, cantidad, subtotal).
  - Total de la compra.
  - Botón **"Quitar"** por producto.
  - Botón **"Vaciar carrito"** (limpia todos los ítems).

Acceso:
- Solo usuarios logueados (Admin o Marta).
- Si no está logueado y va a `/carrito`:
  - Es redirigido a `/login` con un mensaje de “necesitás iniciar sesión”.

Indicadores visuales:
- Icono de carrito en el header con badge que muestra el número total de ítems.
- Botón flotante en la esquina inferior derecha con ícono de bolsa y contador, que lleva a `/carrito`.

---

### 4. Autenticación y roles (Context API)

#### Contexto: `AuthContext`

Maneja:

- `user`: usuario actual.
- `isAuth`: booleano (logueado o no).
- `isAdmin`: booleano (rol admin o no).
- `login(username, password)`: valida usuario contra un listado fijo (`Admin/admin` y `Marta/marta`).
- `logout()`: cierra sesión.

El usuario se persiste en `localStorage` para mantener la sesión entre recargas.

#### Página de Login

- Ruta: `/login`
- Formulario con:
  - Usuario
  - Contraseña
- Mensajes:
  - Error en credenciales (toast).
  - Bienvenida al ingresar (toast).
- Redirección:
  - Si el usuario llegó desde una ruta protegida (ej: `/carrito` o `/producto/:id` al agregar):
    - Una vez logueado, vuelve a esa ruta de origen.
  - Si no, vuelve a `/`.

---

### 5. Rutas protegidas

Componente: `ProtectedRoute`

- Envuelve contenido que requiere:
  - Solo login (`/carrito`)
  - Login + rol admin (`/admin` con `requireAdmin`)

Comportamiento:

- Si no está autenticado:
  - Redirige a `/login`, guardando en el estado la ruta de origen.
- Si requiere admin y el usuario no lo es:
  - Redirige a `/` con una razón.
  - En `Home` se puede mostrar un toast explicando que solo Admin puede ingresar.

---

### 6. Panel de administración (CRUD) 🛠

- Ruta: `/admin` (solo usuario Admin).
- Muestra:
  - Listado de todos los productos.
  - Cada item con imagen, nombre y precio.
  - Botones:
    - **Editar**
    - **Eliminar**
- Botón **"Nuevo producto"** que abre un formulario modal.

#### Formulario modal (`ProductFormModal`)

Permite:

- Crear productos nuevos.
- Editar productos existentes.

Campos:
- Nombre
- Precio (numérico)
- Descripción
- URL de imagen (se carga como string, por URL externa)

Validaciones básicas:
- Todos los campos obligatorios.
- Precio > 0.

Al guardar:
- Si es nuevo: se llama a `createProduct`.
- Si es edición: se llama a `updateProduct`.
- Se muestra un toast de éxito.

Eliminar producto:
- Pide confirmación `confirm(...)`.
- Si se acepta, llama a `deleteProduct`.
- Toast de “Producto eliminado”.

---

### 7. Manejo de estado global

#### `ProductsContext`

- `products`: array de productos.
- `createProduct(data)`: agrega un nuevo producto al catálogo.
- `updateProduct(id, data)`: actualiza un producto existente.
- `deleteProduct(id)`: lo elimina.
- `getProductById(id)`: busca un producto por id (usando comparación segura string-string).

#### `CartContext`

- `items`: array de ítems en el carrito `{ id, name, imageUrl, price, quantity }`.
- `addToCart(product)`: si ya existe, incrementa cantidad; si no, agrega nuevo.
- `removeFromCart(id)`: elimina un ítem del carrito.
- `clearCart()`: vacía todo el carrito.
- `totalCount`: suma de cantidades.
- `totalAmount`: total calculado en ARS.

---

### 8. Diseño y UX

- Estilo **mobile-first**, con un contenedor centrado y ancho máximo limitado.
- Paleta:
  - Fondo claro y suave.
  - Verdes y tonos tierra en detalles.
  - Dominancia de blanco, sombras suaves y bordes redondeados.
- Header sticky con logo de marca:
  - **“Luz de Hoja”**
  - Subtítulo: “Plant Boutique”
- Footer minimalista:
  - Links a “Términos y condiciones” y “Políticas de privacidad”.
  - Texto: `© 2025 · Luz de Hoja · Plant Boutique`

---

## 🗺 Rutas principales

- `/` → Home (catálogo + paginación)
- `/producto/:id` → Detalle de producto (single product page)
- `/carrito` → Carrito (protegida, requiere login)
- `/login` → Login de usuarios
- `/admin` → Panel de administración (protegida, requiere rol Admin)
- `*` → Página 404 simple (NotFound)

---

## 🛠 Scripts disponibles

En la raíz del proyecto:

```bash
# Instalar dependencias
npm install

# Levantar el servidor de desarrollo
npm run dev

# Build de producción
npm run build

# Vista previa del build
npm run preview
