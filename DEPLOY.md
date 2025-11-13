# Guía de Deploy en Vercel

## 1. Push a GitHub

Si ya tienes el repositorio creado en GitHub, ejecuta:

```bash
git remote add origin https://github.com/TU-USUARIO/lupashe-v1.git
git push -u origin main
```

## 2. Deploy en Vercel

### Opción A: Desde la Web de Vercel

1. Ve a [https://vercel.com](https://vercel.com) e inicia sesión con GitHub
2. Click en "Add New Project"
3. Importa tu repositorio `lupashe-v1`
4. Configuración del proyecto:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

5. Variables de entorno (si las necesitas):
   - `VITE_API_URL`: URL de tu backend (opcional, puede quedar vacío para usar mocks)

6. Click en "Deploy"

### Opción B: Desde la CLI de Vercel

```bash
npm i -g vercel
cd frontend
vercel
```

## 3. Configuración del Backend (Opcional)

Si quieres deployar también el backend:

1. Puedes usar Railway, Render, o cualquier servicio de Node.js
2. Configura las variables de entorno:
   - `DATABASE_URL`
   - `JWT_SECRET`
   - `JWT_REFRESH_SECRET`
   - `PORT`
   - `NODE_ENV=production`

3. Actualiza `VITE_API_URL` en Vercel con la URL de tu backend deployado

## Notas

- El frontend funciona completamente con datos mock si no hay backend
- Para producción, asegúrate de configurar las variables de entorno correctamente
- Vercel deployará automáticamente en cada push a `main`

