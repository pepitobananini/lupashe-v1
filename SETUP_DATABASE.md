# 🗄️ Guía de Configuración de Base de Datos

Esta guía te ayudará a configurar la base de datos Supabase y ejecutar las migraciones.

## Paso 1: Crear Proyecto en Supabase

1. Ve a [https://supabase.com](https://supabase.com)
2. Inicia sesión o crea una cuenta
3. Haz clic en **"New Project"**
4. Completa el formulario:
   - **Name**: `lupashe-platform` (o el nombre que prefieras)
   - **Database Password**: Crea una contraseña segura (¡guárdala bien!)
   - **Region**: Elige la región más cercana
5. Haz clic en **"Create new project"**
6. Espera 2-3 minutos mientras se crea el proyecto

## Paso 2: Obtener la Connection String

1. En el dashboard de Supabase, ve a **Settings** (⚙️) en el menú lateral
2. Haz clic en **Database**
3. Busca la sección **"Connection string"**
4. Selecciona la pestaña **"URI"**
5. Copia la connection string. Se verá así:
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres
   ```
6. Reemplaza `[YOUR-PASSWORD]` con la contraseña que creaste en el Paso 1

## Paso 3: Configurar Variables de Entorno

1. En el directorio `backend`, crea un archivo `.env`:
   ```bash
   cd backend
   # En Windows PowerShell:
   Copy-Item .env.example .env
   # O en Git Bash/Linux/Mac:
   cp .env.example .env
   ```

2. Abre el archivo `.env` y completa las variables:

   ```env
   DATABASE_URL="postgresql://postgres:TU_PASSWORD@db.xxxxx.supabase.co:5432/postgres?schema=public"
   JWT_SECRET="genera-un-secreto-aleatorio-aqui"
   JWT_REFRESH_SECRET="genera-otro-secreto-aleatorio-aqui"
   PORT=3001
   NODE_ENV=development
   ```

3. **Genera secretos seguros para JWT**:
   - Puedes usar un generador online: [https://randomkeygen.com/](https://randomkeygen.com/)
   - O usar OpenSSL (si lo tienes instalado):
     ```bash
     openssl rand -base64 32
     ```
   - Ejecuta el comando dos veces para obtener dos secretos diferentes

## Paso 4: Instalar Dependencias

```bash
# Desde la raíz del proyecto
npm install

# O si estás en el directorio backend
cd backend
npm install
```

## Paso 5: Generar Cliente de Prisma

```bash
cd backend
npx prisma generate
```

Este comando genera el cliente de Prisma basado en el schema.

## Paso 6: Ejecutar Migraciones

```bash
cd backend
npx prisma migrate dev --name init
```

Este comando:
- Crea todas las tablas en la base de datos
- Crea un historial de migraciones
- Genera el cliente de Prisma

**Nota**: Si te pide un nombre para la migración, usa `init` o cualquier nombre descriptivo.

## Paso 7: Crear Usuario Admin Inicial

```bash
cd backend
npm run seed
```

Esto creará un usuario administrador con:
- **Username**: `admin`
- **Password**: `admin123`
- **Email**: `admin@lupashe.com`
- **Role**: `ADMIN`

⚠️ **IMPORTANTE**: Cambia la contraseña después del primer login.

## Paso 8: Verificar la Conexión (Opcional)

Puedes abrir Prisma Studio para ver y editar la base de datos:

```bash
cd backend
npx prisma studio
```

Esto abrirá una interfaz web en `http://localhost:5555` donde podrás ver todas las tablas.

## ✅ Verificación

Para verificar que todo está funcionando:

1. **Inicia el servidor backend**:
   ```bash
   cd backend
   npm run dev
   ```

2. Deberías ver:
   ```
   🚀 Server running on http://localhost:3001
   ```

3. **Prueba el endpoint de health**:
   ```bash
   curl http://localhost:3001/health
   ```
   
   O abre en tu navegador: `http://localhost:3001/health`

4. Deberías recibir:
   ```json
   {"status":"ok","timestamp":"2024-..."}
   ```

## 🐛 Solución de Problemas

### Error: "Can't reach database server"
- Verifica que la `DATABASE_URL` esté correcta
- Asegúrate de que el proyecto de Supabase esté activo
- Verifica que la contraseña en la URL esté correctamente codificada (usa `%` para caracteres especiales)

### Error: "P1001: Can't reach database server"
- Verifica tu conexión a internet
- Asegúrate de que Supabase no esté en mantenimiento
- Revisa que la región del proyecto sea accesible

### Error: "Migration failed"
- Verifica que no haya migraciones previas conflictivas
- Si es necesario, puedes resetear la base de datos:
  ```bash
  npx prisma migrate reset
  ```
  ⚠️ **CUIDADO**: Esto eliminará todos los datos

### Error: "JWT_SECRET is not defined"
- Asegúrate de que el archivo `.env` exista en `backend/`
- Verifica que todas las variables estén definidas
- Reinicia el servidor después de crear/modificar `.env`

## 📝 Notas Importantes

- El archivo `.env` está en `.gitignore` y **NO** se subirá a Git
- **NUNCA** compartas tus secretos JWT o la contraseña de la base de datos
- Para producción, usa variables de entorno del servidor, no archivos `.env`
- La contraseña de Supabase solo la necesitas para la connection string inicial

## 🚀 Siguiente Paso

Una vez que la base de datos esté configurada, puedes:

1. Iniciar el frontend:
   ```bash
   npm run dev:frontend
   ```

2. Iniciar ambos (backend + frontend):
   ```bash
   npm run dev
   ```

3. Abrir el navegador en `http://localhost:3000` y hacer login con:
   - Username: `admin`
   - Password: `admin123`

