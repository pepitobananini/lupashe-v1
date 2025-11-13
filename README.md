# LUPASHE Platform

Plataforma interna para gestión de Seguridad y Salud en el Trabajo.

## Arquitectura

Monorepo con:
- **Backend**: Node.js + TypeScript + Express + Prisma
- **Frontend**: React + Vite + TypeScript

## Base de Datos

Supabase PostgreSQL (solo como base de datos gestionada, sin autenticación de Supabase).

## Módulos

1. **Plataforma operativa centralizada (ERP interno)**
2. **Automatización de constancias y diplomas**
3. **Digitalización de formularios con OCR + edición humana**
4. **Módulo Door Knocker (prospectos y campañas de correo)**
5. **Generador inteligente de informes técnicos (Beta)**

## Setup

### Prerrequisitos

- Node.js 18+
- PostgreSQL (Supabase)

### Instalación

```bash
# Instalar dependencias del workspace
npm install

# Configurar variables de entorno
cp backend/.env.example backend/.env
# Editar backend/.env con tu DATABASE_URL de Supabase

# Ejecutar migraciones
cd backend
npx prisma migrate dev

# Crear usuario admin inicial (opcional)
npm run seed

# Iniciar desarrollo
cd ..
npm run dev
```

### Variables de Entorno (Backend)

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DBNAME?schema=public"
JWT_SECRET="tu-secret-key-super-segura"
JWT_REFRESH_SECRET="tu-refresh-secret-key"
PORT=3001
NODE_ENV=development
```

## Estructura

```
/
├── backend/          # API Express + Prisma
│   ├── src/
│   │   ├── modules/  # Módulos por funcionalidad
│   │   ├── middleware/
│   │   └── utils/
│   └── prisma/
├── frontend/         # React + Vite
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   └── utils/
└── package.json
```

## Autenticación

- Login con `username` + `password`
- JWT + Refresh Tokens
- Roles: ADMIN, CONSULTOR, CAPACITADOR, ADMINISTRATIVO

## Desarrollo

```bash
# Backend solo
npm run dev:backend

# Frontend solo
npm run dev:frontend

# Ambos
npm run dev
```

## Primer Usuario

Después de ejecutar las migraciones, puedes crear el primer usuario administrador de dos formas:

### Opción 1: Script de Seed (Recomendado)
```bash
cd backend
npm run seed
```

Esto creará un usuario admin con:
- Username: `admin`
- Password: `admin123`
- Email: `admin@lupashe.com`
- Role: `ADMIN`

⚠️ **Importante**: Cambia la contraseña después del primer login.

### Opción 2: Endpoint de Registro
```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "admin123",
    "email": "admin@lupashe.com",
    "role": "ADMIN"
  }'
```

## Endpoints API

### Autenticación
- `POST /api/auth/login` - Login con username y password
- `POST /api/auth/register` - Registrar nuevo usuario (solo ADMIN)
- `POST /api/auth/refresh` - Refrescar access token

### Usuarios (Requiere ADMIN)
- `GET /api/users` - Listar todos los usuarios
- `GET /api/users/:id` - Obtener usuario por ID
- `POST /api/users` - Crear nuevo usuario
- `PUT /api/users/:id` - Actualizar usuario
- `DELETE /api/users/:id` - Eliminar usuario

### Clientes (Requiere autenticación)
- `GET /api/clients` - Listar todos los clientes
- `GET /api/clients/:id` - Obtener cliente por ID
- `POST /api/clients` - Crear nuevo cliente
- `PUT /api/clients/:id` - Actualizar cliente
- `DELETE /api/clients/:id` - Eliminar cliente

### Proyectos (Requiere autenticación)
- `GET /api/projects` - Listar todos los proyectos
- `GET /api/projects/:id` - Obtener proyecto por ID
- `GET /api/projects/client/:clientId` - Obtener proyectos por cliente
- `POST /api/projects` - Crear nuevo proyecto
- `PUT /api/projects/:id` - Actualizar proyecto
- `DELETE /api/projects/:id` - Eliminar proyecto

## Tecnologías

### Backend
- **Node.js** - Runtime
- **TypeScript** - Lenguaje
- **Express** - Framework web
- **Prisma** - ORM
- **JWT** - Autenticación
- **Zod** - Validación
- **bcryptjs** - Hash de contraseñas

### Frontend
- **React** - Framework UI
- **TypeScript** - Lenguaje
- **Vite** - Build tool
- **React Router** - Routing
- **Axios** - HTTP client

## Próximos Pasos

Los siguientes módulos están pendientes de implementación:
- Capacitaciones y Constancias
- Formularios con OCR
- Door Knocker (Prospección)
- Generador de Informes Técnicos

