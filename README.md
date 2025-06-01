# Nuxt App con Hono Server y Bun

Este proyecto es una aplicación **Nuxt 3** que utiliza un servidor backend con **Hono** y se ejecuta con **Bun**. Incluye dependencias como **Pinia**, **TailwindCSS**, **MySQL2**, **Sequelize** y más.

## 📦 Requisitos previos

- [Bun](https://bun.sh/docs/installation) instalado globalmente:

  ```bash
  curl -fsSL https://bun.sh/install | bash
  ```

- Base de datos MySQL o compatible configurada.

## 🚀 Instalación

1. **Clona el repositorio:**

   ```bash
   git clone <REPO_URL>
   cd gd-qa-evaluation
   ```

2. **Instala las dependencias:**

   ```bash
   bun install
   ```

3. **Configura las variables de entorno:**

   Crea un archivo `.env` en la raíz del proyecto y define tus variables (p. ej., credenciales de base de datos).

   ```env
    DB_HOST = 
    DB_PORT = 
    DB_USERNAME = 
    DB_PASSWORD = 
    DB_NAME = 
    SECRET_KEY = nuxtsecretgdevaluation
    NITRO_PORT=3001
    NUXT_PUBLIC_API_URL= 
    NUXT_UI_PRO_LICENSE = 
   ```

   O utiliza el comando:

   ```bash
   cp .env.example .env
   ```

   para copiar todo el contenido del `.env.example` y configurarlo según tus credenciales.

## 🏃‍♂️ Ejecución en desarrollo

Para levantar tanto el servidor Hono como el frontend Nuxt en paralelo:

```bash
bun run dev
```

Esto ejecutará:

- `dev:server`: El servidor backend Hono (`bun run server/src/app.ts`).
- `dev:frontend`: El servidor de desarrollo de Nuxt (`nuxt dev`).

## ⚙️ Scripts disponibles

- `bun run dev:server`: Levanta solo el servidor Hono.
- `bun run dev:frontend`: Levanta solo el frontend Nuxt.
- `bun run dev`: Levanta ambos en paralelo (usando `concurrently`).
- `bun run build`: Compila el proyecto para producción.
- `bun run generate`: Genera un sitio estático (si aplica).
- `bun run preview`: Previsualiza la versión de producción.

## 💡 Notas

- **Base de datos:** Asegúrate de tener la base de datos y las credenciales correctas en `.env`.
- **Eslint y estilo:** El proyecto incluye ESLint y TailwindCSS para estilo y calidad de código.
- **Plugins Nuxt:** Se incluyen módulos como `@nuxt/content`, `@nuxt/fonts`, `@nuxt/image`, y `@nuxt/ui-pro` para enriquecer la experiencia de desarrollo.

## 🛠️ Construcción para producción

```bash
bun run build
```

Luego, para previsualizar el sitio generado:

```bash
bun run preview
```

## 🧪 Escenarios de pruebas end to end

Como parte de la verificación de calidad, se deben preparar los siguientes escenarios para pruebas **end to end**:

1. Registrarse con una nueva cuenta de prueba.
2. Iniciar sesión con la nueva cuenta.
3. Cargar el perfil de usuario.
4. Cambiar la contraseña.
5. Cerrar sesión.
6. Iniciar sesión con la nueva contraseña.
7. Actualizar el nombre de perfil.
8. Verificar que el nombre se actualizó en la barra de acciones del usuario.
9. Cerrar sesión.
10. Intentar iniciar sesión con una cuenta que no esté registrada (y validar que se muestra el mensaje de error).

## 🧪 Pruebas unitarias y E2E

Además, es necesario implementar:

- **Pruebas unitarias en el backend** usando **Jest**.
- **Pruebas end to end (E2E)** en el frontend usando **Cypress**.

---