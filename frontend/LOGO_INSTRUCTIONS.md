# 📸 Instrucciones para Agregar el Logo

El logo de lupaSHE ya está integrado en la aplicación. Solo necesitas agregar tu imagen.

## Cómo Agregar tu Logo

1. **Coloca tu imagen del logo** en la carpeta `frontend/public/`
2. **Nombra el archivo**: `logo.png` (o `logo.jpg`, `logo.svg`)
3. **Formato recomendado**: PNG con fondo transparente
4. **Tamaño recomendado**: 
   - Mínimo: 400x200px para buena calidad
   - Ideal: 800x400px para alta resolución

## Ubicación del Archivo

```
frontend/
└── public/
    └── logo.png  ← Coloca tu logo aquí
```

## Dónde Aparece el Logo

El logo se muestra en:
- ✅ **Página de Login** - Logo grande con tagline
- ✅ **Sidebar** - Logo pequeño en la navegación
- ✅ **Futuras páginas** - Puedes agregarlo donde necesites

## Si no tienes la imagen

Si no agregas la imagen, la aplicación mostrará automáticamente un logo SVG basado en el diseño de lupaSHE con:
- "lupa" en azul oscuro (#1E3A8A)
- "SHE" en verde (#4CAF50)
- Lupa verde con el tagline "Tu seguridad en nuestras manos"

## Actualizar el Logo

Si quieres cambiar el logo:
1. Reemplaza el archivo en `frontend/public/logo.png`
2. Recarga la página (o reinicia el servidor de desarrollo)

## Formatos Soportados

- PNG (recomendado)
- JPG/JPEG
- SVG
- WebP

El componente Logo detecta automáticamente el formato y lo muestra correctamente.

