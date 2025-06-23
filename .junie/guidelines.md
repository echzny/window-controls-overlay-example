# Development Guidelines for Electron React Boilerplate

This document provides essential information for developers working on this Electron React Boilerplate project.

## Build/Configuration Instructions

### Prerequisites
- Node.js (latest LTS version recommended)
- npm or yarn

### Setup
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Development Workflow
1. Start the development server:
   ```bash
   npm start
   ```
   This will:
   - Build the main process
   - Start the renderer process development server
   - Launch the Electron application

### Building for Production
1. Build both main and renderer processes:
   ```bash
   npm run build
   ```

2. Package the application for distribution:
   ```bash
   npm run package
   ```
   This creates distributable packages in the `release/build` directory.

## Testing Information

### Test Setup
The project uses Jest for testing with React Testing Library for component testing.

### Running Tests
Before running tests, you need to build both the main and renderer processes:

```bash
npm run build:main
npm run build:renderer
npm test
```

### Adding New Tests
1. Create test files in the `src/__tests__` directory
2. Use the naming convention `ComponentName.test.tsx` for component tests
3. Import testing utilities:
   ```typescript
   import '@testing-library/jest-dom';
   import { render, screen } from '@testing-library/react';
   ```

### Example Test
Here's a simple test for a component:

```typescript
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import App from '../renderer/App';

describe('Hello component', () => {
  it('should render the heading', () => {
    render(App());
    const headingElement = screen.getByText('electron-react-boilerplate');
    expect(headingElement).toBeInTheDocument();
  });

  it('should render the Read our docs button', () => {
    render(App());
    const buttonElement = screen.getByText(/Read our docs/i);
    expect(buttonElement).toBeInTheDocument();
  });
});
```

## Additional Development Information

### Project Structure
- `.erb/`: Electron React Boilerplate configuration files
- `assets/`: Static assets like images
- `release/`: Build output and distribution packages
- `src/`: Source code
  - `main/`: Electron main process code
  - `renderer/`: React application code (renderer process)
  - `__tests__/`: Test files

### Code Style
- The project uses ESLint for code linting
- Run linting checks with:
  ```bash
  npm run lint
  ```
- Fix linting issues automatically with:
  ```bash
  npm run lint:fix
  ```

### Debugging
1. Main Process:
   - Set breakpoints in your code
   - Run the app in development mode
   - Open DevTools from the View menu or press Alt+Command+I (Mac) / Ctrl+Shift+I (Windows/Linux)

2. Renderer Process:
   - DevTools are automatically available in development mode
   - Use standard React DevTools for component debugging

### Electron-specific Considerations
- IPC communication between main and renderer processes is handled through preload scripts
- Window management is controlled in the main process
- The app uses a custom menu defined in `src/main/menu.ts`
