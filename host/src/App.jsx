import './App.css';
import React, {Suspense} from 'react';

const ChildApp = React.lazy(() => import ('child/App'));

const App = () => {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <h1 style={{ color: '#2c3e50', borderBottom: '2px solid #3498db', paddingBottom: '10px' }}>
        Host Application
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
        <Suspense fallback={<div style={{ color: '#f39c12' }}>Loading Child App...</div>}>
          <ChildApp />
        </Suspense>
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
