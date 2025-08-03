# Íconos SVG Centralizados

Este directorio contiene todos los íconos SVG del proyecto convertidos a componentes React usando SVGR.

## Íconos Disponibles

- `Moon` - Ícono de luna (modo oscuro)
- `Sun` - Ícono de sol (modo claro)  
- `ArrowUp` - Flecha hacia arriba

## Cómo Usar

```tsx
import { Moon, Sun, ArrowUp } from '../icons';

// Uso básico
<Moon className="w-4 h-4" />

// Con clases de Tailwind para colores
<Sun className="w-4 h-4 text-white" />

// Con clases dinámicas
<ArrowUp className={`w-[9px] h-[11px] ${theme === 'dark' ? 'text-[#555555]' : 'text-gray-700'}`} />
```

## Agregar Nuevos Íconos

1. Coloca el archivo SVG en `src/assets/svg/`
2. Ejecuta `npm run svg` para convertir automáticamente a componentes React
3. Los componentes se generarán en `src/components/icons/`
4. El archivo `index.ts` se actualizará automáticamente con las exportaciones

## Características

- Todos los íconos usan `fill="currentColor"` para heredar el color del texto
- Son componentes TypeScript con tipado completo
- Compatibles con Tailwind CSS
- Optimizados para React 