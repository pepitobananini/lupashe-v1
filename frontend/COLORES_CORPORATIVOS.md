# 🎨 Colores Corporativos LUPASHE - Implementación

Este documento describe la implementación de los colores corporativos oficiales de LUPASHE en el frontend.

## Paleta de Colores

### Colores Primarios Institucionales

1. **Azul Institucional**
   - HEX: `#001689`
   - RGB: R=0 G=22 B=137
   - Uso: Botones primarios, headers, sidebars, navegación, elementos de obligación
   - Variable CSS: `--lupashe-blue`
   - Hover: `--lupashe-blue-dark` (#001155)

2. **Verde Institucional**
   - HEX: `#558236`
   - RGB: R=85 G=130 B=54
   - Uso: Botones secundarios, acciones positivas, estados de éxito, zonas de seguridad
   - Variable CSS: `--lupashe-green`
   - Hover: `--lupashe-green-dark` (#3d5f28)

### Colores de Texto

3. **Negro 85%**
   - RGBA: `rgba(0, 0, 0, 0.85)`
   - Uso: Textos primarios, encabezados, alto contraste
   - Variable CSS: `--lupashe-text-primary`

4. **Negro 61%**
   - RGBA: `rgba(0, 0, 0, 0.61)`
   - Uso: Textos secundarios, bordes suaves, UI sutil
   - Variable CSS: `--lupashe-text-secondary`

## Archivo de Variables

Todas las variables están definidas en: `frontend/src/styles/variables.css`

## Uso en Componentes

### Botones

- **Botones Primarios**: `var(--lupashe-blue)`
- **Botones Secundarios/Positivos**: `var(--lupashe-green)`
- **Hover**: Tonos más oscuros de los mismos colores

### Navegación

- **Sidebar**: `var(--lupashe-blue)`
- **Links activos**: `var(--lupashe-green)`
- **Hover**: `var(--lupashe-blue-dark)`

### Tablas

- **Headers**: `var(--lupashe-blue)`
- **Texto**: `var(--lupashe-text-primary)`
- **Bordes**: `var(--lupashe-border)`

### Tarjetas y Fondos

- **Fondo principal**: `var(--lupashe-bg-gray)`
- **Tarjetas**: `var(--lupashe-bg-white)`
- **Sombras**: Solo sombras neutras muy suaves

### Estados

- **Activo/Éxito**: Verde institucional
- **Pausado**: Gris neutro
- **Completado**: Azul institucional
- **Cancelado**: Negro

## Reglas de Uso

✅ **PERMITIDO:**
- Usar solo los colores definidos en la paleta
- Variaciones de opacidad para fondos y overlays
- Sombras neutras muy suaves
- Tonos más oscuros para hover (dentro de la misma familia de color)

❌ **PROHIBIDO:**
- Modificar saturación, brillo o tono de los colores corporativos
- Usar colores fuera del esquema azul/verde/negro
- Sombras de colores
- Grises no especificados en el manual

## Estilo General

- **Profesional**: Diseño serio y empresarial
- **Limpio**: Espacios en blanco bien utilizados
- **Corporativo**: Alineado con identidad de marca
- **Coherente**: Consistencia en toda la plataforma

## Componentes Actualizados

- ✅ Layout (Sidebar, Navegación)
- ✅ Login
- ✅ Dashboard
- ✅ Clientes
- ✅ Proyectos
- ✅ Usuarios
- ✅ Logo

Todos los componentes usan las variables CSS para mantener consistencia y facilitar futuros cambios.

