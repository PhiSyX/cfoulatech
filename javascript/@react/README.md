# Project Development Guidelines

This document provides guidelines and instructions for developing and maintaining the @phisyx/cfoulatech-react project.

## Build/Configuration Instructions

### Prerequisites

-   Node.js (latest LTS version recommended)
-   pnpm

### Setup

1. Clone the repository
2. Install dependencies:
    ```bash
    pnpm install
    ```

### Development

To start the development server:

```bash
pnpm run dev
```

This will start a Vite development server at `http://localhost:5173` (or another port if 5173 is in use).

### Building for Production

To build the project for production:

```bash
pnpm run build
```

This will generate optimized production files in the `dist` directory.

### Preview Production Build

To preview the production build locally:

```bash
pnpm run preview
```

## Testing Information

### Testing Framework

This project uses Vitest and React Testing Library for testing. The configuration includes:

-   Vitest for test running and assertions
-   React Testing Library for rendering and interacting with React components
-   JSDOM for simulating a browser environment

**Important Note**: This project uses ES modules (`"type": "module"` in package.json). Vitest is configured in the vite.config.js file, which already uses ES module syntax.

### Running Tests

To run all tests:

```bash
pnpm test
```

To run tests in watch mode (useful during development):

```bash
pnpm run test:watch
```

### Test Structure

Tests are organized in the `tests` directory, mirroring the structure of the source code:

-   `tests/components/` - Tests for React components
-   `tests/lib/` - Tests for utility functions
-   etc.

### Writing Tests

#### Testing Utility Functions

For utility functions, focus on testing input/output relationships and edge cases. Example:

```javascript
// tests/lib/math/minmax.test.js
import { minmax } from "../../../lib/math/minmax";

describe("minmax utility", () => {
	test("returns the value when it is within range", () => {
		expect(minmax(0, 5, 10)).toBe(5);
	});

	test("returns the minimum value when value is less than minimum", () => {
		expect(minmax(0, -5, 10)).toBe(0);
	});

	// Additional tests...
});
```

#### Testing React Components

For React components, focus on user interactions and rendered output. Example:

```javascript
// tests/components/Counter.test.jsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Counter } from "../../src/components/Counter";

describe("Counter component", () => {
	test("renders with default values", () => {
		render(<Counter />);

		expect(screen.getByText(/compteur:/i)).toBeInTheDocument();
		expect(screen.getByText("0")).toBeInTheDocument();
	});

	test("increments the counter when increment button is clicked", () => {
		render(<Counter initialValue={5} />);

		fireEvent.click(screen.getByText(/incrémenter/i));

		expect(screen.getByText("6")).toBeInTheDocument();
	});

	// Additional tests...
});
```

### Mocking

For components that depend on external services or complex dependencies, use Vitest's mocking capabilities:

```javascript
// Example of mocking a service
import { vi } from "vitest";

vi.mock("../../src/services/api", () => ({
	fetchData: vi.fn().mockResolvedValue({ data: "mocked data" }),
}));
```

## Additional Development Information

### Project Structure

-   `src/` - Main source code
    -   `api/` - API-related components and services
    -   `assets/` - Static assets (styles, images, etc.)
    -   `components/` - Reusable UI components
    -   `hooks/` - Custom React hooks
    -   `layouts/` - Layout components
    -   `pages/` - Page components
    -   `router/` - Routing configuration
-   `lib/` - Utility libraries
    -   `capitalization/` - String capitalization utilities
    -   `math/` - Math utilities

### Routing

The application uses React Router for navigation. Routes are defined in `src/router/routes.jsx` and organized into groups. Each route group has:

-   A base path
-   A label
-   A group of routes, each with:
    -   A path (appended to the base path)
    -   A label
    -   A component function

### Component Development

When creating new components:

1. Place them in the appropriate directory (`components/`, `pages/`, etc.)
2. Follow the existing naming conventions
3. Add tests in the corresponding `tests` directory
4. If the component is a page or needs to be accessible via routing, add it to `src/router/routes.jsx`

### Code Style

-   Use functional components with hooks instead of class components
-   Use destructuring for props
-   Document components with JSDoc comments
-   Follow the existing code style for consistency
