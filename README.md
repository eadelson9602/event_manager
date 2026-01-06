# Event Manager - Frontend

Desktop application developed with Next.js for corporate event management.

## Architecture

The project implements **Hexagonal Architecture** with the following layers:

- **Domain**: Entities and repository interfaces
- **Application**: Use cases and services
- **Infrastructure**: HTTP implementations, configuration
- **Presentation**: Components, pages, stores (Zustand)

## Requirements

- Node.js 18+
- npm or yarn

## Installation

```bash
npm install
```

## Configuration

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

If `NEXT_PUBLIC_API_URL` is not defined, `http://localhost:3000` will be used by default.

## Execution

### Development

```bash
npm run dev
```

The application will be available at `http://localhost:3001` (or the port defined in `PORT` in `.env.local`).

### Production

```bash
npm run build
npm start
```

## Testing

The project uses **Jest** and **React Testing Library** for testing.

### Run Tests

Run all tests:

```bash
npm test
```

### Watch Mode

Run tests in watch mode (automatically re-runs tests on file changes):

```bash
npm run test:watch
```

### Coverage

Generate test coverage report:

```bash
npm run test:coverage
```

The coverage report will show which parts of the codebase are covered by tests.

## Project Structure

```
event_maganer/
├── app/                          # Next.js App Router
│   ├── login/                    # Login screen
│   ├── register/                 # Registration screen
│   ├── events/                   # Event screens
│   │   ├── page.tsx              # Event list
│   │   ├── new/                  # Create event
│   │   └── [id]/                 # Detail and edit
│   └── layout.tsx
├── src/
│   ├── domain/                   # Domain layer
│   │   ├── entities/             # Domain entities
│   │   └── repositories/         # Repository interfaces
│   ├── application/              # Application layer
│   │   ├── use-cases/            # Use cases
│   │   └── services/            # Application services
│   ├── infrastructure/           # Infrastructure layer
│   │   ├── config/               # Configuration
│   │   ├── http/                 # HTTP client
│   │   └── repositories/         # Repository implementations
│   └── presentation/            # Presentation layer
│       ├── components/           # Reusable components
│       └── stores/                # Zustand stores
└── public/                       # Static files
```

### State Management

- **Zustand** for state management
- Separate stores for authentication and events
- Loading and error state handling

### Authentication

- JWT stored in `localStorage`
- Route protection with `ProtectedRoute`
- Automatic redirection based on authentication state

### Error Handling

- Error alerts visible to users
- Client-side form validation
- Server error messages
- Toast notifications for success and error actions

### Toast Notifications

- Success toasts for:
  - User registration
  - User login
  - Event creation
  - Event update
  - Event deletion
- Error toasts for failed operations

## Technologies

- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS v4**
- **Zustand** (State Management)
- **Sonner** (Toast Notifications)
- **Fetch API** (HTTP Client)
- **shadcn/ui** (UI Components)
- **Jest** (Testing Framework)
- **React Testing Library** (Component Testing)

## Environment Variables

- `NEXT_PUBLIC_API_URL`: Base URL of the API (default: `http://localhost:3000`)
- `PORT`: Development server port (default: `3000`)

## Notes

- The application requires the backend to be running on the configured port
- All event routes require JWT authentication
- The token is stored in `localStorage` and automatically included in requests
- Toast notifications provide user feedback for all major actions
