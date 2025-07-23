import React, { useRef, useEffect, Suspense, lazy } from 'react';
import React17Wrapper from './React17Wrapper';

/**
 * RemoteComponents.jsx
 * 
 * This file handles loading of remote microfrontend components using Module Federation.
 * 
 * ⚠️  Expected Webpack Warning:
 * "Critical dependency: the request of a dependency is an expression"
 * 
 * This warning is expected and safe in Module Federation setups. It occurs because
 * webpack cannot statically analyze dynamic imports with variables (like `import(module)`),
 * which is exactly what we need for runtime module loading in microfrontends.
 * 
 * The warning does not affect functionality and is a normal part of Module Federation.
 */

// Use the React17Wrapper for the React 17 child app
const ChildApp = React17Wrapper;
const Child18App = lazy(() => import('child18/App'));

// Enhanced Child18App with search capability
const Child18AppWithSearch = ({ searchKeyword, onNavigateToProducts }) => {
  const WrappedChild18App = lazy(() => import('child18/App'));
  
  return (
    <WrappedChild18App 
      searchKeyword={searchKeyword}
      onNavigateToProducts={onNavigateToProducts}
    />
  );
};

export { ChildApp, Child18App, Child18AppWithSearch };
