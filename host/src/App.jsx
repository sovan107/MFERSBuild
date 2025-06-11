import './App.css';
import React, { version, Suspense } from 'react';

// Error Boundary for handling remote component failures
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Remote component error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: '20px',
          backgroundColor: '#ffe6e6',
          border: '2px solid #ff4444',
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <h3 style={{ color: '#cc0000', margin: '0 0 10px 0' }}>⚠️ Component Load Error</h3>
          <p style={{ margin: 0, color: '#666' }}>
            {this.props.componentName} failed to load. Please check if the remote app is running.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

const ChildApp = React.lazy(() => import('child/App'));
const Child18App = React.lazy(() => import('child18/App'));

const App = () => {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <h1 style={{ color: '#2c3e50', borderBottom: '2px solid #3498db', paddingBottom: '10px' }}>
        Host Application {version}
      </h1>
      <p style={{ fontSize: '16px', color: '#7f8c8d', marginBottom: '30px' }}>
        This is the host application using Rsbuild and Module Federation.
      </p>

      <div style={{
        border: '2px dashed #e74c3c',
        padding: '20px',
        borderRadius: '8px',
        backgroundColor: '#fdf2f2'
      }}>
        <h2 style={{ color: '#e74c3c', marginTop: '0' }}>Remote Child App:</h2>
        <ErrorBoundary componentName='ChildApp'>
          <Suspense fallback={<div style={{ color: '#f39c12' }}>Loading Child App...</div>}>
            <ChildApp />
          </Suspense>
       </ErrorBoundary>
      </div>

      <div style={{
        border: '2px dashed #e74c3c',
        padding: '20px',
        borderRadius: '8px',
        backgroundColor: '#fdf2f2'
      }}>
        <h2 style={{ color: '#e74c3c', marginTop: '0' }}>Remote Child 18 App:</h2>
        <ErrorBoundary componentName='Child18App'>
          <Suspense fallback={<div style={{ color: '#f39c12' }}>Loading Child App...</div>}>
            <Child18App />
          </Suspense>
        </ErrorBoundary>
      </div>

      <footer style={{
        marginTop: '40px',
        padding: '20px',
        backgroundColor: '#ecf0f1',
        borderRadius: '8px',
        textAlign: 'center',
        color: '#95a5a6'
      }}>
        <p>Powered by Rsbuild + Module Federation</p>
      </footer>
    </div>
  );
};

export default App;
