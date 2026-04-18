# Web

Frontend del ecommerce de ReWo.

## Stack sugerido

- `React`
- `Vite`
- `TypeScript`
- `Tailwind CSS`

## Pantallas sugeridas

- Home
- Catalogo
- Detalle de producto
- Carrito
- Checkout
- Login admin
- Dashboard admin

## Variables de entorno

- `VITE_API_URL`: URL base del backend FastAPI

## Correr en local

Desde la raiz del proyecto:

```powershell
npm run dev:web
```

O desde `apps/web`:

```powershell
npm run dev
```

## Estado actual

- Las pantallas ya consumen una capa de datos compartida.
- Si el backend no responde, el frontend usa datos demo locales.
- Esto permite avanzar visualmente sin bloquear el desarrollo.

## PWA (Progressive Web App)

La aplicación está configurada como una PWA para ofrecer una experiencia nativa en dispositivos móviles.

### Características implementadas:
- **Manifest**: Ubicado en `public/manifest.json`, define el nombre, colores e iconos (`192x192` y `512x512`).
- **Service Worker**: Ubicado en `public/sw.js`, maneja el cacheo básico para funcionamiento offline y carga rápida.
- **Invitación de Instalación**:
  - **Android/Chrome**: Utiliza el evento `beforeinstallprompt` para mostrar un banner personalizado (`PWAInstallPrompt.tsx`) que permite instalar la app con un clic.
  - **iOS/Safari**: Detecta el dispositivo y muestra una guía visual para agregar la app a la pantalla de inicio mediante el menú de compartir.

### Requisitos para Producción:
- La aplicación **debe** servirse a través de HTTPS para que el navegador habilite las funciones de PWA.
- Los navegadores suelen requerir que el usuario interactúe con la página antes de mostrar el prompt de instalación.
