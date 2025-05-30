# Captcha Challenge 

## Project Overview
This is a modern React application built with TypeScript and Vite, focusing on implementing a captcha challenge system. The project uses cutting-edge technologies and follows current best practices for React development.

## Tech Stack
- **Frontend Framework**: React 19.1.0
- **Build Tool**: Vite 6.3.5
- **Language**: TypeScript 5.8.3
- **Styling**: TailwindCSS 4.1.7
- **Development Environment**: Node.js with npm/yarn

## Project Structure
```
captcha-challenge/
├── src/                    # Source code directory
│   ├── components/         # Reusable React components
│   ├── hooks/             # Custom React hooks
│   ├── contexts/          # React context providers
│   ├── types/             # TypeScript type definitions
│   ├── utils/             # Utility functions
│   ├── assets/            # Static assets
│   ├── App.tsx            # Main application component
│   ├── main.tsx          # Application entry point
│   └── index.css         # Global styles
├── public/                # Public static files
├── dist/                  # Build output directory
└── config files          # Various configuration files
```

## Getting Started

### Prerequisites
- Node.js (Latest LTS version recommended)
- npm or yarn

### Installation
```bash
# Install dependencies
npm install
```

### Available Scripts
- `npm run dev` - Starts the development server with hot-reload
- `npm run build` - Builds the application for production
- `npm run lint` - Runs ESLint to check code quality
- `npm run preview` - Previews the production build locally

## Development Setup

### TypeScript Configuration
The project uses a comprehensive TypeScript setup with three configuration files:
- `tsconfig.json` - Base TypeScript configuration
- `tsconfig.node.json` - Node-specific TypeScript settings
- `tsconfig.app.json` - Application-specific TypeScript settings

### ESLint Configuration
The project includes a robust ESLint setup with:
- Type-aware lint rules
- React-specific linting configurations
- Support for modern JavaScript features

### Code Quality Tools
- ESLint with TypeScript support
- React-specific lint rules
- Strict type checking enabled

## Project Architecture

### Component Structure
- Components are organized in the `src/components` directory
- Each component should be focused and reusable
- TypeScript interfaces are used for prop definitions

### State Management
- Uses React's built-in state management (Context API)
- Custom hooks for reusable logic
- Contexts for global state management

### Styling
- TailwindCSS for utility-first CSS
- Global styles defined in `src/index.css`
- Component-specific styles when needed

## Build and Deployment

### Development
```bash
npm run dev
```
This starts the development server with:
- Hot Module Replacement (HMR)
- Error overlay
- TypeScript type checking

### Production Build
```bash
npm run build
```
This creates an optimized production build in the `dist` directory.

## Best Practices
1. Follow TypeScript strict mode guidelines
2. Use functional components with hooks
3. Implement proper error boundaries
4. Follow ESLint rules and formatting guidelines
5. Write clean, maintainable, and documented code

## Contributing
1. Follow the established code style
2. Write meaningful commit messages
3. Update documentation as needed
4. Add appropriate types for new features
5. Test your changes thoroughly

## Performance Considerations
- Uses SWC for faster refresh and compilation
- Implements React's latest features for optimal performance
- Utilizes Vite's build optimization features

