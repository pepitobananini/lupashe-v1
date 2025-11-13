# 🚀 Frontend Demo - LUPASHE Platform

El frontend está configurado para funcionar **sin necesidad de base de datos o backend**. Usa datos mock (simulados) para demostración.

## Inicio Rápido

### 1. Instalar Dependencias

```bash
cd frontend
npm install
```

### 2. Iniciar el Servidor de Desarrollo

```bash
cd frontend
npm run dev
```

O desde la raíz del proyecto:

```bash
npm run dev:frontend
```

### 3. Abrir en el Navegador

El frontend estará disponible en: **http://localhost:3000**

## Login Demo

En modo demo, puedes usar **cualquier usuario y contraseña** para iniciar sesión.

Ejemplos:
- Usuario: `admin` / Contraseña: `admin123`
- Usuario: `test` / Contraseña: `test`
- Usuario: `demo` / Contraseña: `demo`

## Características Disponibles

✅ **Dashboard** - Vista general con estadísticas
- Clientes
- Proyectos activos
- Capacitaciones
- Constancias
- Formularios

✅ **Clientes** - Gestión completa de clientes
- Listar clientes
- Crear nuevo cliente
- Editar cliente
- Eliminar cliente

✅ **Proyectos** - Gestión de proyectos
- Listar proyectos
- Crear nuevo proyecto
- Editar proyecto
- Eliminar proyecto
- Filtrar por cliente

✅ **Usuarios** (solo ADMIN)
- Listar usuarios
- Crear usuario
- Editar usuario
- Eliminar usuario

## Datos de Demostración

El sistema incluye datos de ejemplo:
- 3 Clientes
- 3 Proyectos
- 3 Usuarios
- Estadísticas simuladas

Todos los datos se guardan en memoria (localStorage) y se perderán al recargar la página.

## Modo Demo vs Producción

El frontend está configurado para:
1. Intentar conectar con el backend real (si está disponible)
2. Si falla, usar automáticamente datos mock
3. Funcionar completamente sin backend

Cuando conectes el backend real, simplemente inicia el servidor backend y el frontend se conectará automáticamente.

## Estructura del Frontend

```
frontend/
├── src/
│   ├── components/     # Componentes reutilizables
│   ├── pages/          # Páginas principales
│   ├── context/        # Context API (Auth)
│   ├── utils/          # Utilidades (API, mocks)
│   └── App.tsx         # Componente principal
├── package.json
└── vite.config.ts
```

## Tecnologías

- **React 18** - Framework UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool rápido
- **React Router** - Navegación
- **Axios** - Cliente HTTP
- **CSS Modules** - Estilos

## Próximos Pasos

Una vez que tengas el backend configurado:
1. El frontend se conectará automáticamente
2. Los datos mock dejarán de usarse
3. Todo funcionará con datos reales de la base de datos

## Notas

- Los datos mock se guardan en memoria del navegador
- Al recargar la página, los datos nuevos se perderán (en modo demo)
- El login funciona con cualquier credencial en modo demo
- El frontend está completamente funcional para demostración

