import React, { useEffect, useRef, useState } from 'react';
import ErrorBoundary from './ErrorBoundary';

const React17Wrapper = ({ searchKeyword, onNavigateToProducts }) => {
  const containerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [childAppModule, setChildAppModule] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const loadChildApp = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Wait for the child app to be available
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Try to import the child app
        const module = await import('child/App');
        
        if (isMounted) {
          setChildAppModule(module);
          setIsLoading(false);
        }
      } catch (err) {
        console.error('Failed to load child app:', err);
        if (isMounted) {
          setError(err.message);
          setIsLoading(false);
        }
      }
    };

    loadChildApp();

    return () => {
      isMounted = false;
    };
  }, []);

  if (isLoading) {
    return (
      <div style={{
        padding: '40px',
        textAlign: 'center',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        border: '2px dashed #dee2e6'
      }}>
        <div style={{
          fontSize: '24px',
          marginBottom: '10px'
        }}>⏳</div>
        <div>Loading React 17 Child App...</div>
        <div style={{
          fontSize: '12px',
          color: '#6c757d',
          marginTop: '5px'
        }}>
          Waiting for remote module at localhost:3001
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        padding: '20px',
        backgroundColor: '#fff3cd',
        border: '1px solid #ffeaa7',
        borderRadius: '8px',
        color: '#856404'
      }}>
        <h4 style={{ margin: '0 0 10px 0' }}>🚨 Child App Loading Error</h4>
        <p style={{ margin: '0 0 10px 0' }}>
          Failed to load the React 17 child application.
        </p>
        <details>
          <summary style={{ cursor: 'pointer' }}>Error Details</summary>
          <pre style={{
            fontSize: '12px',
            backgroundColor: '#f8f9fa',
            padding: '10px',
            borderRadius: '4px',
            marginTop: '10px'
          }}>
            {error}
          </pre>
        </details>
        <div style={{ marginTop: '15px' }}>
          <strong>Troubleshooting:</strong>
          <ul style={{ margin: '5px 0 0 20px', fontSize: '14px' }}>
            <li>Make sure the child app is running on port 3001</li>
            <li>Check that the remoteEntry.js is accessible</li>
            <li>Verify there are no CORS issues</li>
          </ul>
        </div>
      </div>
    );
  }

  if (!childAppModule?.default) {
    return (
      <div style={{
        padding: '20px',
        backgroundColor: '#f8f9fa',
        border: '1px solid #dee2e6',
        borderRadius: '8px'
      }}>
        <p>Child app module loaded but no default export found.</p>
      </div>
    );
  }

  // Render the child app with error boundary
  const ChildApp = childAppModule.default;
  
  return (
    <ErrorBoundary>
      <div ref={containerRef}>
        <ChildApp 
          searchKeyword={searchKeyword}
          onNavigateToProducts={onNavigateToProducts}
        />
      </div>
    </ErrorBoundary>
  );
};

export default React17Wrapper;
