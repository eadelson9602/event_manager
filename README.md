# Event Manager - Frontend

Aplicación de escritorio desarrollada con Next.js para la gestión de eventos corporativos.

## Arquitectura

El proyecto implementa **Arquitectura Hexagonal** con las siguientes capas:

- **Domain**: Entidades y interfaces de repositorios
- **Application**: Casos de uso y servicios
- **Infrastructure**: Implementaciones HTTP, configuración
- **Presentation**: Componentes, páginas, stores (Zustand)

## Requisitos

- Node.js 18+ 
- npm o yarn

## Instalación

```bash
npm install
```

## Configuración

Crea un archivo `.env.local` en la raíz del proyecto:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

Si no defines `NEXT_PUBLIC_API_URL`, se usará `http://localhost:3000` por defecto.

## Ejecución

### Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3001` (o el puerto definido en `PORT` en `.env.local`).

### Producción

```bash
npm run build
npm start
```

## Estructura del Proyecto

```
event_maganer/
├── app/                          # Next.js App Router
│   ├── login/                    # Pantalla de login
│   ├── register/                 # Pantalla de registro
│   ├── events/                   # Pantallas de eventos
│   │   ├── page.tsx              # Lista de eventos
│   │   ├── new/                  # Crear evento
│   │   └── [id]/                 # Detalle y edición
│   └── layout.tsx
├── src/
│   ├── domain/                   # Capa de dominio
│   │   ├── entities/             # Entidades del dominio
│   │   └── repositories/         # Interfaces de repositorios
│   ├── application/              # Capa de aplicación
│   │   ├── use-cases/            # Casos de uso
│   │   └── services/             # Servicios de aplicación
│   ├── infrastructure/           # Capa de infraestructura
│   │   ├── config/               # Configuración
│   │   ├── http/                 # Cliente HTTP
│   │   └── repositories/         # Implementaciones de repositorios
│   └── presentation/            # Capa de presentación
│       ├── components/           # Componentes reutilizables
│       └── stores/                # Stores de Zustand
└── public/                       # Archivos estáticos
```

## Características

### Pantallas Implementadas

1. **Login Screen** (`/login`)
   - Campos: Email y Contraseña
   - Validación de campos obligatorios
   - Manejo de errores

2. **Registration Screen** (`/register`)
   - Campos: Nombre, Email y Contraseña
   - Validación de contraseña (mínimo 8 caracteres, mayúscula, número, carácter especial)
   - Manejo de errores

3. **Event List Screen** (`/events`)
   - Lista todos los eventos
   - Muestra nombre y fecha de cada evento
   - Botón flotante para crear nuevo evento
   - Navegación al detalle al hacer clic

4. **Event Detail Screen** (`/events/[id]`)
   - Muestra todos los detalles del evento
   - Botones para Editar y Eliminar
   - Confirmación antes de eliminar

5. **Add/Edit Event Screen** (`/events/new` y `/events/[id]/edit`)
   - Formulario con campos: nombre, fecha, descripción, lugar
   - Selector de fecha y hora
   - Validación de campos obligatorios
   - Guardado y redirección a la lista

### State Management

- **Zustand** para gestión de estado
- Stores separados para autenticación y eventos
- Manejo de estados de carga y errores

### Autenticación

- JWT almacenado en `localStorage`
- Protección de rutas con `ProtectedRoute`
- Redirección automática según estado de autenticación

### Manejo de Errores

- Alertas de error visibles al usuario
- Validación de formularios en cliente
- Mensajes de error del servidor

## Tecnologías

- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS v4**
- **Zustand** (State Management)
- **Fetch API** (HTTP Client)

## Variables de Entorno

- `NEXT_PUBLIC_API_URL`: URL base de la API (default: `http://localhost:3000`)
- `PORT`: Puerto del servidor de desarrollo (default: `3000`)

## Notas

- La aplicación requiere que el backend esté ejecutándose en el puerto configurado
- Todas las rutas de eventos requieren autenticación JWT
- El token se almacena en `localStorage` y se incluye automáticamente en las peticiones
