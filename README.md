# EcoSwap con React
## Descripción del Proyecto
EcoSwap es una Aplicación de Página Única (SPA) desarrollada con React.js y estilizada con estilos en línea. Su objetivo principal es ofrecer una interfaz amigable para que los usuarios puedan intercambiar ropa usada de forma sencilla, sostenible y económica. La aplicación está diseñada para ser intuitiva, responsiva y accesible, permitiendo a los usuarios explorar artículos, reservar prendas, gestionar su perfil y canjear puntos de manera segura con autenticación basada en JWT.

---
## Objetivos Técnicos y de Diseño
- **Construir una SPA:** Desarrollar la interfaz completa de EcoSwap usando React.js.
- **Implementar Autenticación:** Manejar el flujo de Login y Registro y la persistencia de sesión mediante un Token JWT.
- **Consumir API REST:** Conectar los componentes a la API del backend para realizar operaciones CRUD sobre artículos y reservas.
- **Usabilidad y Sostenibilidad:** Crear una experiencia de usuario clara, accesible y divertida, enfocada en la moda circular.
- **Estandarización de Estilos:** Utilizar Tailwind CSS para un diseño rápido, modular y responsive.

---
## Tecnologías Utilizadas
- **Framework Frontend:** React.js
- **Lenguaje:** JavaScript
- **Estilización:** Tailwinds
- **Comunicación con API:** Axios o Fetch para conectarse con la API de Spring Boot

---
## Requisitos Funcionales
- Estos requisitos describen las acciones que el usuario debe poder realizar en la interfaz de EcoSwap:
- **Autenticación Segura:** El usuario puede registrarse e iniciar sesión para obtener un Token JWT.
- **Gestión de Sesión:** El sistema debe permitir cerrar sesión e invalidar el token.
- **Explorar Artículos:** Mostrar todos los artículos disponibles, con filtros por categoría y fecha.
- **Visualización Detallada:** Ver cada artículo con imagen, descripción, estado, categoría y puntos a ganar.
- **Creación de Artículos:** Permitir a los usuarios registrados crear nuevos artículos para intercambiar.
- **Edición y Eliminación de Artículos:** Permitir a los usuarios modificar o eliminar únicamente sus propios artículos.
- **Reservas de Artículos:** Permitir a los usuarios reservar artículos disponibles y cancelar reservas si lo desean.
- **Gestión de Puntos:** Visualizar los puntos ganados al entregar prendas y canjearlos por otras prendas.

---
## Requisitos No Funcionales
- Estos requisitos definen los estándares de calidad, seguridad y diseño de la aplicación:
- **Autenticación por Token:** Todos los endpoints que requieren acciones sobre artículos o perfil requieren un JWT válido.
- **Control de Propiedad:** Un usuario solo puede modificar o eliminar sus propios artículos y reservas.
- **Diseño Responsivo:** La interfaz debe adaptarse a cualquier dispositivo y mantener alta legibilidad y accesibilidad.
- **Estilo Consistente:** Tailwinds

---
## Metodología
- El proyecto fue desarrollado de forma individual (Desarrollador Full-Stack y Product Owner) bajo un sprint ágil de dos semanas. El proceso se enfocó en:
- **Definición de Requisitos:** Historias de usuario desglosadas por funcionalidad (Artículos, Reservas, Puntos, Auth).
- **Diseño UI/UX:** Implementación de una interfaz intuitiva, responsiva y accesible con Tailwinds  .
- **Conexión API:** Integración de la autenticación y operaciones CRUD con el backend Spring Boot.

## Pasos para Iniciar
### 1. Clonar el repositorio
```bash
git clone https://github.com/Usuario/EcoSwap-Frontend.git
cd EcoSwap-Frontend
```
### 2. Instalar las dependencias
```bash
npm install
```
### 3. Iniciar el servidor de desarrollo
```bash
npm run dev
```
### 4. Abrir la aplicación en tu navegador
- **http://localhost:5173** 
(o el puerto indicado por el terminal)

## Desarrolladora
| Nombre | GitHub | LinkedIn |
|--------|--------|----------|
| **Sofia Toro** | [@sofiatoroviafara01](https://github.com/sofiatoroviafara01) | [Sofía Toro Viafara](https://www.linkedin.com/in/sof%C3%ADa-toro-viafara-690124356/) |

---
