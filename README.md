# SalesSavvy: A Comprehensive E-commerce Dashboard

SalesSavvy is a modern, React-based e-commerce dashboard application that provides powerful tools for managing products, tracking sales, and analyzing business performance.

This application offers a user-friendly interface for both administrators and customers, featuring real-time data visualization, product management capabilities, and a seamless shopping experience. Built with React and utilizing modern web technologies, SalesSavvy delivers a responsive and efficient solution for e-commerce businesses.

## Repository Structure

```
.
├── src/
│   ├── components/
│   ├── hooks/
│   ├── pages/
│   ├── routes/
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── eslint.config.js
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```

### Key Files:
- `src/main.jsx`: The entry point of the application
- `src/App.jsx`: The main React component that sets up routing and global structure
- `src/pages/`: Contains individual page components
- `src/components/`: Reusable UI components
- `src/hooks/`: Custom React hooks for state management and API interactions
- `vite.config.js`: Configuration for the Vite build tool
- `tailwind.config.js`: Tailwind CSS configuration
- `eslint.config.js`: ESLint configuration for code linting

## Usage Instructions

### Prerequisites
- Node.js (version 14 or higher)
- npm (version 6 or higher)

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd salessavvy
   ```

2. Install dependencies:
   ```
   npm install
   ```

### Running the Application

To start the development server:

```
npm run dev
```

This will start the Vite development server. Open your browser and navigate to `http://localhost:5173` to view the application.

### Building for Production

To create a production build:

```
npm run build
```

This will generate optimized files in the `dist` directory.

### Linting

To run the ESLint linter:

```
npm run lint
```

### Configuration

The application uses various configuration files:

- `vite.config.js`: Configure Vite build settings and plugins
- `tailwind.config.js`: Customize Tailwind CSS theme and plugins
- `eslint.config.js`: Set up ESLint rules and plugins

### Key Features

1. **Authentication System**: Implemented in `src/pages/AuthPage.jsx`, providing sign-up and sign-in functionality with form validation.

2. **Admin Dashboard**: Located in `src/pages/AdminDashboard.jsx`, offering product management and business analytics.

3. **Product Management**: Add and delete products through modal interfaces.

4. **Business Analytics**: View daily, monthly, yearly, and overall business data.

5. **Responsive Design**: Utilizes Tailwind CSS for a mobile-friendly layout.

### Troubleshooting

Common issues and solutions:

1. **Build Errors**:
   - Problem: Vite build fails
   - Solution: Ensure all dependencies are installed correctly. Try deleting `node_modules` and running `npm install` again.

2. **Linting Errors**:
   - Problem: ESLint reports numerous errors
   - Solution: Run `npm run lint -- --fix` to automatically fix some issues. For persistent problems, review the ESLint configuration and adjust rules if necessary.

3. **Component Rendering Issues**:
   - Problem: Components not rendering as expected
   - Solution: Check the React DevTools to inspect component hierarchy and props. Ensure that data is being passed correctly through props or context.

### Debugging

To enable debug mode:

1. In development, use the browser's developer tools console.
2. For more verbose logging, you can add `console.log` statements in relevant components or hooks.
3. React DevTools extension for Chrome or Firefox provides in-depth component inspection.

## Data Flow

The SalesSavvy application follows a unidirectional data flow pattern:

1. User interactions trigger events in React components.
2. These events call functions defined in custom hooks (e.g., `useAuth`, `useBusiness`).
3. The hooks manage state updates and API calls.
4. Updated state is passed down to components as props.
5. Components re-render to reflect the new state.

```
[User Interaction] -> [React Component] -> [Custom Hook] -> [API Call/State Update] -> [Component Re-render]
```

Key data flow components:
- Authentication: Managed by `useAuth` hook
- Business Data: Handled by `useBusiness` hook
- Product Management: Implemented in `AdminDashboard` component and related modals

Notes:
- Ensure proper error handling in API calls and state updates.
- Use React's Context API for global state management if needed.
- Implement proper data validation both on the client and server side.